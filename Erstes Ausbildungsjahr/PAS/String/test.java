import java.util.*;

public class test {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println(censored(scanner.nextLine()));
  }

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
