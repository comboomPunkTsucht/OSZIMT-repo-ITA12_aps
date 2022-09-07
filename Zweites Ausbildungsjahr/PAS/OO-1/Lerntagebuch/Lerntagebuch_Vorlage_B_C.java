/**
 *
 * Lerntagebuch Vorlage
 *
 * @version 1.0 vom 22.2.2022
 * @author Max Mustermann
 */

import java.util.*;

public class Lerntagebuch_Vorlage_B_C {

  public Scanner scan = new Scanner(System.in);

  public static void main(String[] args) {
    /*** Vorbereiten der Arrays ***/

    // Vorbereiten der Laenge (Standard-Wert 10)
    int laenge = 10;

    // Frage so lange weiter, bis die Laenge gueltig ist- mindestens 10 Eintraege
    // Tipp: fussgesteuerte Schleife ...solange laenge kleiner als 10

    // Erstellen der Arrays fuer die vier Spalten:

    int[] durraration = new int[laenge];
    String[] activity = new String[laenge];
    String[] subject = new String[laenge];
    String[] date = new String[laenge];

    /*** Festlegen der Beispieldaten ***/

    /*** Hauptschleife ***/

    durraration[0] = 45;
    activity[0] = "Übung zu Schleifen und Methode";
    subject[0] = "PAS";
    date[0] = "11.08.";

    // Variable fuer die Eingabe (Zeichen oder ganze Zahl)
    int eingabe = 0;

    // Anfang der fussgesteuerten Schleife
    do {
      /*** Ausgabe der Eintraege ***/

      // Zaehlschleife, Laenge eines der Arrays verwenden
      // Verzweigung: Ist die Dauer des Eintrags groesser 0?
      // Tipp: hier auch die Summe nicht vergessen!

      // Ausgabe der Summe

      /*** Menu ***/
      // Abfragen der Auswahl, Speichern in Variable eingabe

      // Fallunterscheidung fuer eingabe
      switch (eingabe) {
        /* Fall: Eingabe */

        // Schritt 1: naechste freie Zeile Suchen

        // Schritt 2: wurde eine Zeile gefunden? (gefundene Zeilennummer ist groesser oder gleich 0)
        // Ja: Index ok, Daten abfragen / eintragen
        // Nein: Fehler ausgeben

        /* Fall: Ende */
        // Meldung ausgeben

        /* Standard-Fall */
        default:
        // Fehler ausgeben
      }
    } while (eingabe != 9); // end of do-while
  } // End of main - geschafft :)
} // end of class Lerntagebuch_Vorlage_B_C
