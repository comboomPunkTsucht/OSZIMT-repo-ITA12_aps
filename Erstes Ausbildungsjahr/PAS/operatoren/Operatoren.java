/* Operatoren.java
   Uebung zu Operatoren in Java
   Aps, Fabian
*/

import java.util.*;

public class Operatoren {
      public static void main(String[] args) {
            /* 1. Deklarieren Sie zwei Ganzzahlen. */
            Random zahl1 = new Random();
            Random zahl2 = new Random();

            int z1; // zahl 1
            z1 = zahl1.nextInt(10);
            int z2; // zahl 2
            z2 = zahl2.nextInt(10);
            System.out.println("UEBUNG ZU OPERATOREN IN JAVA");
            System.out.println(z1);
            System.out.println(z2);

            /*
             * 2. Weisen Sie den Ganzzahlen die Werte 75 und 23 zu und geben Sie sie auf dem
             * Bildschirm aus.
             */
            z1 = 75;
            z2 = 23;
            System.out.println(z1);
            System.out.println(z2);

            /*
             * 3. Addieren Sie die Ganzzahlen und geben Sie das Ergebnis auf dem Bildschirm
             * aus.
             */
            int ergebniss = z1 + z2;
            System.out.println(ergebniss);

            /*
             * 4. Wenden Sie *alle anderen* arithmetischen Operatoren auf die Ganzzahlen an
             * und geben Sie das Ergebnis jeweils auf dem Bildschirm aus.
             */
            int ergebniss2 = z1 - z2;
            int ergebniss3 = z1 * z2;
            int ergebniss4 = z1 / z2;
            int ergebniss5 = z1 % z2;
            System.out.println(ergebniss2 + " " + ergebniss3 + " " + ergebniss4 + " " + ergebniss5);

            /*
             * 5. Ueberpruefen Sie, ob die beiden Ganzzahlen gleich sind und geben Sie das
             * Ergebnis auf dem Bildschirm aus.
             */
            boolean iftrue = z1 == z2;
            System.out.println(iftrue);
            /*
             * 6. Wenden Sie drei anderen Vergleichsoperatoren auf die Ganzzahlen an und
             * geben Sie das Ergebnis jeweils auf dem Bildschirm aus.
             */
            boolean b1 = true;
            boolean b2 = false;
            boolean iftrue2 = b1 || b2;
            boolean iftrue3 = b1 ^ b2;
            boolean iftrue4 = b1 && b2;
            System.out.println(iftrue2 + " " + iftrue3 + " " + iftrue4);
            /*
             * 7. Ueberpruefen Sie, ob die beiden Ganzzahlen im Interval [0;50] liegen und
             * geben Sie das Ergebnis auf dem Bildschirm aus.
             * 
             * Tipp: Auch das geht nur mit Operatoren!
             */
            boolean iftrue5 = z1 < 50 && 0 < z1 && z2 < 50 && z2 < 0;
            System.out.println(iftrue5);
      } // Ende von main
} // Ende von Operatoren