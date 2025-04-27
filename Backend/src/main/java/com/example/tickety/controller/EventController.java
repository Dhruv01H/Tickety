package com.example.tickety.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.tickety.Repository.*;
import com.example.tickety.bean.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ShowRespository showRespository;

    @Autowired
    private ScreenRepository screenRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event){
        return eventRepository.save(event);
    }

    @GetMapping("/get")
    public List<Event> getEvent(){
        return eventRepository.findAll();
    }

    @PostMapping("/{eventId}/shows")
    public ResponseEntity<?> addShow(@PathVariable int eventId, @RequestBody Show show) {
        try {
            Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

            // Get the screen by screen number
            Screen screen = screenRepository.findByScreenNumber(show.getScreen().getScreenNumber())
                .orElseThrow(() -> new RuntimeException("Screen not found"));

            // Check for duplicate showtime in the same screen
            boolean hasConflict = showRespository.findAll().stream()
                .anyMatch(existingShow -> 
                    existingShow.getScreen().getId() == screen.getId() &&
                    existingShow.getDateTime().equals(show.getDateTime()));

            if (hasConflict) {
                return ResponseEntity.badRequest()
                    .body("A show already exists at this time in the selected screen");
            }

            show.setEvent(event);
            show.setScreen(screen);
            Show savedShow = showRespository.save(show);
            return ResponseEntity.ok(savedShow);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{eventId}/shows")
    public ResponseEntity<List<Show>> getShowsForEvent(@PathVariable int eventId) {
        try {
            Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
            
            List<Show> shows = showRespository.findAll().stream()
                .filter(show -> show.getEvent().getId() == eventId)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(shows);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/shows/screen/{screenNumber}")
    public ResponseEntity<List<Show>> getShowsForScreen(@PathVariable int screenNumber) {
        try {
            Screen screen = screenRepository.findByScreenNumber(screenNumber)
                .orElseThrow(() -> new RuntimeException("Screen not found"));

            List<Show> shows = showRespository.findAll().stream()
                .filter(show -> show.getScreen().getId() == screen.getId())
                .sorted((a, b) -> a.getDateTime().compareTo(b.getDateTime()))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(shows);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/shows/all")
    public ResponseEntity<List<Show>> getAllShows() {
        try {
            List<Show> shows = showRespository.findAll().stream()
                .sorted((a, b) -> a.getDateTime().compareTo(b.getDateTime()))
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(shows);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
