import java.util.*;

public class Zufallzahlen {

  public static int min = 1;
  public static int max = 49;
  public static Random rand = new Random();

  public static void main(String[] args) {
    gebeArrayAus(lottozahlenGenerator());
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
} //end of class
