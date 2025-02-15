// package com.example.tickety.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.tickety.service.EmailService;

// @RestController
// @RequestMapping("/api/email")
// public class emailcontroller {
    
//     @Autowired
//     private EmailService emailService;

//     //send email
//     @RequestMapping("/send")
//     public String sendEmail(@RequestParam String to , @RequestParam String subject , @RequestParam String message) {
//         emailService.sendEmail(to, subject, message);
//         return "Email sent";
//         }

// }   
