package com.example.tickety.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;

import com.example.tickety.bean.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

    //find email
    Optional<Person> findByEmail(String email);

    //add data
    Person save(Person person);

    //findbyverificationtoken
    Optional<Person> findByVerificationToken(String verificationToken);
    
}