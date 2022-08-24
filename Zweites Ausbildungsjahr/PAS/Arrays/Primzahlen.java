public class Primzahlen {

  public static void main(String[] args) {
    int[] primzahlen = { 2, 3, 5, 7, 11 };

    int[] primzahlenDuplikat = primzahlen;
    int[] primzahlen2 = primzahlen;
    int[] primzahlenDuplikat2 = primzahlen2.clone();

    for (int i = 0; i < primzahlen.length; i++) {
      System.out.println(
        primzahlen[i] +
        " = " +
        primzahlenDuplikat[i] +
        " = " +
        primzahlenDuplikat2[i]
      );
    }

    primzahlen[1] += 2;

    for (int i = 0; i < primzahlen.length; i++) {
      System.out.println(
        primzahlen[i] +
        " = " +
        primzahlenDuplikat[i] +
        " ≠ " +
        primzahlenDuplikat2[i]
      );
    }
  }
}
