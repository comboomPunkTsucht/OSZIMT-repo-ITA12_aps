import java.util.*;

/**
 *OSZIMT-repo-ITA12_aps: https://github.com/comboomPunkTsucht/OSZIMT-repo-ITA12_aps/tree/main/Erstes%20Ausbildungsjahr/PAS/arrays
 *
 * @author Aps,Fabian mcpeaps_HD@outlook.com
 * @className Notenspiegel
 * @description
 * @date 2022/05/05 13:06:28
 */
public class Notenspiegel {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int[] notenanzahl = new int[6];
    //anzal der noten
    for (int i = 0; i < notenanzahl.length; i++) {
      System.out.println("Anzahl der Schueler mit der Note " + (i + 1) + ": ");
      notenanzahl[i] = scanner.nextInt();
    }
    //ausgabe
    int notendurchschnitt =
      (
        notenanzahl[0] *
        1 +
        notenanzahl[1] *
        2 +
        notenanzahl[2] *
        3 +
        notenanzahl[3] *
        4 +
        notenanzahl[4] *
        5 +
        notenanzahl[5] *
        6
      ) /
      (
        notenanzahl[0] +
        notenanzahl[1] +
        notenanzahl[2] +
        notenanzahl[3] +
        notenanzahl[4] +
        notenanzahl[5]
      );

    System.out.println("Notenspiegel: ");
    System.out.println("\t 1 \t 2 \t 3 \t 4 \t 5 \t 6");
    System.out.println(
      "\t" +
      notenanzahl[0] +
      "\t" +
      notenanzahl[1] +
      "\t" +
      notenanzahl[2] +
      "\t" +
      notenanzahl[3] +
      "\t" +
      notenanzahl[4] +
      "\t" +
      notenanzahl[5]
    );
    System.out.println(" ");
    System.out.println("Notendurchschnitt: " + notendurchschnitt);
  } // end of main
} // end of class
