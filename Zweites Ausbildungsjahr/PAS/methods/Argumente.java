public class Argumente {

  public static void main(String[] args) {
    ausgabe(1, "Mana"); //gibt eine 'zahl + ": " + name' aus
    ausgabe(2, "Elise"); //gibt eine 'zahl + ": " + name' aus
    ausgabe(3, "Johanna"); //gibt eine 'zahl + ": " + name' aus
    ausgabe(4, "Felizitas"); //gibt eine 'zahl + ": " + name' aus
    ausgabe(5, "Karla"); //gibt eine 'zahl + ": " + name' aus
    System.out.println(vergleichen(1, 2)); // gibt ein boolean-wert aus ob (arg1+8) < (arg2*3) ist
    System.out.println(vergleichen(1, 5)); // gibt ein boolean-wert aus ob (arg1+8) < (arg2*3) ist
    System.out.println(vergleichen(3, 4)); // gibt ein boolean-wert aus ob (arg1+8) < (arg2*3) ist
  }

  public static void ausgabe(int zahl, String name) {
    System.out.println(zahl + ": " + name);
  }

  public static boolean vergleichen(int arg1, int arg2) {
    return (arg1 + 8) < (arg2 * 3);
  }
}
