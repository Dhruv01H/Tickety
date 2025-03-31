package com.example.tickety.service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.springframework.stereotype.Service;
import java.math.BigInteger;

@Service
public class NFTMintingService {
    private static final String GANACHE_RPC_URL = "http://127.0.0.1:7545";
    private static final String NFT_CONTRACT_ADDRESS = "0xab3bef7bfc9af957cc0cfe37710a564d141b1750"; // Replace with your contract address
    private static final String OWNER_PRIVATE_KEY = "0xcebb22c9ffd23a125309d535c9fe2ce5ffa43ec9bf5f163195f746db251299e2"; // Replace with the owner's private key

    private final Web3j web3j = Web3j.build(new HttpService(GANACHE_RPC_URL));
    private final Credentials ownerCredentials = Credentials.create(OWNER_PRIVATE_KEY);

    private static class CustomGasProvider implements ContractGasProvider {
        private final BigInteger gasPrice;
        private final BigInteger gasLimit;

        public CustomGasProvider() {
            this.gasPrice = BigInteger.valueOf(20000000000L); // 20 Gwei
            this.gasLimit = BigInteger.valueOf(5000000L); // 5M gas limit
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
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getGasLimit'");
        }

        @Override
        public BigInteger getGasPrice() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getGasPrice'");
        }
    }

    public String mintNFT(String userWalletAddress, String metadataURI) throws Exception {
        // Load NFT contract with custom gas provider
        NFTContract contract = NFTContract.load(
            NFT_CONTRACT_ADDRESS, 
            web3j, 
            new RawTransactionManager(web3j, ownerCredentials), 
            new CustomGasProvider()
        );

        // Call mint function
        String txHash = contract.mintTicket(userWalletAddress, metadataURI).send().getTransactionHash();
        return "Minting Successful! Tx Hash: " + txHash;
    }
    
}
