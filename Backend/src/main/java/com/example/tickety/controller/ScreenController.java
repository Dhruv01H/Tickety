package com.example.tickety.controller;

import com.example.tickety.bean.Screen;
import com.example.tickety.Repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/screens")
@CrossOrigin(origins = "http://localhost:5173")
public class ScreenController {

    @Autowired
    private ScreenRepository screenRepository;

    @GetMapping
    public ResponseEntity<List<Screen>> getAllScreens() {
        return ResponseEntity.ok(screenRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Screen> getScreenById(@PathVariable Integer id) {
        return screenRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createScreen(@RequestBody Screen screen) {
        if (screenRepository.existsByScreenNumber(screen.getScreenNumber())) {
            return ResponseEntity.badRequest().body("Screen number already exists");
        }
        return ResponseEntity.ok(screenRepository.save(screen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateScreen(@PathVariable Integer id, @RequestBody Screen screen) {
        if (!screenRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        screen.setId(id);
        return ResponseEntity.ok(screenRepository.save(screen));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScreen(@PathVariable Integer id) {
        if (!screenRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        screenRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 