import java.util.*;

public class Wetterstation {

  public static Random r = new Random();
  public static Scanner scanner = new Scanner(System.in);

  public static void main(String[] args) {
    double[] temp = new double[31];
    //temp = random_Array();
    System.out.print(
      "************************************************************** \n * Waele eine option * \n * Messwerte [e]ingeben * \n * 2. Messwerte [a]usgeben * \n * [Q] Programm beenden * \n ************************************************************** \n"
    );
char key = scanner.next().charAt(0);

    do{
    switch (key) {
      case 'a':
        //System.out.println("Ausgabe");
        dumptable(temp);
        dumptable(fahrenheit_gay(temp));
        break;
      case 'A':
        //System.out.println("Ausgabe");
        dumptable(temp);
        dumptable(fahrenheit_gay(temp));
        break;
      case 'e':
        //System.out.println("Eingabe");
        System.out.println("Möchten sie zufällige Werte Y/n");
        char key2 = scanner.next().charAt(0);
        if (key2 == 'y' || key2 == 'Y') {
          temp = random_Array();
        } else if (key2 == 'n' || key2 == 'N') {
          temp = eingabe_Array();
        else{
          temp = random_Array();
        }
        break;
      case 'E':
        //System.out.println("Eingabe");
        System.out.println("Möchten sie zufällige Werte Y/n");
        char key_2 = scanner.next().charAt(0);
        if (key_2 == 'y' || key_2 == 'Y') {
          temp = random_Array();
        } else if (key_2 == 'n' || key_2 == 'N') {
          temp = eingabe_Array();
        else{
          temp = random_Array();
        }
        break;
      default:
        System.out.println("Falsche Taste");
    }
    }while(key != 'q' || key != 'Q');
    
  }

  public static double[] random_Array() { //<--  // Die Listen für die Messwerte deklarieren und initialisieren
    //<-- // Alle Messwerte mit zufälligen Daten im Bereich von -5 … +5 Grad belegen
    int min = -5;
    int max = 5;

    double[] array = new double[31];

    for (int i = 0; i < array.length; i++) {
      array[i] = r.nextInt(max - min + 1) + min;
    }
    return array;
  }
  public static double[] eingabe_Array() {
    double eingabe [] = new double[30];
    
    for(int i = 0; i < eingabe.length; i++){
       eingabe[i] = scanner.nextDouble();
       System.out.println("geben sie die nächste Messwert in Grad Celsius für den " + ( i+ 1) + " Tag ein");
       System.out.print("> ");
       
      }
    return eingabe;
  };


  public static void dumptable(double array[]) {
    for (int i = 0; i < array.length; i++) {
      System.out.print(i + "| \t ");
    }
    System.out.println("\n-----------------------------------------------------------------------------------------");
    for (int i = 0; i < array.length; i++) {
      System.out.print(array[i] + "| \t ");
    }
    System.out.println("\n-----------------------------------------------------------------------------------------");
  } //<-- // Es werden alle gespeicherten Werte als Tabelle ausgegeben

  // Der Benutzer wird nach dem Tag und der Art des Werts gefragt, dann wird der Wert an die passende Stelle gespeichert
  // \/
 

  public static void min_own(int array[]) { // <--Das Maximum und das Minimum aus dem Array heraussuchen (zwei Methoden)
    int min = -5;
    for (int i = 0; i < array.length; i++) {
      if (array[i] > min) {
        min = array[i];
      }
    }
    System.out.println("Der kleinste Wert ist: " + min);
  }

  public static void max_own(int[] array) { // <--Das Maximum und das Minimum aus dem Array heraussuchen (zwei Methoden)
    int max = 5;
    for (int i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
      System.out.println("Der groeste Wert ist: " + max);
    }
  }

  public static double[] fahrenheit_gay(double array[]) {
    double[] fahrenheit = new double[31];
    for (int i = 0; i < array.length; i++) {
      fahrenheit[i] = (array[i] * (9.0/5.0)) + 32.0;
      fahrenheit[i] = Math.round(fahrenheit[i] * 10.0) / 10.0;
    }

    return fahrenheit;
  }
  public static double durchschnitt(int[] array) { 
    int sum = 0;
    double durchschnitt = 0;
    for(int i = 0; i < array.length; i++){
    sum =+ array[i];
    }
    durchschnitt = sum/array.length;
    return(durchschnitt);
    } 
}

