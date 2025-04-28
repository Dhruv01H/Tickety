package com.example.tickety.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.tickety.Repository.PersonRepository;
import com.example.tickety.bean.Person;
import com.example.tickety.service.EmailService;
import com.example.tickety.service.NFTMintingService;
import com.example.tickety.service.OtpService;
import com.example.tickety.service.WalletService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private WalletService walletService;

    // ✅ Sign in 
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Person person, HttpSession session) {
        

        // Check for admin credentials
        if (person.getEmail().equals("admin@gmail.com") && person.getPassword().equals("admin1234")) {
            // Create a temporary person object for admin
            Person adminPerson = new Person();
            adminPerson.setEmail("admin@gmail.com");
            adminPerson.setName("Admin");
            adminPerson.setIs_verified(true);
            
            session.setAttribute("user", adminPerson);
            session.setAttribute("isAdmin", true);
            return ResponseEntity.ok(Map.of(
                "message", "Admin Login Successful",
                "isAdmin", true
            ));
        }

        Optional<Person> optionalPerson = personRepository.findByEmail(person.getEmail());

        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "User not found"));
        }

        Person p = optionalPerson.get();

        if (!p.getIs_verified()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", "Email not verified"));
        }

        String storedpassword = p.getPassword();

        if (!passwordEncoder.matches(person.getPassword(), storedpassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid Password"));
        }

        session.setAttribute("user", p);
        session.setAttribute("isAdmin", false);
        return ResponseEntity.ok(Map.of(
            "message", "Login Successful",
            "isAdmin", false
        ));
    }

    // ✅ Sign up
    @PutMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Person person) {
        try {
            if (personRepository.findByEmail(person.getEmail()).isPresent()) {
                return ResponseEntity.ok("Email Already Exists");
            }
            
            // Encode password before saving
            person.setPassword(passwordEncoder.encode(person.getPassword()));
            
            // Generate and set verification token
            String token = emailService.sendVerificationEmail(person.getEmail());
            person.setVerificationToken(token);
            
            // Save the person
            personRepository.save(person);
            
            // Create wallet for the new user
            String walletAddress = walletService.createWallet(person.getEmail());
            person.setWalletAddress(walletAddress);
            personRepository.save(person);
            
            return ResponseEntity.ok("User Registration Successful");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email Already Exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    // ✅ Email Verification
    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        Optional<Person> person = personRepository.findByVerificationToken(token);

        if (person.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid verification link!");
        }

        Person verifiedUser = person.get();
        verifiedUser.setIs_verified(true);
        // verifiedUser.setVerificationtoken(null); // ✅ Clear token after verification
        personRepository.save(verifiedUser);

        return ResponseEntity.ok("✅ Email verified! You can now log in.");
    }

    // ✅ Check User Session
    @GetMapping("/session")
    public ResponseEntity<?> getSession(HttpSession session) {
        Person user = (Person) session.getAttribute("user");
        Boolean isAdmin = (Boolean) session.getAttribute("isAdmin");
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user logged in");
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("walletAddress", user.getWalletAddress());
        response.put("isAdmin", isAdmin != null ? isAdmin : false);
        
        return ResponseEntity.ok(response);
    }

    // ✅ Logout
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.removeAttribute("isAdmin");
        session.invalidate();
        return ResponseEntity.ok("Session ended. You have been logged out.");
    }

    // ✅ Update User Data
    @PutMapping("/updatedata")
    public ResponseEntity<String> updateData(@RequestBody Person person) {
        Optional<Person> existing = personRepository.findByEmail(person.getEmail());

        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }

        Person p = existing.get();
        p.setName(person.getName());
        p.setGender(person.getGender());
        p.setPhone(person.getPhone());
        p.setDob(person.getDob());
        p.setAddress(person.getAddress());
        p.setState(person.getState());
        p.setDistrict(person.getDistrict());

        personRepository.save(p);
        return ResponseEntity.ok("Update Successful");
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("password");

        if (email == null || newPassword == null || email.isEmpty() || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        Optional<Person> optionalPerson = personRepository.findByEmail(email);

        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            person.setPassword(passwordEncoder.encode(newPassword)); // Update password

            personRepository.save(person); // Save updated password

            return ResponseEntity.ok("Password Reset Successful");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

   @PostMapping("/sendOtp")
   public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
       String email = request.get("email");

       if (email == null || email.isEmpty()) {
           return ResponseEntity.badRequest().body("Email is required!");
       }

       String otp = otpService.generateOtp(email);
       return ResponseEntity.ok("OTP sent successfully!");
   }
  
   @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        System.out.println("Email: " + email + ", OTP: " + otp);

        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body("Email and OTP are required!");
        }

        boolean isValid = otpService.verifyOtp(email, otp);
        System.out.println(isValid);

        if (isValid) {
            return ResponseEntity.ok(Map.of("verified", true, "message", "OTP verified successfully!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("verified", false, "message", "Invalid OTP!"));
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request, HttpSession session) {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String email = request.get("email");

        if (oldPassword == null || newPassword == null || email == null) {
            return ResponseEntity.badRequest().body("Old password, new password and email are required!");
        }

        Optional<Person> optionalPerson = personRepository.findByEmail(email);
        if (optionalPerson.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Person person = optionalPerson.get();
        
        // Verify old password
        if (!passwordEncoder.matches(oldPassword, person.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect old password");
        }

        // Update password
        person.setPassword(passwordEncoder.encode(newPassword));
        personRepository.save(person);

        return ResponseEntity.ok("Password updated successfully");
    }

    
}
