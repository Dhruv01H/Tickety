    package com.example.tickety.controller;

    import java.util.Optional;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.dao.DataIntegrityViolationException;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    // import com.example.*;
    import com.example.tickety.Repository.PersonRepository;
    import com.example.tickety.bean.Person;
    import com.example.tickety.service.EmailService;
    import jakarta.servlet.http.HttpSession;

    @RestController
    @RequestMapping("/api/auth")
    @CrossOrigin(origins = "http://localhost:5173")
    public class PersonController {

        @Autowired
        public PersonRepository personRepository;

        @Autowired
        private EmailService emailService;

        @PostMapping("/signin")
        public boolean signin(@RequestBody Person person , HttpSession session) {
            String password = person.getPassword();
            String email = person.getEmail();

            Optional<Person> optionalPerson = personRepository.findByEmail(email);

            if (optionalPerson.isPresent()) {
                Person p = optionalPerson.get();

                if (!p.getIs_verified()) {
                    // return "❌ Email not verified! Please check your email and verify your account.";
                    return false;
                }
                
                if (p.getPassword().equals(password)) {

                    session.setAttribute("user", p);
                    return true;
                }
                return false;
            }

            return false;
        }

        @PutMapping("/signup")
        public String signup(@RequestBody Person person) {
            try {
                System.out.println("Hiiiii");
                String token = emailService.sendVerificationEmail(person.getEmail());
                person.setVerificationtoken(token);
                Person response = personRepository.save(person);
                return "User Registration Successful";
            } catch (DataIntegrityViolationException e) {
                return "Email Already Exists";

            } catch (Exception e) {
                return "Something went Wrong";
            }
        }

    @GetMapping("/verify")
        public String verifyEmail(@RequestParam("token") String token) {
            Optional<Person> person = personRepository.findByVerificationToken(token);

            if (person.isPresent()) {
                Person verifiedUser = person.get();
                verifiedUser.setIs_verified(true);
                verifiedUser.setVerificationtoken(null); // ✅ Clear token after verification
                personRepository.save(verifiedUser);
                return "✅ Email verified! You can now log in.";
            }

            return "❌ Invalid verification link!";
        }

        // ✅ Check if the user is logged in
            @GetMapping("/session")
            public ResponseEntity<?> getSession(HttpSession session) {
                Person user = (Person) session.getAttribute("user");
                        
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user logged in");
            }

            return ResponseEntity.ok(user); 
                // return (user != null) ? "Logged in as: " + user : "No active session";
            }

            // ✅ Logout (destroy session)
            @GetMapping("/logout")
            public String logout(HttpSession session) {
                session.invalidate(); // ❌ Destroy session
                return "Session ended. You have been logged out.";
            }

            @PutMapping("/updatedata")
            public String updateData(@RequestBody Person person) {
                Optional<Person> existing = personRepository.findByEmail(person.getEmail());
                if (existing.isPresent()) {
                    Person p = existing.get();
                    p.setName(person.getName());
                    p.setGender(person.getGender());
                    p.setEmail(person.getEmail());
                    p.setPhone(person.getPhone());
                    p.setDob(person.getDob());
                    p.setAddress(person.getAddress());
                    p.setState(person.getState());
                    p.setDistrict(person.getDistrict());
                    personRepository.save(p);
                    return "Update Successful";
                }
                return "User Not Found";

    }
}