import java.util.*;

public class SchlauerAktientrick {

  public static Scanner scan = new Scanner(System.in);

  public static void main(String[] args) {
    double[] aktiendepots = new double[12];

    System.out.println(
      "**********************************************************"
    );
    System.out.println(
      "* Geben Sie ihren Wert des Aktiendepots vom 1.1.yyyy ein *"
    );
    System.out.println(
      "**********************************************************"
    );
    System.out.print("=> ");
    aktiendepots[0] = scan.nextDouble();

    for (int i = 1; i < aktiendepots.length; i++) {
      aktiendepots[i] = aktiendepots[i - 1] * 2;
    }
    System.out.println(
      "******************************************************************************************"
    );
    for (int i = 1; i < aktiendepots.length; i++) {
      if (i < 10) {
        System.out.println(
          "* Zu begin hatte ich nur " +
          aktiendepots[0] +
          " Euro, am 01.0" +
          i +
          " hatte ich " +
          aktiendepots[i] +
          " Euro. *"
        );
      } else {
        System.out.println(
          "* Zu begin hatte ich nur " +
          aktiendepots[0] +
          " Euro, am 01." +
          i +
          " hatte ich " +
          aktiendepots[i] +
          " Euro. *"
        );
      }
    }

    System.out.println(
      "* Wenn Dagoberts Trick funktioniert, habe ich am Ende " +
      aktiendepots[11] +
      " Euro. *"
    );
    System.out.println(
      "******************************************************************************************"
    );
  }
}
