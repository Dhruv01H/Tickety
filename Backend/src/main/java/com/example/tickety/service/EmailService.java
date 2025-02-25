package com.example.tickety.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private  JavaMailSender mailSender;
    
    public String sendVerificationEmail(String toEmail) {
        System.out.println("📩 sendVerificationEmail() called for: " + toEmail); // ✅ Debug print
    
        String token = UUID.randomUUID().toString(); 
        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token;
    
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Verify Your Email");
            message.setText("Click the link to verify your email: " + verificationLink);
    
            System.out.println("✅ Email content prepared, sending..."); // ✅ Debug print before sending
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + toEmail); // ✅ If reached, email was sent
        } catch (Exception e) {
            System.out.println("❌ Error sending email: " + e.getMessage()); // ✅ Catching errors
        }
    
        return token;
    }
    
}
