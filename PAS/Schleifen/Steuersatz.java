/*
Aps, Fabian
ITA12
25.11.2021
*/
import java.util.*;

public class Steuersatz {
    public static void main(String [] args) {
        char auswahl;
        do {
        //Scanner for Steuersatz
        Scanner auswahl_scan = new Scanner(System.in);
        Scanner nettobetrag_scan = new Scanner(System.in);

        System.out.println("-----------------------------------------------------");
        System.out.println("|     What tax rate do you need for the result?     |");
        System.out.println("|     [0] den Ermeasigten (7%)                      |");
        System.out.println("|     [1] den Vollen (19%)                          |");
        System.out.println("-----------------------------------------------------");
        System.out.println("-----------------------------------------------------");
        System.out.println("|If you want to exit the program, please press 'Q'  |");
        System.out.println("-----------------------------------------------------");
        System.out.print(": =>");

         auswahl = auswahl_scan.next().charAt(0);
        
        switch (auswahl) {
        case '0':
            double nettobetrage = nettobetrag_scan.nextDouble();
            double Steuersatze = (nettobetrage * 107) / 100;
            System.out.println("Dein Bruto berag ist " + Steuersatze + " €");
            break;
        case '1':
            double nettobetragv = nettobetrag_scan.nextDouble();
            double Steuersatzv = (nettobetragv * 119) / 100;
            System.out.println("Dein Bruto berag ist " + Steuersatzv + " €");
            break;
        }
        } while ((auswahl != 'Q') || (auswahl != 'q'));
    }
}
