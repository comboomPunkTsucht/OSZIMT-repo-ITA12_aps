/*
@Aps, Fabian
ITA12
04.04.2021
*/
//inport
import java.util.*

public class Sparplan {
    
    //Variablen
    double eingabe = 0.00;
    double zinsen = 2.50;
    double zinsen1jahr = 0.00;
    double zinsen5jahre = 0.00;
    double zinsen10jahre = 0.00;
    double zinsen25jahre = 0.00;
    double vermoegen = 0.00;

    // scanner
    scanner_eingabe = new Scanner(System.in);

    // Abfrage
    System.out.println("-----------------------------------------------------------------------------");
    System.out..println("Geben Sie den monatlichen Betrag an, den sie auf das Sparbuch uebertragen!!!");
    System.out.println("-----------------------------------------------------------------------------");
    System.out.print("=> : ");

    eingabe = scanner_eingabe;


    //Verarbeitung
    zinsen1jahr = 12 * (eingabe * zinsen);
    zinsen5jahre = 5 * zinsen1jahr;
    zinsen10jahre = 2 * zinsen5jahre;
    zinsen25jahre = 5 * zinsen5jahre;

    vermoegen = zinsen25jahre - eingabe;

    // Ausgabe
    System.out.println("-----------------------------------");
    System.out.println("Nach einem Jahr haben Sie[WIP]");

}
