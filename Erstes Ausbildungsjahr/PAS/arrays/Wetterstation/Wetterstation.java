import java.util.*;

public class Wetterstation {

    public Random r = new Random();

    


  public static void main(String[] args) {}

  public static void output(String out) { 
    System.out.print(out);
  }

  public static int[] Random_Array () { //<--  // Die Listen für die Messwerte deklarieren und initialisieren
    int min = -5;
    int max = 5;

    int[] array = new int[31]

    for( int i = 0; i < 32; i++ ) {
      array[i] = r.nextInt(max - min + 1) + min;
      return array;
    }
    
  }

  public static void dumptable () { //<-- // Es werden alle gespeicherten Werte als Tabelle ausgegeben
    
  }
 
    // Der Benutzer wird nach dem Tag und der Art des Werts gefragt, dann wird der Wert an die passende Stelle gespeichert
    // \/
  public static void menu(char key) {
    output(
      "************************************************************** \n * Waele eine option * \n * Messwerte [e]ingeben * \n * 2. Messwerte [a]usgeben * \n * [Q] Programm beenden * \n ************************************************************** \n"
    );

    switch (key) {
      case 'q':
        System.out.println("Auswertung");
        System.exit();
        case 'Q':
        System.out.println("Auswertung");
        System.exit();
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
}
