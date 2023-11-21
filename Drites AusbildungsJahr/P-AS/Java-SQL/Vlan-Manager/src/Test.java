
import java.util.Scanner;

public class Test {

    public static void main(String[] args) {
        Datenbank db = new Datenbank("jdbc:mysql://localhost:3306/learnit", "mahd", "fabian66");
        EinAusgabe einAusgabe = new EinAusgabe(db);

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("Enter the Switch ID (or type 'exit' to end): ");
            String input = scanner.nextLine();

            if (input.equalsIgnoreCase("exit")) {
                break;
            }

            try {
                int switchId = Integer.parseInt(input);
                einAusgabe.zeigeSwitchAn(switchId);
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid Switch ID or type 'exit' to end.");
            }
        }

        scanner.close();
        db.trenne();
    }
}

