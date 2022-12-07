public class HdKTest {

  public static void main(String[] args) {
    //Ojekterstellung
    Stamm s1 = new Stamm("Altobarden", "1247 n.d.K.");
    Zwerg z1 = new Zwerg();
    Mgegegenstandt g1 = new Mgegegenstandt();

    //Wertzuweisung

    s1.setExistirt_seit("1248 n.d.K.");

    z1.setName("Gimli");
    z1.setAlter(140);
    z1.setMachtfaktor(70);

    g1.setType("Axe");
    g1.setMwert(12);

    //wetausgabe

    System.out.println(s1.getName());
    System.out.println(z1.getName());

    //methodenaufrufe

    s1.nimmtMitgliedAuf(true);
    z1.heiltSicht(true);
    g1.verzauberung("ekelhafteseisen 2");
  }
}
