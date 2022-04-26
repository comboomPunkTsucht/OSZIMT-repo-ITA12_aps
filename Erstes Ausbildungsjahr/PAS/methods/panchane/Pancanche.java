import java.util.*;

/**
 * Currency converter.
 *
 * @author Babig ,Kevin; Aps, Fabian.
 * @version 1.4 from 17.03.2022.
 */

public class Pancanche {

  // final varibels
  public static float usdeur = 0.8739F;// stand 13.1.22
  public static float eurusd = 1.1442F;// stand 13.1.22
  public static final String sternchen = "*************************";// max 25 zeichen

  /**
   * <p>
   * print the Welcome screen.
   * </p>
   */

  public static void welcomePrompt() {

    System.out.println(sternchen);
    System.out.println("*  select you option    *");
    System.out.println("*    [E]UR -> USD       *");
    System.out.println("*    [U]SD -> EUR       *");
    System.out.println(sternchen);
    System.out.print("=> ");
  }

  /**
   * convert to USD
   * 
   * @param a is the EUR amount that has to be converted to USD.
   * @return returs the USD amount that has to be converted to USD with minus the
   *         1% conversioncost.
   */
  public static double toUSD(double a) {
    double b = a * usdeur * 0.99;
    return b;
  }// convert to USD

  /**
   * convert to EUR
   * 
   * @param a is the USD amount that has to be converted to EUR.
   * @return returs the EUR amount that has to be converted to USD with minus the
   *         1% conversioncost.
   */
  public static double toEUR(double a) {
    double b = a * eurusd * 0.99;
    return b;
  }// convert to EUR

  /**
   * 
   * @param a is a input as a double value
   * @return is returned as a int
   */
  public static int changeTOct(double a) {
    int b = (int) (a * 100);
    return b;
  }// convert to ct

  /**
   * 
   * @param a is the value of converted ct
   * @param b is the value of that substracked from a
   * @param c is the value that is printing out
   * @param d is the string value of the curent curency
   * @return the value if a is lower than b
   */
  public static int givePromp(int a, int b, double c, String d) {
    while (a >= b) {
      a -= b;
      System.out.println("* " + c + " " + d + " *");
    }
    return a;
  }// print the Amount of the converted

  public static void main(String[] args) {
    // variabeln und Scanner aus
    Scanner select_scan = new Scanner(System.in);
    Scanner amount_scan = new Scanner(System.in);

    double amount = 0.00;
    int amount_ct = 0;
    char select = 'Q';
    char select_promp = 'n';
    String currency_char = "/";
    // select-screen
    do {
      welcomePrompt();
      select = select_scan.next().charAt(0);
      if (select == 'e' || select == 'E') { // to USD
        currency_char = "USD";
        System.out.println(sternchen);
        System.out.println("*    Enter your amount    *");
        System.out.println(sternchen);
        System.out.print("=>");
        amount = amount_scan.nextDouble();

        amount = toUSD(amount);
        amount_ct = changeTOct(amount);
      } else { // to ESD
        currency_char = "EUR";
        System.out.println(sternchen);
        System.out.println("*    Enter your amount    *");
        System.out.println(sternchen);
        System.out.print("=>");
        amount = amount_scan.nextDouble();

        amount = toEUR(amount);
        amount_ct = changeTOct(amount);
      }
      System.out.println(sternchen);
      System.out.println("*      Your Amount     *");
      System.out.println("* " + amount + " " + currency_char + " *");
      System.out.println("* Would you want to change it? y/N*");
      System.out.println(sternchen);
      select_promp = select_scan.next().charAt(0);
      if (select_promp == 'y' || select_promp == 'Y') { // give the money
        System.out.println(sternchen);
        amount_ct = givePromp(amount_ct, 5000, 50.00, currency_char);
        amount_ct = givePromp(amount_ct, 2000, 20.00, currency_char);
        amount_ct = givePromp(amount_ct, 1000, 10.00, currency_char);
        amount_ct = givePromp(amount_ct, 500, 5.00, currency_char);
        amount_ct = givePromp(amount_ct, 200, 2.00, currency_char);
        amount_ct = givePromp(amount_ct, 100, 1.00, currency_char);
        amount_ct = givePromp(amount_ct, 50, 0.50, currency_char);
        amount_ct = givePromp(amount_ct, 20, 0.20, currency_char);
        amount_ct = givePromp(amount_ct, 10, 0.10, currency_char);
        amount_ct = givePromp(amount_ct, 5, 0.05, currency_char);
        amount_ct = givePromp(amount_ct, 2, 0.02, currency_char);
        amount_ct = givePromp(amount_ct, 1, 0.01, currency_char);
        System.out.println("* Good Bye *");
        System.out.println(sternchen);
        select = select_scan.next().charAt(0);
      }
    } while (select != 'q' || select != 'Q');
  }// end
}
