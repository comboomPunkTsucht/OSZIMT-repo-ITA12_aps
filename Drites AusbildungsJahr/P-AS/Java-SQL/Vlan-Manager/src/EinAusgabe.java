public class EinAusgabe {

    // Attribut für Datenbank
    private Datenbank db;

    // Konstruktor
    public EinAusgabe(Datenbank db) {
        // Setze Attribut
        this.db = db;

        // Verbindung herstellen
        if (db.verbinde()) {
            System.out.println("Verbindung erfolgreich hergestellt.");
        } else {
            System.out.println("Verbindung fehlgeschlagen.");
        }
    }

    // Anzeigen der Daten
    public void zeigeSwitchAn(int id) {
        // Datenbank fragen
        String hostname = db.getHostnameById(id);

        // Hostname anzeigen
        if (hostname != null) {
            System.out.println("Hostname für Switch mit ID " + id + ": " + hostname);
        } else {
            System.out.println("Switch mit ID " + id + " nicht gefunden.");
        }
    }
}