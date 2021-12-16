import java.util.*;

public class Zealer {

    public static void main(String[] args) {
        Scanner anfangswert_scan = new Scanner(System.in);
        Scanner endswert_scan = new Scanner(System.in);

        System.out.println("********************************************");
        System.out.println("* Geben Sie als erstes ihren Startwert ein *");
        System.out.println("********************************************");
        System.out.print("=> ");
        double startwert = anfangswert_scan.nextDouble();

        System.out.println("********************************************");
        System.out.println("* Geben Sie als erstes ihren Endwert ein   *");
        System.out.println("********************************************");
        System.out.print("=> ");
        double endwert = endswert_scan.nextDouble();

        for (double x = startwert; x <= endwert; x++) {
            System.out.println(x);
        }
    }
}