import java.util.Scanner;

/**
 *
 * Test: Arrays
 * Ergaenzen Sie die fehlenden Programmteile! Namen nicht vergessen!!
 *
 * @version 1.0 vom 12.03.2020
 * @author Aps,Fabian
 */

public class TestArray {

  public static void main(String[] args) {
    // Scanner-Klasse vorbereiten
    Scanner meinScanner = new Scanner(System.in);

    // Eingabeaufforderung: Wie viele Woerter moechten Sie eingeben?
    System.out.print(
      "\n******************************************\n* Wie viele Woerter moechten sie Eingeben? *\n******************************************\n=> "
    );
    int index = meinScanner.nextInt();
    // "Eingabetaste" abfangen :)
    meinScanner.nextLine();

    // Neues Array "woerter" mit Laenge "anzahl" deklarieren:
    int anzahl = index;
    String woerter[] = new String[anzahl];

    // Aufforderung: Einzelne Woerter eingeben (Zaehlschleifengesteuert) und in StringArray speichern!
    for (int i = 0; i < index; i++) {
      
      System.out.print(
        "\n**************************************\n* Geben Sie ihr " +
        (i+ 1) +
        " . Wort ein? *\n**************************************\n=> "
      );

      woerter[i] = meinScanner.next();
    }

    // Alle Woerter wieder ausgeben - zur Abwechslung mit einer while-Schleife!

    int i = 0;
    while (i < index) {
      
      System.out.println(woerter[i]);
      i++;
    } // end of while
  } // end of main
} // end of class TestArray
