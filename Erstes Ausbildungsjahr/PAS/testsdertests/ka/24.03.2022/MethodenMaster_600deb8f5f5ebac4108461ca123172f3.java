import java.util.Scanner;

/**
 * @author <a href="mailto:mcpeaps_HD@outlook.com" /a>Aps,Fabian
 * @version 1.00 from 24/03/2022
 */
public class MethodenMaster {

    public static void pruefeAlter(int alter) {
        if (alter >= 18) {
            System.out.println("*****************************************");
            System.out.println("* Zugriff gewährt - Sie sind alt genug! *");
            System.out.println("*****************************************");
        } else {
            System.out.println("************************************************");
            System.out.println("* Zugriff verboten - Sie sind nicht alt genug! *");
            System.out.println("************************************************");
        }
    }

    public static double berechneSechseck(int leange) {
        double flaeche = (3 / 2) * (leange * leange) * Math.sqrt(3);
        return flaeche;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("***************");
        System.out.println("* Alter bitte *");
        System.out.println("***************");
        System.out.print("=> ");
        pruefeAlter(scanner.nextInt());

        System.out.println("****************");
        System.out.println("* leange bitte *");
        System.out.println("****************");
        System.out.print("=> ");
        System.out.println(berechneSechseck(scanner.nextInt()));
    }
}
