/*
Aps, Fabian
ITA12
25.11.2021
*/

public class mark {
    public static void main(String [] args) {
       
       do {
          //Scanner for marks
        Scanner mark = new Scanner(System.in);

        System.out.println("-----------------------------------------------------");
        System.out.println("|     Please enter your grade (1 <-> 6).            |");
        System.out.println("-----------------------------------------------------");
        System.out.println("-----------------------------------------------------");
        System.out.println("|If you want to exit the program, please press 'Q'  |");
        System.out.println("-----------------------------------------------------");
        System.out.println(": =>");

        cahr eingabe = mark.next().charAt(0)

        
        
        if ( eingabe == 'Q' || eingabe == 'q' ) {
            boolean exit = true;
        } else {
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
                    System.out.println("6 = Ungenügend")
                    break;
                default:
                System.out.println("How was that again?")
                    break;
            }
            
        } 
       } while (exit == false);
       
        
    }
}
