import java.util.*;

/**
 * @author Aps, Fabian ; Babig, Kevin
 * @version 1.0 from 16.06.2022
 */
public class Equals {

  public static Scanner scan = new Scanner(System.in);

  /**
   * @param args
   */
  public static void main(String[] args) {
    String a = "bitte";
    String b = "danke";
    String c = scan.next();

    if (c.equals(a)) {
      outln(a + " ist gleich " + c);
    } else if (c.equals(b)) {
      outln(b + " ist gleich " + c);
    } else {
      outln("u stoopid");
    }
  }

  /**
   * @param args
   */
  public static void out(String args) {
    System.out.print(args);
  }

  /**
   * @param args
   */
  public static void outln(String args) {
    System.out.println(args);
  }
}
