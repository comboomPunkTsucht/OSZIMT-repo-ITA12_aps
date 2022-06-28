import java.util.*;

public class UebungsParcour {

  public static Scanner scanner = new Scanner(System.in);

  public static void main(String[] args) {
    System.out.println(checkePasswort(scanner.nextLine()));
    System.out.println(backwards(scanner.nextLine()));
    System.out.println(lettercount(scanner.nextLine()));
    System.out.println(censored(scanner.nextLine()));
  }

  public static String checkePasswort(String password) {
    String out = null;

    if (password.length() > 7) {
      char password_char[] = password.toCharArray();
      for (int i = 0; i < password_char.length; i++) {
        if (password_char[i] > 47 && password_char[i] < 58) {
          out = password;
        }
      }
    }
    return out;
  }

  public static String backwards(String back) {
    char[] carray = back.toCharArray();
    String out = "";
    for (int i = (carray.length) - 1; -1 < i; i--) {
      out = out + carray[i];
    }

    return out;
  }

  public static int lettercount(String word) {
    char in = scanner.next().charAt(0);
    char[] carray = word.toCharArray();
    int temp = 0;

    for (int i = 0; i < carray.length; i++) {
      if (in == carray[i]) {
        temp++;
      }
    }

    return temp;
  }

  /*  4.) 1337 sp34k
   * 		Schreiben Sie eine Methode, die die übergebene Zeichenkette in 1337 (Leet Speak) übersetzt und
   *      zurückgibt (NICHT ausgibt!)
   *
   *      Original  |    1337
   *      ----------+----------
   *        o       |     0
   *        l       |     1
   *        e       |     3
   *        a       |     4
   *        t       |     7
   *        s       |     Z   (aber nur am Wortende!)
   *
   */

  /*  5.) Auto-Zensomat
   * 		Schreiben Sie eine Methode, die das böse F-Wort im Text automatisch durch **** ersetzt und den
   *      zensierten zurückgibt (NICHT ausgibt!).
   *
   */
  public static String censored(String adolf) {
    String out = "";
    String f = "fuck";
    if (adolf.equalsIgnoreCase(f)) {
      out = "****";
      return out;
    } else {
      out = adolf;
      return out;
    }
  }
}
