/**
 *
 * Beschreibung
 *
 * @version 1.0 vom 08.01.2018
 * @author Aps, Fabian
 */

public class LogischeOperatoren {

  public static void main(String[] args) {
    /* 1. Deklarieren Sie zwei Warheitswerte a und b. */
    boolean a = true;
    boolean b = false;

    /* 2. Initialisieren Sie einen Wert mit true, den anderen mit false */

    /* 3. Geben Sie beide Werte aus */
    System.out.println(a + " " + b);
    /* 4. Deklarieren Sie einen Wahrheitswert undGatter */
    boolean andgate = a && b;
    /*
     * 5. Weisen Sie der Variable undGatter den Wert "a AND b" zu und geben Sie das
     * Ergebnis aus.
     */

    /*
     * 6. Deklarieren Sie au�erdem den Wahrheitswert c und initialisieren ihn direkt
     * mit dem Wert true
     */
    boolean c = true;
    /*
     * 7. Verkn�pfen Sie alle drei Wahrheitswerte a, b und c und geben Sie jeweils
     * das Ergebnis aus
     */
    // a) a AND b AND c
    boolean bo = a && b && c;
    // b) a OR b OR c
    boolean bo2 = a || b || c;
    // c) a AND b OR c
    boolean bo3 = a && b || c;
    // d) a OR b AND c
    boolean bo4 = a || b && c;
    // e) a XOR b AND c
    boolean bo5 = a ^ b && c;
    // f) (a XOR b) OR c
    boolean bo6 = (a ^ b) || c;

    System.out.println(bo + " " + bo2 + " " + bo3 + " " + bo4 + " " + bo5 + " " + bo6);

  } // end of main

} // end of class LogischeOperatoren
