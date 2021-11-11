import java.util.Scanner;

/**
 *
 * Taschenrechner.java - leider nicht ganz fertig :(
 *
 * @version 0.1 vom 07.11.2018 - 11.11.2021
 * @author F. Iesling - Aps, Fabian
 */

// Scanner-Klasse importieren

import java.util.*;

public class Taschenrechner {

  public static void main(String[] args) {

    // Neues Objekt der Scanner-Klasse erstellen

    Scanner scan_auswahl = new Scanner(System.in);
    Scanner scan_zahl1 = new Scanner(System.in);
    Scanner scan_zahl2 = new Scanner(System.in);
    Scanner scan_ausgang = new Scanner(System.in);

    char auswahl = 'x';
    do {
      // Benutzer fragen: "Bitte geben Sie Zahl 1 ein:"

      System.out.print("Geben Sie Bitte Ihre 1. Zahl ein: => ");

      // Eingabe in Variable a speichern

      double zahl1 = scan_zahl1.nextDouble();

      // Benutzer fragen: "Bitte geben Sie Zahl 2 ein:"
      System.out.print("Geben Sie Bitte Ihre 2. Zahl ein: => ");
      // Eingabe in Variable b speichern
      double zahl2 = scan_zahl2.nextDouble();
      // Benutzer fragen: "Was m�chten Sie machen?"
      System.out.println("----------------------------------------------------------");
      System.out.println("Geben Sie Bitte Ihren Rchner an, den Sie verwenden möchten");
      System.out.println("[s] Adition");
      System.out.println("[d] Suptraktion");
      System.out.println("[p] Multiplikation");
      System.out.println("[q] Division");
      System.out.println("[r] Rest einer Division");
      System.out.println("[g] Gleichheit");
      System.out.println("[v] Groesserheit");
      System.out.println("[m] Kleinerheit");
      System.out.println("[x] Exit");
      System.out.println("----------------------------------------------------------");
      System.out.print("=> ");
      // Eingabe in auswahl speichern
      // Tipp: Einen char mit der Scanner-Klasse einlesen:
      // scanner.next().charAt(0);
      auswahl = scan_auswahl.next().charAt(0);

      // Auswahl:
      switch (auswahl) {
      case 's':
        // Summe rechnen und ausgeben

        double ergebnisss = zahl1 + zahl2;
        System.out.println(zahl1 + " + " + zahl2 + " = " + ergebnisss);
        break;
      case 'd':
        // Differenz rechnen und ausgeben
        double ergebnissd = zahl1 - zahl2;
        System.out.println(zahl1 + " - " + zahl2 + " = " + ergebnissd);
        break;
      case 'p':
        // Produkt rechnen und ausgeben
        double ergebnissp = zahl1 * zahl2;
        System.out.println(zahl1 + " * " + zahl2 + " = " + ergebnissp);
        break;
      case 'q':
        // Quotient rechnen und ausgeben
        double ergebnissq = zahl1 / zahl2;
        System.out.println(zahl1 + " : " + zahl2 + " = " + ergebnissq);

        break;
      case 'r':
        double ergebnissr = zahl1 % zahl2;

        System.out.println(zahl1 + " : " + zahl2 + " =  Rest = " + ergebnissr);
        break;
      case 'g':
        // Vergleichen (gleich) und ausgeben
        boolean ergebnissg = zahl1 == zahl2;
        System.out.println(zahl1 + " == " + zahl2 + " = " + ergebnissg);
        break;
      case 'v':
        // Vergleichen (gr��er als) und ausgeben
        boolean ergebnissv = zahl1 > zahl2;
        System.out.println(zahl1 + " > " + zahl2 + " = " + ergebnissv);
        break;
      case 'm':
        boolean ergebnissm = zahl1 < zahl2;
        System.out.println(zahl1 + " < " + zahl2 + " = " + ergebnissm);
        break;
      case 'x':
        // Ausgabe: "Auf Wiedersehen!"
        System.out.print("Möchten Sie Wirklich das Pogramm Verlassen (y = ja / n = nein): ");
        char ausgang = scan_ausgang.next().charAt(0);
        switch (ausgang) {
        case 'n':
          auswahl = '0';
          break;
        case 'y':
          return;
        case 'Y':
          return;

        default:
          auswahl = '0';
          break;
        }
        break;
      case '0':

        break;
      default:
        // Ausgabe: "Sorry, das habe ich nicht verstanden!"
        System.out.println("Versuchen Sie Es Nocheinmal");
        break;
      } // end of switch
    } while (auswahl != 'x'); // end of do-while
  } // end of main
} // end of class Taschenrechner
