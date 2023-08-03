import java.io.File;
import java.io.IOException;

public class CipherConsoleLineInterface {
	
	private static File encryptedFile;
	private static String password;
	private static SecureEnclave se = new SecureEnclave();
	private static FileHandler fh = new FileHandler();
    public static void main(String[] args) {
    	String option = args.length > 0 ? args[0] : "--gui"; 

        switch (option) {
            case "-e":
            case "--encrypt":
                if (args.length != 4) {
                    System.out.println("Invalid arguments for encryption.");
                    System.exit(1);
                }

                String plaintext = args[1];
                password = args[2];
                String outputFilePath = args[3];
                byte[] encryptedData = se.encrypt(password, plaintext);
                encryptedFile = new File(outputFilePath);

                try {
                    fh.writeFile(encryptedFile, encryptedData);
                    System.out.println("Encryption successful. Encrypted data saved to " + outputFilePath);
                } catch (IOException e) {
                    System.out.println("Error writing to file: " + e.getMessage());
                }

                break;
            case "-d":
            case "--decrypt":
            	if (args.length != 3) {
                    System.out.println("Invalid arguments for decryption.");
                    System.exit(1);
                }
            	String outputFilePath1 = args[1];
            	password = args[2];
            	encryptedFile = new File(outputFilePath1);
		            byte[] encryptedData1;
					try {
						encryptedData1 = fh.readFile(encryptedFile);
		                String decryptedText = se.decrypt(password, encryptedData1);
		                System.out.print(decryptedText);
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					break;
            case "-g":
            case "--gui":
                // Call the LoginWindow to log in
                new LoginWindow();
                return;
            case "-h":
            case "--help":
            	 System.out.println("Usage:");
                 System.out.println("To encrypt: [-e/--encrypt] [plaintext] [password] [output filepath]");
                 System.out.println("To decrypt: [-d/--decrypt] [input filepath] [password]");
                 System.out.println("To use the GUI: [-g/--gui]");
                 System.out.println("To see the help: [-h/--help]");
                 System.exit(0);
            default:
                System.out.println("Invalid option. Use -h or --help for  help.");
                System.exit(1);
        }
    }
}
