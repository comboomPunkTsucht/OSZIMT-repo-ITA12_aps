import java.util.*;

public class Volumenberechnung {

  public static double wurfel(double a) {
    double V = a * a * a;
    return V;
  }

  public static double quader(double a, double b, double c) {
    double V = a * b * c;
    return V;
  }

  public static double pyramide(double a, double h) {
    double V = Math.sqrt(a) * h / 3;
    return V;
  }

  public static double kugel(double r) {
    double V = (4 / 3) * (r * r * r) * Math.PI;
    return V;
  }

  public static void main(String[] args) {
    final int four = 4;

    System.out.println(
      wurfel(four) +
      "\n" +
      quader(four, four, four) +
      "\n" +
      pyramide(four, four) +
      "\n" +
      kugel(4)
    );
  }
}
