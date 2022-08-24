public class Tage {

  public static void main(String[] args) {
    int[] tage = new int[365];

    for (int i = 0; i < tage.length; i++) {
      tage[i] = i + 1;
    }
    System.out.println("************");

    for (int i = 0; i < tage.length; i++) {
      System.out.println("* Tag " + (i++) + " *");
    }
    System.out.println("************");
    int[] stunden = new int[365];
    for (int i = 0; i < tage.length; i++) {
      stunden[i] = tage[i] * 24;
    }
    System.out.println("**********************************");

    for (int i = 0; i < tage.length; i++) {
      System.out.println(
        "* " + tage[i] + " Tage  haben " + stunden[i] + " Stunden *"
      );
    }
    System.out.println("************************************");
  }
}
