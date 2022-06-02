import java.util.*;

public class Wetterstation {

  public static Random r = new Random();

  public static void main(String[] args) {
    dumptable(random_Array());
    fahreheit_gay(random_Array());
  }

  public static int[] random_Array() { //<--  // Die Listen für die Messwerte deklarieren und initialisieren
    //<-- // Alle Messwerte mit zufälligen Daten im Bereich von -5 … +5 Grad belegen
    int min = -5;
    int max = 5;

    int[] array = new int[31];

    for (int i = 0; i < array.length; i++) {
      array[i] = r.nextInt(max - min + 1) + min;
    }
    return array;
  }

  public static void dumptable(int array[]) {
    for (int i = 0; i < array.length; i++) {
      System.out.print(i + "| \t ");
    }
    System.out.println(" ");
    for (int i = 0; i < array.length; i++) {
      System.out.print(array[i] + "| \t ");
    }
  } //<-- // Es werden alle gespeicherten Werte als Tabelle ausgegeben

  // Der Benutzer wird nach dem Tag und der Art des Werts gefragt, dann wird der Wert an die passende Stelle gespeichert
  // \/
  public static void menu(char key) {
    System.out.print(
      "************************************************************** \n * Waele eine option * \n * Messwerte [e]ingeben * \n * 2. Messwerte [a]usgeben * \n * [Q] Programm beenden * \n ************************************************************** \n"
    );

    switch (key) {
      case 'q':
        System.out.println("Auswertung");
        break;
      case 'Q':
        System.out.println("Auswertung");
        break;
      case 'a':
        System.out.println("Ausgabe");
        break;
      case 'A':
        System.out.println("Ausgabe");
        break;
      case 'e':
        System.out.println("Eingabe");
        break;
      case 'E':
        System.out.println("Eingabe");
        break;
      default:
        System.out.println("Falsche Taste");
    }
  } 




  public static void min_own(int array[]) {
    int min = -5;
    for (int i = 0; i < array.length; i++) {
      if (array[i] > min) {
        min = array[i];
      }
    }
    System.out.println("Der kleinste Wert ist: " + min);
  }
  public static void max_own() { 
    int max = 5;
  for (int i = 0; i < array.length; i++) {
    if (array[i] < max) {
      max = array[i];
    }
  }
  System.out.println("Der groeste Wert ist: " + max);

  public static void fahrenheit_gay() {
   
   
   
    ( array[i] * 9/5) + 32 
  }
  
}  // <--Das Maximum und das Minimum aus dem Array heraussuchen (zwei Methoden) 

}
