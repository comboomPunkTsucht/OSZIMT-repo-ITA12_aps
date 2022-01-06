/*
Aps, Fabian
ITA12
6.1.22
*/

import java.util.Scanner;

public class DoWhileSchleifen {

    // Main-Methode
    public static void main(String[] args) {

        /*
         * Aufgabe 1 - Countdown
         * 
         * Schreiben Sie eine Methode, die von einer vom Benutzer eingegebenen Zahl
         * aus r�ckw�rts bis 0 z�hlt.
         * 
         * Bitte geben Sie eine Zahl ein: 6
         * 6...
         * 5...
         * 4...
         * 3...
         * 2...
         * 1...
         * 0...
         * Yey!
         * 
         */

        Scanner startwert = new Scanner(System.in);
        System.out.println("*********************************");
        System.out.println("* Geben Sie ihren Startwert ein *");
        System.out.println("*********************************");
        System.out.print("=> ");
        int startwert_wert = startwert.nextInt();
        do {
            System.out.println(startwert_wert);
            startwert_wert--;
        } while (startwert_wert >= 0);

        /*
         * Aufgabe 2 - Countdown
         * 
         * Schreiben Sie eine Methode, die von einer vom Benutzer eingegebenen Zahl
         * aus in Zweier-Schritten r�ckw�rts bis 0 z�hlt (oder bis 1, wenn der
         * Startwert ungerade war)
         * 
         * Bitte geben Sie eine Zahl ein: 5
         * 5...
         * 3...
         * 1...
         * Yey!
         * 
         */
        Scanner startwert_1 = new Scanner(System.in);
        System.out.println("*********************************");
        System.out.println("* Geben Sie ihren Startwert ein *");
        System.out.println("*********************************");
        System.out.print("=> ");
        int startwert_wert_1 = startwert_1.nextInt();
        do {
            System.out.println(startwert_wert_1);
            startwert_wert_1 = startwert_wert_1 - 2;
        } while (startwert_wert_1 >= 0);

        /*
         * Aufgabe 3 - Kilometer pro Liter
         * 
         * Schreiben Sie eine Methode, die die gefahrenen Kilometer pro Liter f�r
         * eine Reihe von Autos berechnet. Die Daten f�r jedes Auto bestehen aus dem
         * Anfangs- und Endstand in Kilometern und der Anzahl der Liter. Die Methode
         * wird beendet, sobald der Anwender eine negative Zahl (< 0) als Anfangsstand
         * eingibt.
         * 
         * Anfangsstand Kilometer: 15000
         * Endstand Kilomenter: 15250
         * Liter: 20
         * Kilometer pro Liter: 12.5
         * 
         * Anfangsstand Kilometer: 298000
         * Endstand Kilomenter: 298150
         * Liter: 10
         * Kilometer pro Liter: 15
         * 
         * Anfangsstand Kilometer: -1
         * Auf wiedersehen!.
         * 
         */
        double km = 1;
        do {
            Scanner km_eingabe = new Scanner(System.in);
            System.out.println("**************************************");
            System.out.println("* Geben Sie ihren Kilometerstand ein *");
            System.out.println("**************************************");
            System.out.print("=> ");
            km = km_eingabe.nextDouble();

            Scanner endkm_eingabe = new Scanner(System.in);
            System.out.println("*****************************************");
            System.out.println("* Geben Sie ihren Endkilometerstand ein *");
            System.out.println("*****************************************");
            System.out.print("=> ");
            double endkm = endkm_eingabe.nextDouble();

            Scanner l_eingabe = new Scanner(System.in);
            System.out.println("*********************************");
            System.out.println("* Geben Sie ihren Literstnd ein *");
            System.out.println("*********************************");
            System.out.print("=> ");
            double l = l_eingabe.nextDouble();

            double kmpl = (endkm - km) / l;

            System.out.println(kmpl + " km/l");

        } while (km > 0);
        /*
         * Aufgabe 4 - Bereiche addieren
         * 
         * Schreiben Sie eine Methode, die den Anwender nach einer Unter- und
         * Obergrenze f�r einen Bereich von Ganzzahlen fragt. Die Methode fragt dann
         * den Anwender nach Ganzzahlen, die addiert werden sollen. Die Methode
         * berechnet zwei Summen:
         * 
         * Die Summe der Integer, die im Bereich sind (inklusive) ...
         * ...und die Summe der Integer, die au�erhalb des Bereichs sind.
         * 
         * Wenn der Benutzer 0 eingibt, ist das Programm zu Ende.
         * 
         * Untergrenze des Bereichs: 20
         * Obergrenze des Bereichs: 50
         * Daten eingeben: 21
         * Daten eingeben: 60
         * Daten eingeben: 49
         * Daten eingeben: 30
         * Daten eingeben: 91
         * Daten eingeben: 0
         * Summe der Werte innerhalb des Bereichs: 100
         * Summe der Werte ausserhalb des Bereichs: 151
         */

        /*
         * Zusatzaufgabe 1 - Versandkosten-Kalkulator
         * 
         * Ein Paketdienst berechnet 3,00 Euro Versandkosten bis zu einem Gewicht
         * von 5 Kilogramm (inklusive). Dar�ber sind f�r jedes Kilo zus�tzlich 25
         * Cent zu bezahlen. Schreiben Sie eine Methode, die den Anwender nach dem
         * Gewicht der Sendung fragt und dann die Versandkosten ausgibt. Die Methode
         * endet, wenn ein Gewicht von 0 oder weniger eingegeben wird.
         * 
         * Gewicht der Sendung: 5
         * Versandkosten: EUR 3.0
         * 
         * Gewicht der Sendung: 20
         * Versandkosten: EUR 5.5
         * 
         * Gewicht der Sendung:
         * 0
         * 
         * Auf wiedersehen!
         */

        /*
         * Zusatzaufgabe 2 - Fl�che von Rechtecken
         * 
         * Ein CAD Programm erwartet, das der Anwender die Koordinaten von zwei
         * Eckpunkten f�r jedes von mehreren Rechtecken eingibt (siehe Diagramm).
         * Dabei wird vorausgesetzt, dass die Seiten der Rechtecke parallel zur X und Y
         * Achse verlaufen. Die Koordinaten eines jeden Eckpunkts werden als Paar von
         * Ganzzahlen eingegeben, zuerst die X-Koordinate und dann die Y-Koordinate.
         * Der Urprung des Koordinatensystems (0,0) ist die linke obere Ecke, so dass Y
         * abw�rts zunimmt und X nach rechts zunimmt.
         * 
         * Die Methode berechnet f�r jedes Rechteck die H�he, die Breite und
         * die Fl�che. Die zwei eingegebenen Eckpunkte m�ssen sich diagonal
         * gegen�ber liegen (links oben und rechts unten, oder rechts oben und links
         * unten), aber welche Wahl f�r jedes Rechteck getroffen wird, ist Sache des
         * Anwenders. Der Anwender kann die Eckpunkte in beliebiger Reihenfolge
         * eingeben. H�he und Breite sind immer positive (die Methode wird seine
         * Berechnungen anpassen m�ssen, damit das wahr ist.)
         * 
         * Die Methode wird beendet, wenn der Anwender Eckpunkte eingibt, die nicht
         * die eines Rechtecks sein k�nnen (entweder die H�he ist 0, die Breite ist
         * 0 oder beide.)
         * 
         * CAD Programm
         * Erster Eckpunkt X-Koordinate: 100
         * Erster Eckpunkt Y-Koordinate: 100
         * Zweiter Eckpunkt X-Koordinate: 250
         * Zweiter Eckpunkt Y-Koordinate: 200
         * Breite: 150 Hoehe: 100 Flaeche: 15000
         * 
         * Erster Eckpunkt X-Koordinate: 250
         * Erster Eckpunkt Y-Koordinate: 200
         * Zweiter Eckpunkt X-Koordinate: 100
         * Zweiter Eckpunkt Y-Koordinate: 100
         * Breite: 150 Hoehe: 100 Flaeche: 15000
         * 
         * Erster Eckpunkt X-Koordinate: 100
         * Erster Eckpunkt Y-Koordinate: 100
         * Zweiter Eckpunkt X-Koordinate: 100
         * Zweiter Eckpunkt Y-Koordinate: 100
         * Breite: 0 Hoehe: 0 Flaeche: 0
         * 
         * Fertig!
         * 
         */
    }

}