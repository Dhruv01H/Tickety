package com.example.tickety.service;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;
import java.math.BigDecimal;
import java.io.File;
import java.nio.file.Paths;

@Service
public class WalletService {

    private static final String WALLET_PATH = "./wallets/";
    private static final String GANACHE_RPC_URL = "http://127.0.0.1:7545";
    private static final String OWNER_PRIVATE_KEY = "0x0fe2e8d48a9ed2d4a2b1f98259e9f8deb2ffa96241b0c1b427185ab8152a302c"; // Replace with your owner's private key
    
    private final Web3j web3j = Web3j.build(new HttpService(GANACHE_RPC_URL));
    private final Credentials ownerCredentials = Credentials.create(OWNER_PRIVATE_KEY);

    public String createWallet(String password) throws Exception {
        // Ensure the directory exists
        File walletDir = new File(WALLET_PATH);
        if (!walletDir.exists()) {
            walletDir.mkdirs(); // Create directory if it doesn't exist
        }

        // Generate the wallet file
        String fileName = WalletUtils.generateNewWalletFile(password, walletDir);

        // Load the credentials from the generated wallet file
        Credentials credentials = WalletUtils.loadCredentials(password, WALLET_PATH + fileName);

        // Store the private key in the database
        return credentials.getAddress() + ":" + credentials.getEcKeyPair().getPrivateKey().toString(16);
    }

    public String getPrivateKey(String walletAddress) throws Exception {
        // Find the wallet file for this address
        File walletDir = new File(WALLET_PATH);
        File[] files = walletDir.listFiles((dir, name) -> name.startsWith("UTC--"));
        
        if (files != null) {
            for (File file : files) {
                Credentials credentials = WalletUtils.loadCredentials("", file);
                if (credentials.getAddress().equalsIgnoreCase(walletAddress)) {
                    return credentials.getEcKeyPair().getPrivateKey().toString(16);
                }
            }
        }
        throw new Exception("Wallet not found for address: " + walletAddress);
    }

    public String transferEther(String toAddress, BigDecimal amountInEther) throws Exception {
        try {
            // Create a transaction manager for the owner
            RawTransactionManager transactionManager = new RawTransactionManager(web3j, ownerCredentials);
            
            // Send the transaction
            String transactionHash = Transfer.sendFunds(
                web3j,
                ownerCredentials,
                toAddress,
                amountInEther,
                Convert.Unit.ETHER
            ).send().getTransactionHash();
            
            return "Transfer successful! Transaction Hash: " + transactionHash;
        } catch (Exception e) {
            throw new Exception("Failed to transfer ether: " + e.getMessage());
        }
    }

    public BigDecimal getBalance(String address) throws Exception {
        try {
            return Convert.fromWei(
                web3j.ethGetBalance(address, org.web3j.protocol.core.DefaultBlockParameterName.LATEST)
                    .send()
                    .getBalance()
                    .toString(),
                Convert.Unit.ETHER
            );
        } catch (Exception e) {
            throw new Exception("Failed to get balance: " + e.getMessage());
        }
    }
}
