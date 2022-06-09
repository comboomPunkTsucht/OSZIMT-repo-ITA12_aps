import java.util.*;

public class Wetterstation {

  public static Random r = new Random();
  public static Scanner scanner = new Scanner(System.in);

  public static void main(String[] args) {
    double[] temp = new double[31];
    char key;
    for (int i = 0; i < temp.length; i++) {
      temp[i] = 0;
    }

    do {
      //temp = random_Array();
      System.out.print(
        "************************************************************** \n * Waele eine option * \n * 1. Messwerte eingeben [e]* \n * 2. Messwerte ausgeben [a]* \n * 3. Durchschnitt ausgeben [d] * \n * 4. Max [>] * \n * 5. Min [<] * \n * 6. Frosttage [f] * \n * 7. Programm beenden [q]* \n ************************************************************** \n"
      );
      key = scanner.next().charAt(0);

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
          } else {
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
          } else {
            temp = random_Array();
          }
          break;
        case 'D':
          //System.out.println("Durchschnitt");
          System.out.println(
            "Der Durchschnitt betreagt: " +
            ((durchschnitt(temp) * 10) / 10) +
            " Grad Celsius und " +
            (Math.round(((durchschnitt(temp) * 9 / 5) + 32) * 10.0) / 10.0) +
            " Fahrenheit"
          );
          break;
        case 'd':
          //System.out.println("Durchschnitt");
          System.out.println(
            "Der Durchschnitt betreagt: " +
            ((durchschnitt(temp) * 10) / 10) +
            " Grad Celsius und " +
            (Math.round(((durchschnitt(temp) * 9 / 5) + 32) * 10.0) / 10.0) +
            " Fahrenheit"
          );
          break;
        case '>':
          max_own(temp);
          break;
        case '<':
          min_own(temp);
          break;
        case 'f':
          frosttage(temp);
          break;
        case 'F':
          frosttage(temp);
          break;
        case 'q':
          System.out.println("Programm beendet");
          System.exit(0);
          break;
        case 'Q':
          System.out.println("Programm beendet");
          System.exit(0);
          break;
        default:
          System.out.println("Falsche Taste");
      }
    } while (key != 'q' || key != 'Q');
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
    double eingabe[] = new double[31];

    for (int i = 0; i < eingabe.length; i++) {
      System.out.println(
        "geben sie die nächste Messwert in Grad Celsius für den " +
        (i + 1) +
        " Tag ein"
      );
      System.out.print("> ");
      eingabe[i] = scanner.nextDouble();
    }
    return eingabe;
  }

  public static void dumptable(double array[]) {
    for (int i = 0; i < array.length; i++) {
      System.out.print(i + "| \t ");
    }
    System.out.println(
      "\n-----------------------------------------------------------------------------------------"
    );
    for (int i = 0; i < array.length; i++) {
      System.out.print(array[i] + "| \t ");
    }
    System.out.println(
      "\n-----------------------------------------------------------------------------------------"
    );
  } //<-- // Es werden alle gespeicherten Werte als Tabelle ausgegeben

  // Der Benutzer wird nach dem Tag und der Art des Werts gefragt, dann wird der Wert an die passende Stelle gespeichert
  // \/

  public static void min_own(double array[]) { // <--Das Maximum und das Minimum aus dem Array heraussuchen (zwei Methoden)
    double min = 0;
    Arrays.sort(array);
    min = array[0];
    System.out.println("Der kleinste Wert ist: " + min);
  }

  public static void max_own(double[] array) { // <--Das Maximum und das Minimum aus dem Array heraussuchen (zwei Methoden)
    double max = 0;
    Arrays.sort(array);
    max = array[array.length - 1];
    System.out.println("Der groeste Wert ist: " + max);
  }

  public static double[] fahrenheit_gay(double array[]) {
    double[] fahrenheit = new double[31];
    for (int i = 0; i < array.length; i++) {
      fahrenheit[i] = (array[i] * (9.0 / 5.0)) + 32.0;
      fahrenheit[i] = Math.round(fahrenheit[i] * 10.0) / 10.0;
    }

    return fahrenheit;
  }

  public static void frosttage(double[] array) {
    int sum = 0;
    for (int i = 0; i < array.length; i++) {
      if (array[i] <= 0) {
        sum++;
      }
    }
    System.out.println("Es sind " + sum + " Frosttage");
  }

  public static double durchschnitt(double[] array) {
    double sum = 0;
    double durchschnitt = 0;
    for (int i = 0; i < array.length; i++) {
      sum = +array[i];
    }
    durchschnitt = sum / array.length;
    return durchschnitt;
  }
}
