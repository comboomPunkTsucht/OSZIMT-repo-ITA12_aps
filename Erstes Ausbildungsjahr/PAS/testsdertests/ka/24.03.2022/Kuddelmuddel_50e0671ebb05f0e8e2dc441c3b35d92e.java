
// Oha! Was ist hier passiert?
// Bringen Sie diesen Quelltext wieder in Ordnung und sorgen Sie daf�r
// dass die "Goldenen Regeln f�r guten Java-Quelltext" eingehalten werden

import java.util.Scanner;

/**
 * @author <a href="mailto:mcpeaps_HD@outlook.com" /a>Aps,Fabian
 * @version 1.00 from 24/03/2022
 */

public class Kuddelmuddel {

  public static void zeichneLinie(int zealer, char zeichen) {
    for (int i = 0; i < zealer; i++) {
      System.out.print(zeichen);
    }
    System.out.println();
  }

  public static void main(String[] args) {
    Scanner meinScanner = new Scanner(System.in);

    // Eingabe der Infos
    System.out.print("Bitte geben Sie die Breite der Linie ein: ");
    int zealer = meinScanner.nextInt();
    System.out.print("Bitte geben Sie das gewuenschte Zeichen fuer eine Linie ein: ");
    char zeichen = meinScanner.next().charAt(0);

    // Leerzeile
    System.out.println();

    // Linie
    zeichneLinie(zealer, zeichen);
  }
}
