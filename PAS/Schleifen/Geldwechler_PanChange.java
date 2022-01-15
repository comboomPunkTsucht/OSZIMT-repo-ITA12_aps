import java.util.*;

public class Geldwechler_PanChange {

    public static void main(String[] args) {
        Scanner auswahl_scan = new Scanner(System.in);
        Scanner betrag_scan = new Scanner(System.in);

        float usdeur = 0.8739F;// stand 13.1.22
        float eurusd = 1.1442F;// stand 13.1.22
        float betrag = 0.00F;
        float betrag_ct = 0.00F;
        float betrag_e = 0.00F;
        float betrag_e_e = 0.00F;

        System.out.println("**************************************************");
        System.out.println("*              Whähle Die Richtung               *");
        System.out.println("*                  [U]SD --> EUR                 *");
        System.out.println("*                  [E]UR --> USD                 *");
        System.out.println("**************************************************");
        System.out.print("=> ");

        char auswahl = auswahl_scan.next().charAt(0);

        switch (auswahl) {
            case 'E':
                System.out.println("**************************************************");
                System.out.println("*          Geben Sie ihren Betrag ein            *");
                System.out.println("**************************************************");
                System.out.print("=> ");

                betrag = betrag_scan.nextFloat();

                betrag = betrag * usdeur;
                betrag_ct = betrag * 100;
                betrag_e = (99F * betrag_ct) / 100F;
                betrag_e_e = betrag_e / 100F;

                break;

            case 'e':
                System.out.println("**************************************************");
                System.out.println("*          Geben Sie ihren Betrag ein            *");
                System.out.println("**************************************************");
                System.out.print("=> ");

                betrag = betrag_scan.nextFloat();

                betrag = betrag * usdeur;
                betrag_ct = betrag * 100;
                betrag_e = (99F * betrag_ct) / 100F;
                betrag_e_e = betrag_e / 100F;

                break;

            case 'U':
                System.out.println("**************************************************");
                System.out.println("*          Geben Sie ihren Betrag ein            *");
                System.out.println("**************************************************");
                System.out.print("=> ");

                betrag = betrag_scan.nextFloat();

                betrag = betrag * usdeur;
                betrag_ct = betrag * 100;
                betrag_e = (99F * betrag_ct) / 100F;
                betrag_e_e = betrag_e / 100F;

                break;

            case 'u':
                System.out.println("**************************************************");
                System.out.println("*          Geben Sie ihren Betrag ein            *");
                System.out.println("**************************************************");
                System.out.print("=> ");

                betrag = betrag_scan.nextFloat();

                betrag = betrag * usdeur;
                betrag_ct = betrag * 100;
                betrag_e = (99F * betrag_ct) / 100F;
                betrag_e_e = betrag_e / 100F;

                break;

            default:
                break;
        }

        System.out.println(betrag_e_e);

    }
}