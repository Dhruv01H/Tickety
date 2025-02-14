package com.example.tickety;

import org.springframework.boot.SpringApplication;

public class TestTicketyApplication {

	public static void main(String[] args) {
		SpringApplication.from(TicketyApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
