package com.example.tickety.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.tickety.bean.Person;
import com.example.tickety.service.NFTMintingService;
import com.example.tickety.service.WalletService;

import jakarta.servlet.http.HttpSession;

import java.util.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {
    @Autowired
    private NFTMintingService nftMintingService;


    @PostMapping("/mint")
    public String mintNFT(@RequestBody Map<String, String> request) {
        String toAddress = request.get("toAddress");
        String metadataURI = request.get("metadataURI");

        if (toAddress == null || metadataURI == null) {
            return "Error: toAddress and metadataURI are required";
        }

        try {
            return nftMintingService.mintNFT(toAddress, metadataURI);
        } catch (Exception e) {
            e.printStackTrace();
            return "Minting failed: " + e.getMessage();
        }
    }

    @PostMapping("/batch-mint")
    public ResponseEntity<?> batchMintNFTs(@RequestBody Map<String, Object> request) {
        String toAddress = (String) request.get("toAddress");
        @SuppressWarnings("unchecked")
        List<String> metadataURIs = (List<String>) request.get("metadataURIs");

        if (toAddress == null || metadataURIs == null || metadataURIs.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "toAddress and metadataURIs are required"));
        }

        try {
            String result = nftMintingService.batchMintNFTs(toAddress, metadataURIs);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Batch minting failed: " + e.getMessage()));
        }
    }

    @GetMapping("/seats/{walletAddress}")
    public ResponseEntity<?> getSeatNumbers(@PathVariable String walletAddress) {
        try {
            List<String> seatNumbers = nftMintingService.getSeatNumbersForAddress(walletAddress);
            return ResponseEntity.ok(Map.of(
                    "walletAddress", walletAddress,
                    "seatNumbers", seatNumbers,
                    "totalSeats", seatNumbers.size()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to get seat numbers: " + e.getMessage()));
        }
    }

    @GetMapping("/taken-seats")
    public ResponseEntity<?> getTakenSeats() {
        try {
            List<String> takenSeats = nftMintingService.getAllTakenSeats();
            return ResponseEntity.ok(Map.of(
                    "takenSeats", takenSeats,
                    "totalTakenSeats", takenSeats.size()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to get taken seats: " + e.getMessage()));
        }
    }

    @PostMapping("/mint-selected-seats")
    public ResponseEntity<?> mintSelectedSeats(@RequestBody Map<String, Object> request, HttpSession session) {
        try {
            // Get user from session
            Person user = (Person) session.getAttribute("user");
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User not logged in"));
            }

            // Get user's wallet address
            String walletAddress = user.getWalletAddress();
            if (walletAddress == null || walletAddress.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "User wallet address not found"));
            }

            // Get selected seats from request
            @SuppressWarnings("unchecked")
            List<String> selectedSeats = (List<String>) request.get("selectedSeats");
            if (selectedSeats == null || selectedSeats.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "No seats selected"));
            }

            // Use seat numbers directly as metadata URIs
            List<String> metadataURIs = new ArrayList<>(selectedSeats);

            // Mint NFTs for selected seats
            String result = nftMintingService.batchMintNFTs(walletAddress, metadataURIs);

            return ResponseEntity.ok(Map.of(
                    "message", "Tickets minted successfully",
                    "details", result,
                    "walletAddress", walletAddress,
                    "selectedSeats", selectedSeats));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to mint tickets: " + e.getMessage()));
        }
    }

    @PostMapping("/update-ticket-status")
    public ResponseEntity<?> updateTicketStatus(@RequestBody Map<String, String> request, HttpSession session) {
        System.out.println("Received update-ticket-status request");
        System.out.println("Request body: " + request);

        String ticketId = request.get("ticketId");
        String status = request.get("status");

        if (ticketId == null || status == null) {
            System.out.println("Missing ticketId or status in request");
            return ResponseEntity.badRequest().body(Map.of("error", "Ticket ID and status are required"));
        }

        try {
            // Get all taken seats to verify if the ticket exists
            List<String> takenSeats = nftMintingService.getAllTakenSeats();
            System.out.println("Taken seats: " + takenSeats);

            // Check if the ticket exists in the taken seats
            boolean ticketExists = takenSeats.stream()
                    .anyMatch(seat -> seat.equals(ticketId));
            System.out.println("Ticket exists: " + ticketExists);

            if (!ticketExists) {
                System.out.println("Ticket not found: " + ticketId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Ticket not found"));
            }

            // Get the owner's wallet address from the session
            Person user = (Person) session.getAttribute("user");
            System.out.println("User from session: " + (user != null ? user.getEmail() : "null"));

            if (user == null) {
                System.out.println("No user found in session");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User not logged in"));
            }

            String walletAddress = user.getWalletAddress();
            System.out.println("User wallet address: " + walletAddress);

            if (walletAddress == null || walletAddress.isEmpty()) {
                System.out.println("No wallet address found for user");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "User wallet address not found"));
            }

            // Update the NFT metadata
            String result = nftMintingService.updateNFTMetadata(ticketId, status);
            System.out.println("NFT metadata update result: " + result);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Ticket status updated successfully",
                    "ticketId", ticketId,
                    "status", status,
                    "result", result));

        } catch (Exception e) {
            System.out.println("Error in updateTicketStatus: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update ticket status: " + e.getMessage()));
        }
    }

    @GetMapping("/ticket-status/{seatNumber}")
    public ResponseEntity<?> getTicketStatus(@PathVariable String seatNumber) {
        try {
            // Get all taken seats
            List<String> takenSeats = nftMintingService.getAllTakenSeats();

            // Check if this seat exists
            if (!takenSeats.contains(seatNumber)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Ticket not found"));
            }

            // Get the status
            String status = nftMintingService.getTicketStatus(seatNumber);

            return ResponseEntity.ok(Map.of(
                    "status", status,
                    "seatNumber", seatNumber));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}
