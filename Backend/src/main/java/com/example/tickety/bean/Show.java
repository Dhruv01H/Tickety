package com.example.tickety.bean;

import java.io.Serializable;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "show")
public class Show implements Serializable{
    
    public static final long serialVersionUID = 733783470190038252L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int show_id;

    @Column(nullable = false, unique = true)
    private String show_name;

    @Column(nullable = false , columnDefinition = "TEXT")
    private String show_description;

    @Column
    private String show_image_url;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String language;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private String created_at;

    // ================= GETTERS AND SETTERS ================= //

    public int getShow_id() {
        return show_id;
    }

    public void setShow_id(int show_id) {
        this.show_id = show_id;
    }

    public String getShow_name() {
        return show_name;
    }

    public void setShow_name(String show_name) {
        this.show_name = show_name;
    }

    public String getShow_description() {
        return show_description;
    }

    public void setShow_description(String show_description) {
        this.show_description = show_description;
    }

    public String getShow_image_url() {
        return show_image_url;
    }

    public void setShow_image_url(String show_image_url) {
        this.show_image_url = show_image_url;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }
}
