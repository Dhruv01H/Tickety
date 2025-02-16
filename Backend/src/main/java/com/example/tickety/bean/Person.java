package com.example.tickety.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String password;
    @Column
    private boolean is_verified = false;
    private String verificationToken;
    // getter setter
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //getter and setter
    public boolean getIs_verified() {
        return is_verified;
    }
    
    //getter seter verificationtoken
    public void setIs_verified(boolean is_verified) {
        this.is_verified = is_verified;
        }
        public String getVerificationtoken() {
            return verificationToken;
            }
            public void setVerificationtoken(String verificationtoken) {
                this.verificationToken = verificationtoken;
            }

}
