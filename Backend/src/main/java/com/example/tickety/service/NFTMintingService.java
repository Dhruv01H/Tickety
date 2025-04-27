package com.example.tickety.service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.springframework.stereotype.Service;
import java.math.BigInteger;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.core.methods.response.Log;
import java.util.List;
import java.util.ArrayList;
import java.lang.StringBuilder;
import java.util.Map;
import java.util.HashMap;

@Service
public class NFTMintingService {
    private static final String GANACHE_RPC_URL = "http://127.0.0.1:7545";
    private static final String NFT_CONTRACT_ADDRESS = "0x7c88e0d3ffa637fd275d7c3ed6f575985652d9fa"; // Replace with your contract address
    private static final String OWNER_PRIVATE_KEY = "0x0fe2e8d48a9ed2d4a2b1f98259e9f8deb2ffa96241b0c1b427185ab8152a302c"; // Replace with the owner's private key

    private final Web3j web3j = Web3j.build(new HttpService(GANACHE_RPC_URL));
    private final Credentials ownerCredentials = Credentials.create(OWNER_PRIVATE_KEY);

    private static class CustomGasProvider implements ContractGasProvider {
        private final BigInteger gasPrice;
        private final BigInteger gasLimit;

        public CustomGasProvider() {
            // Reduced gas price to 5 Gwei
            this.gasPrice = BigInteger.valueOf(5000000000L);
            // Reduced gas limit to 2M
            this.gasLimit = BigInteger.valueOf(2000000L);
        }

        @Override
        public BigInteger getGasPrice(String contractFunc) {
            return gasPrice;
        }

        @Override
        public BigInteger getGasLimit(String contractFunc) {
            return gasLimit;
        }

        @Override
        public BigInteger getGasLimit() {
            return gasLimit;
        }

        @Override
        public BigInteger getGasPrice() {
            return gasPrice;
        }
    }

    private Map<String, String> ticketStatuses = new HashMap<>();

    public String mintNFT(String userWalletAddress, String metadataURI) throws Exception {
        try {
            // Check if we have enough balance
            BigInteger balance = web3j.ethGetBalance(ownerCredentials.getAddress(), DefaultBlockParameterName.LATEST)
                .send()
                .getBalance();
            
            // Calculate estimated gas cost
            BigInteger gasPrice = new CustomGasProvider().getGasPrice("mintTicket");
            BigInteger gasLimit = new CustomGasProvider().getGasLimit("mintTicket");
            BigInteger estimatedGasCost = gasPrice.multiply(gasLimit);
            
            if (balance.compareTo(estimatedGasCost) < 0) {
                throw new Exception("Insufficient funds. Required: " + estimatedGasCost + " Wei, Available: " + balance + " Wei");
            }

            // Load NFT contract with custom gas provider
            NFTContract contract = NFTContract.load(
                NFT_CONTRACT_ADDRESS, 
                web3j, 
                new RawTransactionManager(web3j, ownerCredentials), 
                new CustomGasProvider()
            );

            // Get current total supply before minting
            BigInteger currentSupply = contract.totalSupply().send();
            System.out.println("Current total supply before minting: " + currentSupply);

            // Call mint function and get transaction receipt
            TransactionReceipt transactionReceipt = contract.mintTicket(userWalletAddress, metadataURI).send();
            String txHash = transactionReceipt.getTransactionHash();
            
            System.out.println("Transaction Hash: " + txHash);
            System.out.println("Number of logs: " + transactionReceipt.getLogs().size());
            
            // Get the token ID from the event logs
            BigInteger tokenId = null;
            for (Log log : transactionReceipt.getLogs()) {
                System.out.println("Log address: " + log.getAddress());
                System.out.println("Log topics: " + log.getTopics());
                System.out.println("Log data: " + log.getData());
                
                if (log.getTopics().size() > 3) {  // Check for at least 4 topics (Transfer event)
                    // The token ID is in the fourth topic (index 3)
                    String topic = log.getTopics().get(3);
                    System.out.println("Processing token ID topic: " + topic);
                    
                    // Remove the "0x" prefix and convert to BigInteger
                    tokenId = new BigInteger(topic.substring(2), 16);
                    System.out.println("Extracted token ID from logs: " + tokenId);
                    break;
                }
            }

            if (tokenId == null) {
                // Get the new total supply after minting
                BigInteger newSupply = contract.totalSupply().send();
                System.out.println("New total supply after minting: " + newSupply);
                
                // The new token ID should be the previous total supply
                tokenId = currentSupply;
                System.out.println("Using token ID from total supply: " + tokenId);
            }

            if (tokenId == null) {
                return "Minting Successful! Tx Hash: " + txHash + " (Token ID not found in logs)";
            }

            // Verify ownership
            try {
                String owner = contract.ownerOf(tokenId).send();
                System.out.println("Token " + tokenId + " is owned by: " + owner);
                System.out.println("Expected owner: " + userWalletAddress);
                
                if (!owner.equalsIgnoreCase(userWalletAddress)) {
                    return "Warning: Token " + tokenId + " was minted but ownership verification failed. " +
                           "Expected: " + userWalletAddress + ", Found: " + owner;
                }
            } catch (Exception e) {
                System.out.println("Error verifying ownership: " + e.getMessage());
                // Try to get the owner through balanceOf
                try {
                    BigInteger balanceOf = contract.balanceOf(userWalletAddress).send();
                    System.out.println("Balance of user: " + balanceOf);
                } catch (Exception e2) {
                    System.out.println("Error checking balance: " + e2.getMessage());
                }
            }

            // Get token URI
            try {
                String tokenURI = contract.tokenURI(tokenId).send();
                System.out.println("Token URI for " + tokenId + ": " + tokenURI);
            } catch (Exception e) {
                System.out.println("Error getting token URI: " + e.getMessage());
            }

            return "Minting Successful! Tx Hash: " + txHash + ", Token ID: " + tokenId + 
                   "\nContract Address: " + NFT_CONTRACT_ADDRESS +
                   "\nOwner Address: " + userWalletAddress;
        } catch (Exception e) {
            throw new Exception("Minting failed: " + e.getMessage());
        }
    }

    public String batchMintNFTs(String userWalletAddress, List<String> metadataURIs) throws Exception {
        try {
            // Check if we have enough balance
            BigInteger balance = web3j.ethGetBalance(ownerCredentials.getAddress(), DefaultBlockParameterName.LATEST)
                .send()
                .getBalance();
            
            // Calculate estimated gas cost for batch minting
            BigInteger gasPrice = new CustomGasProvider().getGasPrice("batchMintTickets");
            BigInteger gasLimit = new CustomGasProvider().getGasLimit("batchMintTickets");
            BigInteger estimatedGasCost = gasPrice.multiply(gasLimit);
            
            if (balance.compareTo(estimatedGasCost) < 0) {
                throw new Exception("Insufficient funds. Required: " + estimatedGasCost + " Wei, Available: " + balance + " Wei");
            }

            // Load NFT contract with custom gas provider
            NFTContract contract = NFTContract.load(
                NFT_CONTRACT_ADDRESS, 
                web3j, 
                new RawTransactionManager(web3j, ownerCredentials), 
                new CustomGasProvider()
            );

            // Get current total supply before minting
            BigInteger currentSupply = contract.totalSupply().send();
            System.out.println("Current total supply before batch minting: " + currentSupply);

            // Call batch mint function and get transaction receipt
            TransactionReceipt transactionReceipt = contract.batchMintTickets(userWalletAddress, metadataURIs).send();
            String txHash = transactionReceipt.getTransactionHash();
            
            System.out.println("Batch Minting Transaction Hash: " + txHash);
            System.out.println("Number of logs: " + transactionReceipt.getLogs().size());

            // Get the new total supply after minting
            BigInteger newSupply = contract.totalSupply().send();
            System.out.println("New total supply after batch minting: " + newSupply);
            
            // Calculate how many tokens were minted
            BigInteger tokensMinted = newSupply.subtract(currentSupply);
            
            // Get all token IDs that were minted
            List<BigInteger> mintedTokenIds = new ArrayList<>();
            for (BigInteger i = currentSupply; i.compareTo(newSupply) < 0; i = i.add(BigInteger.ONE)) {
                mintedTokenIds.add(i);
            }

            // Verify ownership of all minted tokens
            boolean allTokensVerified = true;
            for (BigInteger tokenId : mintedTokenIds) {
                try {
                    String owner = contract.ownerOf(tokenId).send();
                    System.out.println("Token " + tokenId + " is owned by: " + owner);
                    System.out.println("Expected owner: " + userWalletAddress);
                    
                    if (!owner.equalsIgnoreCase(userWalletAddress)) {
                        allTokensVerified = false;
                        System.out.println("Warning: Token " + tokenId + " ownership verification failed. " +
                               "Expected: " + userWalletAddress + ", Found: " + owner);
                    }
                } catch (Exception e) {
                    System.out.println("Error verifying ownership for token " + tokenId + ": " + e.getMessage());
                    allTokensVerified = false;
                }
            }

            // Build response with token IDs
            StringBuilder response = new StringBuilder();
            response.append("Batch Minting Successful! Tx Hash: ").append(txHash)
                   .append("\nTokens Minted: ").append(tokensMinted)
                   .append("\nContract Address: ").append(NFT_CONTRACT_ADDRESS)
                   .append("\nOwner Address: ").append(userWalletAddress)
                   .append("\nMinted Token IDs: ").append(mintedTokenIds);

            if (!allTokensVerified) {
                response.append("\nWarning: Some tokens ownership verification failed");
            }

            return response.toString();
        } catch (Exception e) {
            throw new Exception("Batch minting failed: " + e.getMessage());
        }
    }

    public List<String> getSeatNumbersForAddress(String walletAddress) throws Exception {
        try {
            // Load NFT contract with custom gas provider
            NFTContract contract = NFTContract.load(
                NFT_CONTRACT_ADDRESS, 
                web3j, 
                new RawTransactionManager(web3j, ownerCredentials), 
                new CustomGasProvider()
            );

            // Get the balance of tokens owned by the address
            BigInteger balance = contract.balanceOf(walletAddress).send();
            System.out.println("Number of tokens owned by " + walletAddress + ": " + balance);

            // Get all token IDs owned by the address
            List<String> seatNumbers = new ArrayList<>();
            for (BigInteger i = BigInteger.ZERO; i.compareTo(balance) < 0; i = i.add(BigInteger.ONE)) {
                // Get token ID at the current index
                BigInteger tokenId = contract.tokenOfOwnerByIndex(walletAddress, i).send();
                
                // Get seat number for this token ID
                String seatNumber = contract.tokenIdToSeat(tokenId).send();
                seatNumbers.add(seatNumber);
                
                System.out.println("Token ID: " + tokenId + ", Seat Number: " + seatNumber);
            }

            return seatNumbers;
        } catch (Exception e) {
            throw new Exception("Failed to get seat numbers: " + e.getMessage());
        }
    }

    public List<String> getAllTakenSeats() throws Exception {
        try {
            // Load NFT contract with custom gas provider
            NFTContract contract = NFTContract.load(
                NFT_CONTRACT_ADDRESS, 
                web3j, 
                new RawTransactionManager(web3j, ownerCredentials), 
                new CustomGasProvider()
            );

            // Get total supply of tokens
            BigInteger totalSupply = contract.totalSupply().send();
            System.out.println("Total number of tokens minted: " + totalSupply);

            // Get all seat numbers
            List<String> takenSeats = new ArrayList<>();
            for (BigInteger i = BigInteger.ZERO; i.compareTo(totalSupply) < 0; i = i.add(BigInteger.ONE)) {
                try {
                    // First check if the token exists by trying to get its owner
                    String owner = contract.ownerOf(i).send();
                    if (owner != null && !owner.equals("0x0000000000000000000000000000000000000000")) {
                        // Get seat number for this token ID
                        String seatNumber = contract.tokenIdToSeat(i).send();
                        if (seatNumber != null && !seatNumber.isEmpty()) {
                            // Add the seat number exactly as it is in the contract
                            takenSeats.add(seatNumber);
                            System.out.println("Valid token found - ID: " + i + ", Seat: " + seatNumber + ", Owner: " + owner);
                        }
                    }
                } catch (Exception e) {
                    // Skip invalid or burned tokens
                    System.out.println("Skipping token " + i + " - " + e.getMessage());
                    continue;
                }
            }

            System.out.println("Total valid seats found: " + takenSeats.size());
            System.out.println("Taken seats: " + takenSeats);
            return takenSeats;
        } catch (Exception e) {
            System.out.println("Error in getAllTakenSeats: " + e.getMessage());
            e.printStackTrace();
            throw new Exception("Failed to get taken seats: " + e.getMessage());
        }
    }

    public String updateNFTMetadata(String ticketId, String status) throws Exception {
        try {
            // Load NFT contract with custom gas provider
            NFTContract contract = NFTContract.load(
                NFT_CONTRACT_ADDRESS, 
                web3j, 
                new RawTransactionManager(web3j, ownerCredentials), 
                new CustomGasProvider()
            );

            // First, get all taken seats to verify the seat exists
            List<String> takenSeats = getAllTakenSeats();
            System.out.println("All taken seats: " + takenSeats);
            System.out.println("Attempting to update seat: " + ticketId);

            if (!takenSeats.contains(ticketId)) {
                throw new Exception("Seat " + ticketId + " not found in taken seats");
            }

            // Store the status in memory
            ticketStatuses.put(ticketId, status);
            // boolean state = true;
            // contract.updateTicketStatus(ticketId, state).send();
            System.out.println("Updated status for ticket " + ticketId + " to " + status);
            
            return "Status updated successfully";
        } catch (Exception e) {
            throw new Exception("Failed to update NFT metadata: " + e.getMessage());
        }
    }

    public String getTicketStatus(String ticketId) {
        return ticketStatuses.getOrDefault(ticketId, "Unused");
    }
}
