package com.example.tickety.service;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;

import java.io.File;
import java.nio.file.Paths;

@Service
public class WalletService {

    private static final String WALLET_PATH = "./wallets/";

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

        return credentials.getAddress(); // Return the generated wallet address
    }
}
