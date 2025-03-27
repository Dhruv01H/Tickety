package com.example.tickety.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Sends a verification email with a unique token
    public String sendVerificationEmail(String toEmail) {
        System.out.println("📩 sendVerificationEmail() called for: " + toEmail);

        String token = UUID.randomUUID().toString();
        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token;

        try {
            sendEmail(toEmail, "Verify Your Email", "Click the link to verify your email: " + verificationLink);
            System.out.println("✅ Verification email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ Error sending verification email: " + e.getMessage());
        }

        return token;
    }

    // ✅ Sends an OTP email
    public int sendOtpEmail(String toEmail) {
        System.out.println("📩 sendOtpEmail() called for: " + toEmail);

        int otp = generateOtp(); // Generate a 6-digit OTP
        String otpMessage = "Your OTP code is: " + otp + ". It is valid for 10 minutes.";

        try {
            sendEmail(toEmail, "Your OTP Code", otpMessage);
            System.out.println("✅ OTP email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ Error sending OTP email: " + e.getMessage());
        }

        return otp;
    }

    // ✅ Reusable method to send an email
    public void sendEmail(String toEmail, String subject, String body) {
        System.out.println("📩 sendEmail() called for: " + toEmail);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            System.out.println("✅ Email content prepared, sending...");
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ Error sending email: " + e.getMessage());
        }
    }

    // ✅ Generates a 6-digit OTP
    private int generateOtp() {
        Random random = new Random();
        return 100000 + random.nextInt(900000); // Generates a number between 100000 and 999999
    }
}
