package String.Hangman;

import java.util.*;

public class hangmain {

  public static void main(String[] args) {
    boolean game_loop = true;

    do {
      Scanner scanner = new Scanner(System.in);

      String eingabe = scanner.nextLine();
      char[] chararrayeingabe = eingabe.toLowerCase().toCharArray();

      String[] strich = new String[chararrayeingabe.length];

      for (int i = 0; i < chararrayeingabe.length; i++) {
        strich[i] = "_";
        System.out.print(strich[i]);
      }
      game_loop = false;
    } while (game_loop);
  }
}

  public static void main(String[] args) {
    boolean game_loop = true;

    do {
      Scanner scanner = new Scanner(System.in);

      String eingabe = scanner.nextLine();
      char[] chararrayeingabe = eingabe.toLowerCase().toCharArray();

      String[] strich = new String[chararrayeingabe.length];

      for (int i = 0; i < chararrayeingabe.length; i++) {
        strich[i] = "_";
        System.out.print(strich[i]);
      }
      game_loop = false;
    } while (game_loop);
  }
}
