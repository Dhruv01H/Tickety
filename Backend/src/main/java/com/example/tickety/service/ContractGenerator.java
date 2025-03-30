package com.example.tickety.service;
import org.web3j.codegen.SolidityFunctionWrapperGenerator;
import java.io.File;

public class ContractGenerator {
    public static void main(String[] args) {
        try {
            String abiFile = "D:\\STUDIES\\SEM 6\\SGP\\New Folder\\Tickety\\Backend\\src\\main\\java\\com\\example\\tickety\\NFTContract.abi";
            String binFile = "D:\\STUDIES\\SEM 6\\SGP\\New Folder\\Tickety\\Backend\\src\\main\\java\\com\\example\\tickety\\NFTContract.bin";
            String destinationPackage = "com.example.tickety.service"; // Change as needed
            String destinationPath = "D:/STUDIES/SEM 6/SGP/New Folder/Tickety/Backend/src/main/java/com/example/service";
            // D:\STUDIES\SEM 6\SGP\New folder\Tickety\Backend\src\main\java\com\example\tickety\NFTContract.bin
            SolidityFunctionWrapperGenerator.main(new String[]{
                    "-a", abiFile,
                    "-b", binFile,
                    "-p", destinationPackage,
                    "-o", destinationPath
            });

            System.out.println("✅ Contract wrapper generated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
