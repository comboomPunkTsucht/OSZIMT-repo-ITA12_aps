public class main {

  public static void main(String[] args) {
    Konto k1 = new Konto();
    Konto k2 = new Konto(
      "DE00000000000000000002",
      "Herr Wiktor",
      "+491761234567",
      999999999999.99
    );
    Konto k3 = new Konto();

    k1.setIban("DE00000000000000000000000001");
    k3.setIban("DE00000000000000000000000003");

    k1.setName("Karim Rahman");
    k3.setName("Kevin Babig");

    k1.setTelnum("+491761234567");
    k3.setTelnum("+491761234567");

    k1.setKontostand(200.99);
    k3.setKontostand(-70.99);

    k2.einzahlen(99.9);
    k3.auzahlen(99.9);

    k2.ueberweisen(k1, 3);

    System.out.println(
      k1.getIban() +
      " " +
      k1.getName() +
      " " +
      k1.getTelnum() +
      " " +
      k1.getKontostand() +
      " " +
      k1.getDispo()
    );
    System.out.println(
      k2.getIban() +
      " " +
      k2.getName() +
      " " +
      k2.getTelnum() +
      " " +
      k2.getKontostand() +
      " " +
      k2.getDispo()
    );
    System.out.println(
      k3.getIban() +
      " " +
      k3.getName() +
      " " +
      k3.getTelnum() +
      " " +
      k3.getKontostand() +
      " " +
      k3.getDispo()
    );
  }
}
