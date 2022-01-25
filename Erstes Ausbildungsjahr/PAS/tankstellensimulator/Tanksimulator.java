
/**
  *
  * Beschreibung
  *
  * @version 1.0 vom 22.08.2021
  * @author mcpeaps_HD
  */

import java.util.Scanner;

public class Tanksimulator {

  public static void main (String[] args) {

    // Eingabe von der Tastatur vorbereiten
    Scanner meinScanner = new Scanner(System.in); // Semikolon nicht vergessen!

    // Variablen
    double fuellstand = 0.0;

    // erweiterte eingaben f�r text
    double fuellstand_prozent = 0;
    double fuellstand_verbraucht = 0;
    double fuellstand_real = 0;
    double fuel_over = 0;

    fuel_over = fuellstand - 100;

    fuellstand_real = fuellstand - fuel_over;
    fuellstand_verbraucht = 0;
    fuellstand_prozent = fuellstand_real;

    // Eingabe des Start-Fuellstands
    System.out.print("Bitte geben Sie den Start-Fuellstand ein: ");
    fuellstand = meinScanner.nextDouble(); // Hier wird etwas eingelesen

    // Variable fuer die Benutzerwahl
    int eingabe = 0;

    // Programmablauf
    do {
      System.out.println("----");
      // Mit + werden mehrere Textabschnitte f�r die Ausgabe verbunden
      System.out.println("Der aktuelle Fuellstand betraegt: " + fuellstand_real + " Liter. Sie haben noch "
          + fuellstand_prozent + "% im Tank. Es wurden " + fuellstand_verbraucht + " Liter verbraucht");
      System.out.println("----");
      System.out.println("Bitte waehlen Sie:");
      System.out.println("[3] Fuelstant fuellen");
      System.out.println("[2] Fuelstand leeren");
      System.out.println("[1] Verbrauchen");
      System.out.println("[0] Programm-Ende");
      System.out.println("");
      System.out.print("> ");

      // Hier wird etwas von der Tastatur gelesen
      eingabe = meinScanner.nextInt();

      // Switch = Fallunterscheidung
      switch (eingabe) {
        case 0: // Entweder 0
          System.out.println("Tschuessikowski!");
          break;
        case 1: // Oder 1
          // Hier wird etwas verbraucht
          int eingabe_verb = 0;
          int verbraucher = 2;

          System.out.println("[1] um 4 senken");
          System.out.println("[0] um 2 senken");
          System.out.println("");
          System.out.print("> ");

          eingabe_verb = meinScanner.nextInt();

          switch (eingabe_verb) {
            case 0:
              verbraucher = 2;

            case 1:
              verbraucher = 4;

            default:
              ;

          } // end of switch

          fuellstand_real = fuellstand_real - verbraucher;
          fuellstand_prozent = fuellstand_prozent - verbraucher;
          fuellstand_verbraucht = fuellstand_verbraucht + verbraucher;
          if (fuellstand_real < 0) {
            fuellstand_real = 0.0;
          }
          ; // end of if
          break; // Das break ist wichtig! Es sorgt dafuer,
        // dass nicht direkt die naechste Anweisung
        // mit ausgefuehrt wird.
        case 2: // Oder 1
          // Hier wird etwas verbraucht
          fuellstand_verbraucht = fuellstand_verbraucht + fuellstand_real;
          fuellstand_real = fuellstand_real - fuellstand_real;
          fuellstand_prozent = fuellstand_prozent - fuellstand_prozent;
          break; // Das break ist wichtig! Es sorgt dafuer,
        // dass nicht direkt die naechste Anweisung
        // mit ausgefuehrt wird.
        case 3: // Oder 1
          // Hier wird etwas verbraucht
          fuellstand_real = 100;
          fuellstand_prozent = 100;
          break; // Das break ist wichtig! Es sorgt dafuer,
        // dass nicht direkt die naechste Anweisung
        // mit ausgefuehrt wird.
        default: // Wenn kein Fall zutrifft, springe hier hin
          System.out.println("Entschuldigung, das habe ich nicht verstanden");

      } // Die geschweifte Klammer } hier geh�rt zur { Klammer nach switch
    } while (eingabe > 0); // Wiederhole so lange, wie die Bedingung "eingabe > 0" erfuellt ist!

    // Hier kommt nix mehr ;)

  } // end of main

} // end of class Tanksimulator
