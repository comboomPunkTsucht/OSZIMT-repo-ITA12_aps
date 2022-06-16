/**
 * @author Aps, Fabian ; Babig
 * It's a class that takes two strings and returns a string
 */
import java.util.*;

public class String1 {

  public static Scanner scan = new Scanner(System.in);

  /**
   * @param args
   */
  public static void main(String[] args) {
    out(A1());
    out(A2());
    out(A3(A1(), A2()));
    out(A4(A2(), A2()));
  }

  /**
   * @param args
   */
  public static void out(String args) {
    System.out.println(args);
  }

  /**
   * @return String
   */
  public static String A1() {
    String biest = new String("hello world");
    return biest;
  }

  /**
   * @return String
   */
  public static String A2() {
    String biest = new String(scan.nextLine());
    return biest;
  }

  /**
   * @param a1
   * @param a2
   * @return String
   */
  public static String A3(String a1, String a2) {
    String biest = new String(a1 + " | " + a2);
    return biest;
  }

  /**
   * @param c1
   * @param c2
   * @return String
   */
  public static String A4(String c1, String c2) {
    String biest = new String(" ihre faben sind " + c1 + " und " + c2);
    return biest;
  }
}
