package com.example.tickety.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonController {

    @Autowired
    public PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signin")
    public boolean signin(@RequestBody Person person) {
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
}