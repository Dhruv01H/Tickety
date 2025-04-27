package com.example.tickety.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.tickety.Repository.*;
import com.example.tickety.bean.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.time.format.DateTimeFormatter;

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
public ResponseEntity<?> addShow(@PathVariable int eventId, @RequestBody Show showRequest) {
    try {
        if (showRequest.getScreen() == null) {
            return ResponseEntity.badRequest().body("Screen details are missing in the request!");
        }
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));
            showRequest.setEvent(event);

        // Get the screen by screen number
        Screen screen = screenRepository.findByScreenNumber(showRequest.getScreen().getScreenNumber())
            .orElseThrow(() -> new RuntimeException("Screen not found"));

        // Calculate end time from start time + duration
        LocalDateTime showStartTime = showRequest.getDateTime();
        LocalDateTime showEndTime = showStartTime.plusMinutes(showRequest.getEvent().getDuration());

        // Fetch existing shows for that screen only
        List<Show> existingShows = showRespository.findAll().stream()
            .filter(s -> s.getScreen().getId() == screen.getId())
            .toList();

        for (Show existingShow : existingShows) {
            LocalDateTime existingStart = existingShow.getDateTime();
            LocalDateTime existingEnd = existingStart.plusMinutes(existingShow.getEvent().getDuration());

            // Check for conflicts with 30-minute gap requirement
            boolean conflict = 
                (showStartTime.isBefore(existingEnd.plusMinutes(30)) && showEndTime.isAfter(existingStart.minusMinutes(30)));

            if (conflict) {
                String errorMessage = String.format(
                    "Time slot conflict! The screen is already booked for '%s' from %s to %s. " +
                    "Please choose a different time slot with at least 30 minutes gap before and after existing shows.",
                    existingShow.getEvent().getShow_name(),
                    existingStart.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                    existingEnd.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
                );
                return ResponseEntity.badRequest().body(errorMessage);
            }
        }

        // No conflict -> save
        showRequest.setEvent(event);
        showRequest.setScreen(screen);
        showRequest.setmovie_name(showRequest.getEvent().getShow_name());
        showRequest.getEvent().setDuration(showRequest.getEvent().getDuration()); // Make sure it's set properly
        showRespository.save(showRequest);

        return ResponseEntity.ok(showRequest);

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
            
            // Initialize event for each show and set movie name
            shows.forEach(show -> {
                if (show.getEvent() != null) {
                    show.setmovie_name(show.getEvent().getShow_name());
                    // Force load event details
                    show.getEvent().getDuration();
                    show.getEvent().getShow_name();
                    show.getEvent().getLanguage();
                }
            });
            
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
