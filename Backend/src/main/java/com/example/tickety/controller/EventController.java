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
}
