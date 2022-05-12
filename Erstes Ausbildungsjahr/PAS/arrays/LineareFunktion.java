import java.util.Scanner;

public class LineareFunktion {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    double funktion[] = new double[21];
    double m;
    double n;

    System.out.println("Bitte geben Sie die Steigung ein: ");
    m = scanner.nextDouble();
    System.out.println("Bitte geben Sie den y-Achsenabschnit ein: ");
    n = scanner.nextDouble();

    for (int x = 0; x < funktion.length; x++) {
      funktion[x] = m * x + n;
    }
    int sindGroesserNull = 0;
    for (int i = 0; i < funktion.length; i++) {
      boolean groesserNull = funktion[i] > 0;
      if (groesserNull == true) {
        sindGroesserNull++;
      }
    }
    System.out.println(sindGroesserNull);
    for (int x = 0; x < funktion.length; x++) {
      System.out.println("Y-Koordinaten" + funktion[x]);
    }
    System.out.println("Bitte geben Sie die Steigung ein: ");
    m = scanner.nextDouble();
    System.out.println("Bitte geben Sie den y-Achsenabschnit ein: ");
    n = scanner.nextDouble();
    funktionsupdater(funktion, m, n);
    for (int x = 0; x < funktion.length; x++) {
      System.out.println("Y-Koordinaten" + funktion[x]);
    }
    double area = 0.0;
    if (n > 0) {
      area = (20 * n) / 2;
    } else {
      n = -1 * n;
      area = (20 * n) / 2;
    }
    System.out.println("Flaecheninhalt: " + area);
  }

  public static double[] funktionsupdater(
    double funktion[],
    double m,
    double n
  ) {
    {
      for (int x = 0; x < funktion.length; x++) {
        funktion[x] = m * x + n;
      }
      return funktion;
    }
  }
}
