import java.util.*;

public class Zufallzahlen {

  public static int min = 1;
  public static int max = 49;
  public static Random rand = new Random();

  public static void main(String[] args) {
    gebeArrayAus(lottozahlenGenerator());
    testeWuerfel();
  } //end main

  public static void gebeArrayAus(int[] input) {
    for (int i = 0; i < input.length; i++) {
      System.out.println(input[i]);
    }
  } // end gebeArrayAus

  public static int[] lottozahlenGenerator() {
    int[] zufallarray = new int[6];
    for (int i = 0; i < zufallarray.length; i++) {
      zufallarray[i] = rand.nextInt(max);
    }
    return zufallarray;
  } //end lottozahlenGenerator

  public static void testeWuerfel() {
    final int[] wuerfel = { 1, 2, 3, 4, 5, 6 };
    int one = 0;
    int two = 0;
    int three = 0;
    int four = 0;
    int five = 0;
    int six = 0;
    for (int i = 0; i <= 100; i++) {
      int wuerfelseite = rand.nextInt(5);

      switch (wuerfelseite) {
        case 0:
          one++;
          break;
        case 1:
          two++;
          break;
        case 2:
          three++;
          break;
        case 3:
          four++;
          break;
        case 4:
          five++;
          break;
        case 5:
          six++;
          break;
      }
    }
    System.out.println(
      "Es wurden: " +
      System.lineSeparator() +
      +one +
      " 1er," +
      System.lineSeparator() +
      +two +
      " 2er," +
      System.lineSeparator() +
      +three +
      " 3er," +
      System.lineSeparator() +
      +four +
      " 4er," +
      System.lineSeparator() +
      +five +
      " 5er," +
      System.lineSeparator() +
      +six +
      " 6er" +
      System.lineSeparator() +
      "gewuerfelt."
    );
  } //end testeWuerfel
} //end of class
