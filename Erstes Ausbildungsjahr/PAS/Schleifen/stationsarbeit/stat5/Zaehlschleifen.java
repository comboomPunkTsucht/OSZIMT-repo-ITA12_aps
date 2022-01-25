/*
Aps,Fabian
ITA12
16.12.2021
*/

import java.util.*;

public class Zaehlschleifen {

  // Main-Methode
  public static void main(String[] args) {

    /*
     * Aufgabe 1:
     * 
     * Schreiben Sie eine Zählschleife, die zuerst von 0 bis 10 zählt...
     * 0 1 2 3 4 5 6 7 8 9 10
     * ...und eine die dann rückwärts zählt
     * 10 9 8 7 6 5 7 3 2 1 0
     */
    for (int x = 0; x <= 10; x++) {
      System.out.println(x);
    }
    for (int y = 10; y >= 0; y--) {
      System.out.println(y);
    }
    /*
     * Aufgabe 2:
     * 
     * Schreiben Sie eine Zählschleife, die zuerst von 10 bis 20 zählt...
     * 10 11 12 13 14 15 16 17 18 19 20
     * ...und eine die dann rückwärts zählt
     * 20 19 18 17 16 15 17 13 12 11 10
     */
    for (int m = 10; m <= 20; m++) {
      System.out.println(m);
    }
    for (int n = 20; n >= 10; n--) {
      System.out.println(n);
    }
    /*
     * Aufgabe 3:
     * 
     * Schreiben Sie eine Zählschleife, die in 2er-Schritten von 0 bis 10 zählt...
     * 0 2 4 6 8 10
     * ... und dann rückwärts zählt
     * 10 8 6 4 2 0
     */
    for (int a = 0; a <= 10; a = a + 2) {
      System.out.println(a);
    }
    for (int b = 10; b >= 0; b = b - 2) {
      System.out.println(b);
    }
    /*
     * Aufgabe 4:
     * 
     * Schreiben Sie eine Zählschleife, die einen bom Benutzer eingegenenen Wert
     * insgesamt 10 mal verdoppelt :
     * 
     * Bitte geben Sie den Startwert ein: 2
     * 4 8 16 32 64 128 256 512 1024 2048
     */
    Scanner anfangswert_scan = new Scanner(System.in);
    System.out.println("*********************************");
    System.out.println("* Geben Sie ihren Startwert ein *");
    System.out.println("*********************************");
    System.out.print("=> ");
    double startwert = anfangswert_scan.nextDouble();

    for (int t = 0; t < 10; t++) {
      System.out.println(startwert);
      startwert = startwert * startwert;
    }
  }
}
