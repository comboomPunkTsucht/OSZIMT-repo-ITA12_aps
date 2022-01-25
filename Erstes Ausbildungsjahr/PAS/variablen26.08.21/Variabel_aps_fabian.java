/** Variablen.java
    Ergaenzen Sie nach jedem Kommentar jeweils den Quellcode.
    @author Aps Fabian
    @class ITA12
    @version 1.0
*/




public class Variabel_aps_fabian {
  public static void main(String [] args){
  
    

    
  // BEISPIEL: //
    
  /* -2. Eine Variable soll speichern, ob ein Schueler flei�ig wahr
          oder nicht. Vereinbaren Sie eine geeignete Variable */
  boolean schuelerWarFleissig;
    
  /* -1. Weisen Sie der Variable den Wert "wahr" (true) zu */
    schuelerWarFleissig = true; 
  
  /* 0. Geben Sie die Variable auf dem Bildschirm aus. */
  System.out.println(schuelerWarFleissig);
    
  // AB HIER SIND SIE DRAN: //  
  
    /* 1. Ein Zaehler soll die Anzahl der Tage bis zum Endes des Schuljahres
      zaehlen. Vereinbaren Sie eine geeignete Variable */
    
    byte shoolYearEnd = 25;
    

    /* 2. Weisen Sie dem Zaehler den Werte 25 zu
          und geben Sie ihn auf dem Bildschirm aus.*/
    
   do {
   System.out.println("Schuljahr ended in " + shoolYearEnd + " Tagen");
   shoolYearEnd -= 1 ;
   } while (shoolYearEnd >= 1);
    
    /* 3. Durch die Eingabe eines Buchstabens soll ein Menuepunkt
          eines Programms ausgewaehlt werden.
          Vereinbaren Sie eine geeignete Variable */
     
    char eingabe;
    
    eingabe = 'c';

    /* 4. Weisen Sie dem Buchstaben aus Aufgabe 4 
      den Werte 'C' zu und geben Sie ihn auf dem Bildschirm aus.*/
    
    char soll_eingabe = 'c';
    
    if (eingabe == soll_eingabe) {
      
      System.out.println(eingabe);
      
      
    } // end of if
    

    /* 5. Fuer eine genaue astronomische Berechnung sind grosse Zahlenwert
          notwendig.
          Vereinbaren Sie eine geeignete Variable */
    
    
          double lichtgeschwindigkeit_in_kmph = 1.079e+9d;
    

    /* 6. Weisen Sie der Zahl den Wert der Lichtgeschwindigkeit [1] zu
          und geben Sie dieie auf dem Bildschirm aus.
      
      Lichtgeschwindigkeit: http://de.lmgtfy.com/?q=lichtgeschwindigkeit
  */
    
  
    
    System.out.println("Die Lichtgeschwindigkeit liegt bei " + lichtgeschwindigkeit_in_kmph + " km/h");

    /* 7. Sieben Personen gruenden einen Verein. Fuer eine Vereinsverwaltung
          soll die Anzahl der Mitglieder erfasst werden.
          Vereinbaren Sie eine geeignete Variable und initialisieren sie
          diese sinnvoll.*/
    int gemeinde_mitglieder_anzahl = 7;
    
  
    
    
    
    /* 8. Geben Sie die Anzahl der Mitglieder auf dem Bildschirm aus.*/
    System.out.println("Die geimeinde hat " + gemeinde_mitglieder_anzahl + " Mitglieder");
    /* 9. Fuer eine Berechnung im ET-Rechentrainer wird die elektrische 
      Elementarladung benoetigt 
      eel
      Elektrische Elementarladung: http://de.lmgtfy.com/?q=elektrische+elementarladung
      
          Vereinbaren Sie eine geeignetes Attribut und geben Sie es auf
          dem Bildschirm aus.*/
  final double ELEMENTARLADUNG = 1.602e-19d;

  System.out.println(ELEMENTARLADUNG);
    /*10. Ein Buchhaltungsprogramm soll festhalten, ob eine Zahlung erfolgt ist.
e-          Vereinbaren Sie eine geeignete Variable. */
 boolean zahlung_erfolgreich = true;
    /*11. Die Zahlung ist erfolgt.
          Weisen Sie der Variablen den entsprechenden Wert zu
          und geben Sie die Variable auf dem Bildschirm aus.*/
  System.out.println(zahlung_erfolgreich);
  }//main
}// Variablen
