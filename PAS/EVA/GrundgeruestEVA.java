/**
 *
 * Beschreibung
 *
 * @version 1.0 vom 18.09.2020
 * @author 
 */

import java.util.*;

public class GrundgeruestEVA {
  public static void main(String[] args) {
    //Variablen anlegen
    Scanner scan = new Scanner(System.in);
    int zahl;
    int ergebnis;
    
    //Eingabe
    System.out.println("Geben Sie eine ganze Zahl ein: ");
    zahl = scan.nextInt();
    
    //Verarbeitung
    ergebnis = zahl + zahl;
    
    //Ausgabe
    System.out.println("Das doppelte der Zahl ist " + ergebnis);  
    
  } // end of main
} // end of class GrundgeruestEVA

