package com.example.tickety.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tickety.bean.Show;

public interface ShowRespository extends JpaRepository<Show, UUID> {

    Optional<Show> findById(UUID id);
}
