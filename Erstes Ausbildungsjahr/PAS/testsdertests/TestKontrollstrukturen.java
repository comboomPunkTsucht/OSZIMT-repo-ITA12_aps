/**
 *
 * Beschreibung
 *
 * @version 1.0 vom 16.01.2019
 * @author Aps, Fabian
 */

public class TestKontrollstrukturen {
  
  public static void main(String[] args) {
    
    /*** 1. Implementieren Sie eine Zählschleife, die folgende Ausgabe erzeugt: ***
    
    0 2 4 8 10 12 14 16
    */
     for (int i = 0; i <= 16; i = i + 2) {
      System.out.print(i + " ");
     }
    System.out.println();
    /*** 2. Implementieren Sie eine DoWhile-Schleife, die folgende Ausgabe erzeugt: ***
    ;
    5 4 3 2 1
    */
     int x = 5;
    do {
      System.out.print(x + " ");
      x--;
    } while (x > 0); // end of do-while
    System.out.println();
    /*** 3. Implementieren Sie eine While-Schleife, die folgende Ausgabe erzeugt: ***
    
    2 4 8 16 32 64
    */
    int z = 1;
    while (z <= 32) { 
      z = z + z;
      System.out.print(z + " ");
    } // end of while
  } // end of main

} // end of class TestKontrollstrukturen

