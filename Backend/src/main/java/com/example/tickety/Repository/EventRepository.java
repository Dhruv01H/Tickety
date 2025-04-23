package com.example.tickety.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tickety.bean.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {
    
    // Optional<Event> findById(UUID id);
    
}
