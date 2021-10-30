/**
  *
  * description
  *
  * @version 1.0 from 28.10.2021
  * @author Aps, Fabian; Kanbr, Abdulaziz; 
  * @klasse ITA12
  */

//Imports
import java.util.*;

public class ET_Rechner_ITA12 {

  public static void main(String[] args) {

    // Variabeln deklaration
    double spannungU = 0.00;
    double wiederstandR = 0.00;
    double stromstearkeI = 0.00;
    double powerP = 0.00;
    double leitfaeigkeitG = 0.00;
    byte auswahl = 0;
    byte unterauswahl = 0;
    double eingabe_ergebniss = 0.00;
    double soll_ergebniss = 0.00;
    double soll_round_ergebniss = 0.00;
    double rnum1 = 0.00;
    double rnum2 = 0.00;
    boolean leitfaeigkeit_boolean = false;

    // Scanner deklarieren

    Scanner scanner_auswahl = new Scanner(System.in);
    Scanner scanner_unteruswal = new Scanner(System.in);
    Scanner scanner_ergebniss = new Scanner(System.in);

    // random deklarieren

    Random random1 = new Random();
    Random random2 = new Random();

    rnum1 = random1.nextInt(1000);
    rnum2 = random2.nextInt(1000);

    // abfrage des ausgerechnetem Rergebniss

    System.out.println("---------------------------------------------------------------------------");
    System.out.println("Waehlen Sie Ihren Rechner:");
    System.out.println("[0] Ohmisches Gesetz");
    System.out.println("[1] Elektrische Leistung");
    System.out.println("[2] Elektrische Leitfähigkeit");
    System.out.println("|");
    System.out.println("Geben Sie bitte eine Zahl von 0 bis 2 ein um ein Rechner auszuwählen!!!");
    System.out.println("---------------------------------------------------------------------------");
    System.out.print("=>");

    auswahl = scanner_auswahl.nextByte();

    switch (auswahl) {

    case 0:

      // Berechnug des Ohmischen Gesetzes

      System.out.println("---------------------------------------------------------------------------");
      System.out.println("Waehlen Sie Ihren Rechner:");
      System.out.println("[0] Spannung");
      System.out.println("[1] Wiederstand");
      System.out.println("[2] Stromstearke");
      System.out.println("|");
      System.out.println("Geben Sie bitte eine Zahl von 0 bis 2 ein um ein Rechner auszuwählen!!!");
      System.out.println("---------------------------------------------------------------------------");
      System.out.print("=>");

      unterauswahl = scanner_unteruswal.nextByte();

      switch (unterauswahl) {
      case 0:

        wiederstandR = rnum1;
        stromstearkeI = rnum2;

        soll_ergebniss = wiederstandR * stromstearkeI;

        System.out
            .println("Berechnen Sie die Spannung aus R =" + wiederstandR + " Ohm und I = " + stromstearkeI + " A.");
        System.out.print("Ergebniss in Volt (auf 2 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      case 1:

        stromstearkeI = rnum1;
        spannungU = rnum2;

        soll_ergebniss = spannungU / stromstearkeI;
        System.out.println("Berechnen Sie den Wiederstand aus U =" + spannungU + " V und I = " + stromstearkeI + " A.");
        System.out.print("Ergebniss in Ohm (auf 2 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      case 2:

        spannungU = rnum1;
        wiederstandR = rnum2;

        soll_ergebniss = spannungU / wiederstandR;
        System.out
            .println("Berechnen Sie die Stomstearke aus R =" + wiederstandR + " Ohm und U = " + spannungU + " V.");
        System.out.print("Ergebniss in Ampere (auf 2 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      default:

        if (unterauswahl >= 3) {
          System.out.print("Das habe ich nicht Verstanden!!");
        }
        ;

        break;
      }
      break;

    case 1:

      // Berechnug der Leistung

      System.out.println("---------------------------------------------------------------------------");
      System.out.println("Waehlen Sie Ihren Rechner:");
      System.out.println("[0] Spannung");
      System.out.println("[1] Power");
      System.out.println("[2] Stromstearke");
      System.out.println("|");
      System.out.println("Geben Sie bitte eine Zahl von 0 bis 2 ein um ein Rechner auszuwählen!!!");
      System.out.println("---------------------------------------------------------------------------");
      System.out.print("=>");

      unterauswahl = scanner_unteruswal.nextByte();

      switch (unterauswahl) {
      case 0:

        break;

      case 1:

        powerP = rnum1;
        stromstearkeI = rnum2;

        soll_ergebniss = powerP / stromstearkeI;

        System.out.println("Berechnen Sie die Spannung aus P =" + powerP + " W und I = " + stromstearkeI + " A.");
        System.out.print("Ergebniss in Volt (auf 2 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      case 2:

        spannungU = rnum1;
        stromstearkeI = rnum2;

        soll_ergebniss = spannungU * stromstearkeI;
        System.out.println("Berechnen Sie die Leistung aus U =" + spannungU + " V und I = " + stromstearkeI + " A.");
        System.out.print("Ergebniss in Watt (auf 2 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      default:

        if (unterauswahl >= 3) {
          System.out.print("Das habe ich nicht Verstanden!!");
        }
        ;

        break;
      }
      break;

    case 2:

      leitfaeigkeit_boolean = true;

      // Berechnung der Leitfhigkeit

      System.out.println("---------------------------------------------------------------------------");
      System.out.println("Waehlen Sie Ihren Rechner:");
      System.out.println("[0] Leitfähigkeit");
      System.out.println("[1] Wiederstand");
      System.out.println("|");
      System.out.println("Geben Sie bitte eine Zahl von 0 bis 1 ein um ein Rechner auszuwählen!!!");
      System.out.println("---------------------------------------------------------------------------");
      System.out.print("=>");

      unterauswahl = scanner_unteruswal.nextByte();

      switch (unterauswahl) {
      case 0:

        wiederstandR = rnum1;

        soll_ergebniss = 1 / wiederstandR;
        System.out.println("Berechnen Sie die Leitfeahigkeit aus R =" + wiederstandR + " Ohm.");
        System.out.print("Ergebniss in Siemens  (auf 4 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      case 1:

        leitfaeigkeitG = rnum1;

        soll_ergebniss = 1 / leitfaeigkeitG;
        System.out.println("Berechnen Sie die Leitfeahigkeit aus G =" + leitfaeigkeitG + " S.");
        System.out.print("Ergebniss in Ohm (auf 4 nachkommerstellen) =>");

        eingabe_ergebniss = scanner_ergebniss.nextDouble();

        break;

      default:

        if (unterauswahl >= 2) {
          System.out.print("Das habe ich nicht Verstanden!!");
        }
        ;

        break;
      }
      break;

    default:

      if (auswahl >= 3) {
        System.out.print("Das habe ich nicht Verstanden!!");
      }
      ;

      break;
    }

    // Rundung des soll Eregebnisse
    if (leitfaeigkeit_boolean = false) {
      soll_round_ergebniss = Math.round(100.0 * soll_ergebniss) / 100.0;
    } else {
      soll_round_ergebniss = Math.round(10000.0 * soll_ergebniss) / 10000.0;
    }

    // ausgabe Korektheit

    if (eingabe_ergebniss == soll_round_ergebniss) {
      System.out.println("--------------------------------------------------------");
      System.out.println("Ihr Ergebiss ist Richtig!!!");
      System.out.println("Ihre Eingabe: " + eingabe_ergebniss);
      System.out.println("--------------------------------------------------------");
    } else {
      System.out.println("--------------------------------------------------------");
      System.out.println("Ihr Ergebiss ist leider falsch!!!");
      System.out.println("Ihre Eingabe: " + eingabe_ergebniss);
      System.out.println("Korektes Ergebniss ist: " + soll_round_ergebniss);
      System.out.println("--------------------------------------------------------");
    }
  }
}
