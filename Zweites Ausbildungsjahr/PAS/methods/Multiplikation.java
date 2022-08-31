import java.util.*;

public class Multiplikation {

  public static Scanner scan = new Scanner(System.in);

  public static double multiplication(double a, double b) {
    double z = a * b;
    return z;
  }

  public static void main(String[] args) {
    System.out.print("Wert1: ");
    double a = scan.nextDouble();
    System.out.println("");
    System.out.print("Wert2: ");
    double b = scan.nextDouble();
    System.out.println("");
    System.out.println(multiplication(a, b));
  }
}
