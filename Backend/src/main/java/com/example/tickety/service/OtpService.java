package com.example.tickety.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new HashMap<>(); // Store OTPs temporarily

    // ✅ Generate OTP using UUID
    public String generateOtp(String email) {
        String otp = UUID.randomUUID().toString().replace("-", "").substring(0, 6); // Extract first 6 characters
        otpStorage.put(email, otp); // Store OTP against email
        sendOtpEmail(email, otp); // Send OTP to email
        return otp;
    }

    // ✅ Verify OTP
    public boolean verifyOtp(String email, String enteredOtp) {
        System.out.println("Stored OTP: " + otpStorage.get(email));
        System.out.println("Entered OTP: " + enteredOtp);
        return otpStorage.containsKey(email) && otpStorage.get(email).equals(enteredOtp);
    }

    // ✅ Send OTP via Email
    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP for Ticekty");
        message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
        mailSender.send(message);
    }

    // ✅ Clear OTP after successful verification (optional)
    public void clearOtp(String email) {
        otpStorage.remove(email);
    }
}
