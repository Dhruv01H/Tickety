package com.example.tickety.Repository;

import com.example.tickety.bean.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Integer> {
    Optional<Screen> findByScreenNumber(int screenNumber);
    boolean existsByScreenNumber(int screenNumber);
} 