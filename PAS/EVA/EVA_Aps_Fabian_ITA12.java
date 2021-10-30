/**
  *
  * description
  *
  * @version 1.0 from 23.09.2021
  * @author Aps, Fabian
  * @class ITA12
  */

//Imports
import java.util.*;



public class EVA_Aps_Fabian_ITA12 { //start class

  public static void main(String[] args) {
    
    //variableln

    Scanner scanner = new Scanner(System.in);
    Scanner scanner_unterauswahl = new Scanner(System.in);
    Scanner scanner_rechner = new Scanner(System.in);
    Scanner scanner_stromtaerke = new Scanner(System.in);
    Scanner scanner_spannung = new Scanner(System.in);
    Scanner scanner_seiteA = new Scanner(System.in);
    Scanner scanner_seiteB = new Scanner(System.in);
    Scanner scanner_zinssatz = new Scanner(System.in);
    byte eingabe_auswahl = 0;
    byte eingabe_unterauswahl = 0;
    double eingabe_rechner = 0.00;
    double ergebniss = 0.00; 
    double stromtaerke = 0.00;
    double spannung = 0.00;
    double umfang = 0.00;
    double flecheninhalt = 0.00;
    double seiteA = 0.00;
    double seiteB = 0.00;
    double zinssatz = 0.00;
    double zinsoneyear = 0.00;
    double zinstwoyear = 0.00;
    double zinsfiveyear = 0.00;
    double zinstenyear = 0.00;

    //Verarbeitung + Eingabe
  
  System.out.println("Wählen sie ihren Rechner:");
  System.out.println("[0] Meherwertssteuerrechner");
  System.out.println("[1] Wiederstandsberechner");
  System.out.println("[2] Rechner für Flecheninhalt und Umfang eines Rechtecks");
  System.out.println("[3] Zinsrechner");
  System.out.print(">> ");
  
  eingabe_auswahl = scanner.nextByte();

    switch (eingabe_auswahl) {
        case 0:
     
        System.out.println("Wählen sie die Art der Meherwertssteuer:");
        System.out.println("[0] Normal");
        System.out.println("[1] Ermähsigt");  
        System.out.print(">> "); 
        
        eingabe_unterauswahl = scanner_unterauswahl.nextByte();

        switch (eingabe_unterauswahl) {
                case 0:
                
                System.out.print("Geben sie bitte ihren Betrag ein: >> ");
                
                eingabe_rechner = scanner_rechner.nextDouble();


                    ergebniss = (eingabe_rechner * 19) / 100;

                    System.out.print("Ihre Mehrwertssteuer Betragen: " + ergebniss + " €");


                    break;
                    case 1:
                    
                    System.out.print("Geben sie bitte ihren Betrag ein: >> ");
                    
                    eingabe_rechner = scanner_rechner.nextDouble();

                    ergebniss = (eingabe_rechner * 7) / 100;

                    System.out.print("Ihre Mehrwertssteuer Betragen: " + ergebniss + " €");

                    break;
            
                default:

                if (eingabe_unterauswahl >= 2) {
                    System.out.print("Das habe ich nicht Verstanden!!"); 
                };
                
                
                    break;
            }
            break;
            
            case 1:

            
            System.out.print("Geben Sie bitte die Stromstärke in Ampere ein: >> ");
            stromtaerke = scanner_stromtaerke.nextDouble();
            

            System.out.print("Geben Sie bitte die elektrische Spannung in Volt ein: >> ");
            spannung = scanner_spannung.nextDouble();

            ergebniss = spannung / stromtaerke;

            System.out.println("Ihr Wiederstand beträgt " + ergebniss + " Ohm");

            break;

            case 2:

            System.out.print("Bitte geben sie die Länge der Seite A in Metern an: >> ");
            seiteA = scanner_seiteA.nextDouble();

            System.out.print("Bitte geben sie die Länge der Seite B in Metern an: >> ");
            seiteB = scanner_seiteB.nextDouble();

            umfang = 2 * (seiteA + seiteB);

            flecheninhalt = seiteA * seiteB;

            System.out.println("Der Umfang von dem Rechteck bertgt " + umfang + " Meter und der Flächeninhalt des Rechteck betragt " + flecheninhalt + " Quadratmeter");

            case 3: 

            System.out.print("Bitte geben sie den Zinssatz an: >> ");
            zinssatz = scanner_zinssatz.nextDouble();

            System.out.print("Bitte geben sie den Betrag an: >> ");
            eingabe_rechner = scanner_rechner.nextDouble();

            zinsoneyear = (zinssatz * eingabe_rechner) / 100;
            zinstwoyear = zinsoneyear * 2;
            zinsfiveyear = zinsoneyear * 5;
            zinstenyear = zinsoneyear * 10;

            System.out.println("Nach einem Jahr haben Sie " + zinsoneyear + " Euro Zinsen gesammelt,");
            System.out.println("nach zwei Jahren haben Sie " + zinstwoyear + " Euro Zinsen gesammelt,");
            System.out.println("nach fuenf Jahren haben Sie " + zinsfiveyear + " Euro Zinsen gesammelt,");
            System.out.println("nach zen Jahren haben Sie " + zinstenyear + " Euro Zinsen gesammelt.");
            System.out.println("Sparen lohnt sich also!");

        default:
        
        if (eingabe_auswahl >= 4) {
            System.out.print("Das habe ich nicht Verstanden!!"); 
        };
           
        
        break;
    }


  }
}// end class

