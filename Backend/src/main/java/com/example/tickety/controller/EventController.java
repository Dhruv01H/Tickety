package com.example.tickety.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.tickety.Repository.*;
import com.example.tickety.bean.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ShowRespository showRespository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event){
        // Ensure the name field is set to the same value as show_name if it's null
        return eventRepository.save(event);
    }
}
