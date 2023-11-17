import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class SucheAnsprechpartnerMitPreparedStatement {

    public static void main(String[] args) {
        try {
            // Schritt 1: Verbindung zur Datenbank herstellen
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/deineDatenbank", "benutzername", "passwort");

            // Schritt 2: SQL-Anweisung mit Platzhaltern erstellen
            String sql = "SELECT * FROM Ansprechpartner WHERE Vorname = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            // Schritt 3: Benutzereingabe mit Scanner abfragen
            Scanner scanner = new Scanner(System.in);
            System.out.println("Bitte geben Sie den Vornamen ein:");
            String vorname = scanner.next();

            // Schritt 4: Parameter in die SQL-Anweisung setzen
            preparedStatement.setString(1, vorname);

            // Schritt 5: Die SQL-Anweisung ausführen und das Ergebnis verarbeiten
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                // Verarbeite das Ergebnis hier
            }

            // Schritt 6: Ressourcen schließen
            resultSet.close();
            preparedStatement.close();
            connection.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
