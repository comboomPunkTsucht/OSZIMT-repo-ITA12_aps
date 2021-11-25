/*
Aps, Fabian
ITA12
25.11.2021
*/
import java.util.*;
public class Mark {
    public static void main(String [] args) {
       char eingabe;
       do {
          //Scanner for marks
        Scanner mark_scan = new Scanner(System.in);

        System.out.println("-----------------------------------------------------");
        System.out.println("|     Please enter your grade (1 <-> 6).            |");
        System.out.println("-----------------------------------------------------");
        System.out.println("-----------------------------------------------------");
        System.out.println("|If you want to exit the program, please press 'Q'  |");
        System.out.println("-----------------------------------------------------");
        System.out.print(": =>");

        eingabe = mark_scan.next().charAt(0);

        
        
        
            switch (eingabe) {
                case '1':
                    System.out.println("1 = Sehr Gut");
                    break;
                case '2':
                    System.out.println("2 = Gut");
                    break;
                case '3':
                    System.out.println("3 = Befriedigend");
                    break;
                case '4':
                    System.out.println("4 = Mangelhaft");
                    break;
                case '5':
                    System.out.println("5 = Mangelhaft");
                    break;
                case '6':
                    System.out.println("6 = Ungenügend");
                    break;
                case 'q':
                break;
                case 'Q':
                break;
                default:
                System.out.println("How was that again?");
                    break;
            }
            
         
       } while ((eingabe != 'Q') || (eingabe != 'q'));
       
        
    }
}
