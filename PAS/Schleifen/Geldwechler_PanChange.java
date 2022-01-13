
public class Geldwechler_PanChange {

    import java.util.*;
public static void main(String[] args) {
    Scanner auswahl_scan = new Scanner(System.in);
    Scanner betrag_scan = new Scanner(System.in);



    float usd0eur = 0.8739F;//stand 13.1.22
    float eurusd = 1.1442F;//stand 13.1.22

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

        float betrag = betrag_scan.nextFloat();

        betrag = Math.round(2);
        betrag = betrag * eurusd;
        betrag = (99*100) / betrag;
        float betrag_ct = betrag * 100;

            break;
        
            case 'e':
            System.out.println("**************************************************");
            System.out.println("*          Geben Sie ihren Betrag ein            *");
            System.out.println("**************************************************");
            System.out.print("=> ");
    
            float betrag = betrag_scan.nextFloat();
    
            betrag = Math.round(2);
            betrag = betrag * eurusd;
            betrag = (99*100) / betrag;
            float betrag_ct = betrag * 100;
    
                break;
            
                case 'U':
                System.out.println("**************************************************");
                System.out.println("*          Geben Sie ihren Betrag ein            *");
                System.out.println("**************************************************");
                System.out.print("=> ");
        
                float betrag = betrag_scan.nextFloat();
        
                betrag = Math.round(2);
                betrag = betrag * usdeur;
                betrag = (99*100) / betrag;
                float betrag_ct = betrag * 100;
        
                    break;
                
                    case 'u':
                    System.out.println("**************************************************");
                    System.out.println("*          Geben Sie ihren Betrag ein            *");
                    System.out.println("**************************************************");
                    System.out.print("=> ");
            
                    float betrag = betrag_scan.nextFloat();
            
                    betrag = Math.round(2);
                    betrag = betrag * usdeur;
                    betrag = (99*100) / betrag;
                    float betrag_ct = betrag * 100;
            
                        break;
                
            
        
    
        default:
            break;
    }


    System.out.println(betrag);

    }
}
