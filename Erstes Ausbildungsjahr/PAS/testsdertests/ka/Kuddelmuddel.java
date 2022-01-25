// [A3] Quelltext korrigieren
// Bitte ergaenzen Sie die fehlenden Felder (insg. 14 Punkte)
// Ausserdem sind elf weitere Fehler versteckt,
// sodass Sie insgesamt 25 Punkte erhalten koennen

// Name: Aps, Fabian

import java.util.*; // [1P]

public class Kuddelmuddel { // [1P]

  public static void main(String[] args) { // [2P]

    Scanner meinScanner = new Scanner(System.in); // [4P]

    System.out.print("Bitte geben Sie die Breite der Linie ein: ");

    // n ist eine ganzzahlige Variable fuer die Breite der Linie,
    // die der Benutzer eingeben soll.
    int n = meinScanner.nextInt(); // [2P]

    // Leerzeile
    System.out.println();

    // "Linie" einzeichnen
    int i = 1; // Schleifenkontrollvariable deklarieren [1P]
    while (i <= n) { // solange i kleiner oder gleich n ist [2P]
      System.out.print("-");
      i++; // i um 1 erh�hen [1P]
    }
    System.out.println();
    System.out.println("Frohe Weihnachten!");

  }
}