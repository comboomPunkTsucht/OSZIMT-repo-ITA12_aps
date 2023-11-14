import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Datenbank {

    private final String jdbcConnectString;
    private final String benutzer;
    private final String kennwort;

    private Connection con;

    public Datenbank(String jdbc, String benutzer, String kennwort) {
        // Attribute setzen
        this.jdbcConnectString = jdbc;
        this.benutzer = benutzer;
        this.kennwort = kennwort;
    }

    public boolean verbinde() {
        // Schritt 1: Verbindung aufbauen
        try {
            con = DriverManager.getConnection(jdbcConnectString, benutzer, kennwort);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getHostnameById(int id) {
        String hostname = null;

        // Schritt 2: SQL-Anweisungen ausführen
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT P_Hostname FROM t_switches WHERE F_Inventar_Nr = " + id);

            // Schritt 3: Ergebnis abfragen
            if (rs.next()) {
                hostname = rs.getString("P_Hostname");
            }

            // Schließe ResultSet und Statement
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return hostname;
    }

    public void trenne() {
        // Schritt 4: Verbindung trennen
        try {
            if (con != null && !con.isClosed()) {
                con.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}