import java.util.*;

public class Geldwechler_PanChange {

    public static void main(String[] args) {
        Scanner auswahl_scan = new Scanner(System.in);
        Scanner betrag_scan = new Scanner(System.in);

        float usdeur = 0.8739F;// stand 13.1.22
        float eurusd = 1.1442F;// stand 13.1.22
        float betrag = 0.00F;
        int betrag_ct = 0;
        boolean done = false;
        do{
            do {
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

                        betrag = betrag * usdeur * 0.99;
                        betrag_ct = (int)(betrag * 100);
                        done =true;
                        break;

                    case 'e':
                        System.out.println("**************************************************");
                        System.out.println("*          Geben Sie ihren Betrag ein            *");
                        System.out.println("**************************************************");
                        System.out.print("=> ");

                        betrag = betrag_scan.nextFloat();

                        betrag = betrag * usdeur * 0.99;
                        betrag_ct = (int)(betrag * 100);
                        done = true;
                        break;

                    case 'U':
                        System.out.println("**************************************************");
                        System.out.println("*          Geben Sie ihren Betrag ein            *");
                        System.out.println("**************************************************");
                        System.out.print("=> ");

                        betrag = betrag_scan.nextFloat();

                        betrag = betrag * usdeur * 0.99;
                        betrag_ct = (int)(betrag * 100);
                        done = true;
                        break;

                    case 'u':
                        System.out.println("**************************************************");
                        System.out.println("*          Geben Sie ihren Betrag ein            *");
                        System.out.println("**************************************************");
                        System.out.print("=> ");

                        betrag = betrag_scan.nextFloat();

                        betrag = betrag * usdeur * 0.99;
                        betrag_ct = (int)(betrag * 100);
                        done = true;
                        break;

                    default:
                        System.out.println("*************");
                        System.out.println("*Wie Bitte?!*");
                        System.out.println("*************");
                        break;
                }
            }wgile (done == false)

        System.out.println("*********************************");
        System.out.println("* " + betrag + " *");
        System.out.println("* möchten sie den Umtausch j//N *");
        System.out.println("*********************************");
        char auswahl_j = auswahl_scan.next().charAt(0);
        
        if (auswahl_j == 'j' || auswahl_j == 'J') {
            for (int funfziger; betrag_ct >= 5000; funfziger += 1){
                betrag -= 5000;
            }
            for (int zwnziger; betrag_ct >= 2000; zwanziger += 1){
                betrag -= 2000;
            }
            for (int zener; betrag_ct >= 1000; zener += 1){
                betrag -= 1000;
            }
            for (int funfer; betrag_ct >= 500; funfer += 1){
                betrag -= 500;
            }
            for (int zweier; betrag_ct >= 200; zweier += 1){
                betrag -= 200;
            }
            for (int einer; betrag_ct >= 100; einer += 1){
                betrag -= 100;
            }
            for (int funfziger_ct; betrag_ct >= 50; funfziger_ct += 1){
                betrag -= 50;
            }
            for (int zwanziger_ct; betrag_ct >= 20; zwanziger_ct += 1){
                betrag -= 20;
            }
            for (int zener_ct; betrag_ct >= 10; zener_ct += 1){
                betrag -= 10;
            }
            for (int funfer_ct; betrag_ct >= 5; funfer_ct += 1){
                betrag -= 5;
            }
            for (int zweier_ct; betrag_ct >= 2; zweier_ct += 1){
                betrag -= 2;
            }
            for (int einer_ct; betrag_ct >= 1; einer_ct += 1){
                betrag -= 1;
            }
            System.out.println("****************************************************");
            System.out.println("* " + funfziger + " x Funfzigerschein " + zwanziger + " x Zwanzigerschein " + zener + " x Zenerschein " + funfer + " x Funferschein " + zweier + " x Zweiermuenzen " + einer + " x Einermuenzen " + funfziger_ct + " x Funfzigercentmuenzen " + zwanziger_ct + " x Zwanzigercentmuenzen " + zener_ct + " x Zenercentmuenzen " + funfer_ct + " x Funfercentmuenzen " + zeier_ct + " x Zweierercentmuenzen " + einer_ct + " x Einercentmuenzen *");
            System.out.println("* Auf Wieder Sehen                                  *");
            System.out.println("*****************************************************");
        }
    }while(auswahl != q || auswahl != Q)
    }

}