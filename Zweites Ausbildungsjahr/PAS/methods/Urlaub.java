import java.util.*;

public class Urlaub {

  //    USA: 1 Euro > 1,22 USD (Dollar)
  //   Japan: 1 Euro > 126,50 JPY (Yen)
  //   England: 1 Euro > 0,89 GBP (Pfund)
  //  Schweiz: 1 Euro > 1,08 CHF (Schweizer Franken)
  //   Schweden: 1 Euro > 10,10 SEK (Schwedische Kronen)

  public static final double Dollar = 1.22;
  public static final double Yen = 126.50;
  public static final double Pfund = 0.89;
  public static final double SchweizFranken = 1.08;
  public static final double SchwedischFranken = 10.10;

  public static Scanner scan = new Scanner(System.in);

  public static void main(String[] args) {
    System.out.print("EUR: ");
    double eur = scan.nextDouble();
    if (eur < 100) {
      System.out.println("unter 100€ du gay");
      System.exit(0);
    }
    System.out.println("");
    System.out.println("US");
    System.out.println("Japan");
    System.out.println("UK");
    System.out.println("Schweiz");
    System.out.println("Schweden");

    System.out.print("land: ");
    String key = scan.next();

    switch (key) {
      case "US":
        System.out.println(eurTOusd(eur));

        break;
      case "Japan":
        System.out.println(eurTOyen(eur));

        break;
      case "UK":
        System.out.println(eurTOfund(eur));

        break;
      case "Schweiz":
        System.out.println(eurTOfrank1(eur));

        break;
      case "Schweden":
        System.out.println(eurTOfranke2(eur));

        break;
      default:
        break;
    }
    // System.out.println(eurTOusd(eur));
    // System.out.println(eurTOyen(eur));
    // System.out.println(eurTOsfund(eur));
    // System.out.println(eurTOfrank1(eur));
    // System.out.println(eurTOfrank2(eur));

  }

  public static double eurTOusd(double eur) {
    double us = eur * Dollar;
    return us;
  }

  public static double eurTOyen(double eur) {
    double jpn = eur * Yen;
    return jpn;
  }

  public static double eurTOfund(double eur) {
    double uk = eur * Pfund;
    return uk;
  }

  public static double eurTOfrank1(double eur) {
    double swiss = eur * SchweizFranken;
    return swiss;
  }

  public static double eurTOfranke2(double eur) {
    double penis = eur * SchwedischFranken;
    return penis;
  }
}
