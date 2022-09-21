import java.util.*;

public class KontoTest {

  public static Scanner scan = new Scanner(System.in);
  public static Random rand = new Random();

  public static void main(String[] args) {
    Konto konto[] = new Konto[10];

    for (int i = 0; i < konto.length; i++) {
      konto[i] = new Konto();
    }

    konto[0].iban = 100200300;
    konto[1].iban = 200300400;
    konto[3].iban = 300400500;

    konto[0].inhaber = "Donald Duck";
    konto[1].inhaber = "Daniel Duesentrieb";
    konto[3].inhaber = "Mickey Mouse";

    konto[0].kontostand = 123.45;
    konto[1].kontostand = 23456.78;
    konto[3].kontostand = 4567.89;

    konto[0].dispo = 100;
    konto[1].dispo = 500;
    konto[3].dispo = 200;

    System.out.println("A4");

    System.out.println(
      "Das Konto " + konto[0].iban + " gehört " + konto[0].inhaber
    );
    System.out.println(
      "Das Konto " + konto[1].iban + " gehört " + konto[1].inhaber
    );
    System.out.println(
      "Das Konto " + konto[3].iban + " gehört " + konto[3].inhaber
    );

    System.out.println("A5");

    System.out.print(
      "Hallo " + konto[0].inhaber + ", wie viel willst Du abheben? "
    );

    int abheben = scan.nextInt();

    if (abheben <= (konto[0].kontostand + konto[0].dispo)) {
      System.out.println("\nOk, das kannst Du Dir leisten.");
    } else {
      System.out.println(
        "\nSorry, mehr als " +
        (konto[0].dispo + konto[0].kontostand) +
        " kannst Du nicht abheben!"
      );
    }
    System.out.println("A6");

    konto[4].iban = 500600700;
    konto[4].inhaber = "Onkel Dagobert";
    konto[4].kontostand = 179769313486231570000.00;
    // konto[4].dispo = 3000000000;
    /*
     * KontoTest.java:56: error: integer number too large
     * konto[4].dispo = 3000000000;
     *       ^
     * 1 erriban
     */

    System.out.println("Z5");
    for (int i = 0; i < konto.length; i++) {
      System.out.println(
        konto[i].inhaber + " " + konto[i].iban + " " + konto[i].telnum
      );
    }

    int hasBerlin = 0;

    for (int i = 0; i < konto.length; i++) {
      if (konto[i].adresse.equalsIgnoreCase("Berlin"));
      {
        hasBerlin++;
      }
    }
    System.out.println(hasBerlin + "People life in Berlin");
  }
}
