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



public class EVA_Aps_Fabian_ITA12_2 { //start class

  public static void main(String[] args) {
    
    //variableln

    Scanner scanner = new Scanner(System.in);
    Scanner scanner_eingabe = new Scanner(System.in);
    Scanner scanner_eingabe_o = new Scanner(System.in);
    Scanner scanner_eingabe_u = new Scanner(System.in);
    Random random1 = new Random();
    Random random2 = new Random();
    byte eingabe_auswahl = 0;
    byte wiederholung = 0;
    int sum = 0;
    double eingabe = 0.00;
    double ergebniss = 0.00;
    double ogrenze = 0.00;
    double ugrenze = 0.00; 

    //Verarbeitung + Eingabe
  
  System.out.println("Wählen sie ihr Pogramm:");
  System.out.println("[0] Meherwertssteuerrechner");
  System.out.println("[1] Bereich ueberpruefer");
  System.out.println("[2] Kopfrechnungsaufgabengenerator");
  System.out.print(">> ");
  
  eingabe_auswahl = scanner.nextByte();

    switch (eingabe_auswahl) {
        case 0:
        
        System.out.print("Geben sie bitte ihren Betrag ein: >> ");
        eingabe = scanner_eingabe.nextDouble();

        if (eingabe > 0) {
            ergebniss = (eingabe * 19) / 100;

            System.out.print("Ihre Mehrwertssteuer Betragen: " + ergebniss + " €");  
        } else {
           System.out.print("Entschuldigung, dieser Betrag ist negativ!");  
        };
      
            break;
            
        case 1:

        System.out.print("Geben sie bitte ihren Wert ein: >> ");
        eingabe = scanner_eingabe.nextDouble();

        System.out.print("Geben sie bitte ihre untergrenze ein: >> ");
        ugrenze = scanner_eingabe_u.nextDouble();

        System.out.print("Geben sie bitte ihre Obergrenze ein: >> ");
        ogrenze = scanner_eingabe_o.nextDouble();

        if (ugrenze < eingabe && eingabe < ogrenze) {
            System.out.print(eingabe + " ist inerhalb des Bereiches");     
        } else {
         System.out.print(eingabe + " ist ausserhalb des Bereiches");   
        }
            
         break;

        case 2:

        System.out.print("Geben sie Die Anzahl an wiederholungen: >> ");
        wiederholung = scanner_eingabe.nextByte();

        do {
          
            int multiplikator1 = random1.nextInt(50);
            int multiplikator2 = random2.nextInt(50);
            

            System.out.println("Was ist " + multiplikator1 + " mal " + multiplikator2 + " =");
            System.out.print(">> ");
            eingabe = scanner_eingabe.nextDouble();


            sum = multiplikator1 * multiplikator2;

            if (eingabe == sum) {
                System.out.println("Korekt!");
                wiederholung -= 1;
            } else {
                System.out.print("Leider Falsch!");
                wiederholung -= 1;
            }

        } while (wiederholung >0);

          
        break;

        default:
        
        if (eingabe_auswahl >= 3) {
            System.out.print("Das habe ich nicht Verstanden!!"); 
        };
           
        
        break;
    }


  }
}// end class

