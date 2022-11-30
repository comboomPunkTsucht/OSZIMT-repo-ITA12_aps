import java.util.Scanner;

public class Test {

  public static void main(String[] args) {
    //Übung Schleifen

    for (int i = 1; i <= 10; i++) {
      System.out.println(i);
    }

    for (int i = 10; i >= 1; i--) {
      System.out.println(i);
    }
    int i = 1;
    while (i <= 10) {
      System.out.println(i);
      i++;
    }
    i = 10;
    while (i >= 1) {
      System.out.println(i);
      i--;
    }

    Scanner scan = new Scanner(System.in);
    int one = 0;
    do {
      System.out.println("Bitte Geben Sie eine 1 ein : ");
      one = scan.nextInt();
    } while (one != 1);
    System.out.println("");
    if (one == 1) {
      System.out.println("Hurra, Sie haben eine 1 eingegeben");
    }
  }
}
