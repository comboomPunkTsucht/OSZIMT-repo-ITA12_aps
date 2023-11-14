/**
 * Zeigt die Liste der Switches (Hostname und Management-IP )an,
 * sortiert nach Hostnamen.
 *
 * Hinweis: Achten Sie darauf, dass der JDBC-Treiber
 *          im Klassenpfad hinzugefügt wurde.
 * 
 *          Beispiel für JavaEditor:
 *          Konfiguration >> Java >> Interpreter >> Classpath-User
 *          http://javaeditor.org/doku.php?id=de:konfiguration#interpreter 
 * 
 * @author (your name)
 */



// Import
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class ZeigeSwiches {

    public static void main(String[] args) {

        // Try...Catch
        try {
            // Schritt 1: Verbindung aufbauen
            String url = "jdbc:mysql://localhost:3306/learnit"; // Ändern Sie die URL entsprechend Ihrer Datenbank
            String user = "mahd";
            String password = "fabian66";

            Connection con = DriverManager.getConnection(url, user, password);

            // Schritt 2: SQL-Anweisungen ausführen
            String sqlQuery = "SELECT P_Hostname, Management_IP FROM t_switches ORDER BY P_Hostname";
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(sqlQuery);

            // Schritt 3: Ergebnis abfragen
            while (rs.next()) {
                String hostname = rs.getString("P_Hostname");
                String managementIP = rs.getString("Management_IP");

                // Hier können Sie die Daten ausgeben oder weiterverarbeiten
                System.out.println("Hostname: " + hostname + ", Management-IP: " + managementIP);
            }

            // Schritt 4: Verbindung schließen
            rs.close();
            stmt.close();
            con.close();

        } catch (Exception ex) { // Mögliche Fehler abfangen
            ex.printStackTrace(); // Fehlermeldung ausgeben
        }

    }
}
