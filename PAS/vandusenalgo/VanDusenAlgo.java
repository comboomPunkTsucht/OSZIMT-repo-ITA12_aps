/*
@mcpeaps_HD
@Aps, Fabian
ITA12

*/

import java.util.Scanner;

public class VanDusenAlgo {
  public static void main (String [] args) {

Scanner scanner = new Scanner(System.in);


final int BERECHNUNGSFORMELKONSTANTE = 8;
System.out.print("Bitte geben Sie eine ganze Zahl ein: ");//eingabe
int eingabe = scanner.nextInt(); 
int berechner;
if(eingabe < 0) {
    System.out.println("Keine Garantie bei negativen Zahlen!"); //fail-save ausage
  }
berechner = eingabe * eingabe + BERECHNUNGSFORMELKONSTANTE * eingabe + 7;  
System.out.print("Das Ergebnis der Verarbeitung ist: " + berechner);//Ausgabe

} //end main
} //end class