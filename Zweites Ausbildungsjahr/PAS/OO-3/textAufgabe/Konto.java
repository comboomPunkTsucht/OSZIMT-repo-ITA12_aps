public class Konto {

  private String iban;
  private String name;
  private String telnum;
  private double kontostand;

  public Konto() {}

  public Konto(String iban, String name, String telnum, double kontostand) {
    this.iban = iban;
    this.name = name;
    this.telnum = telnum;
    this.kontostand = kontostand;
  }

  public String getIban() {
    return iban;
  }

  public void setIban(String iban) {
    this.iban = iban;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTelnum() {
    return telnum;
  }

  public void setTelnum(String telnum) {
    this.telnum = telnum;
  }

  public double getKontostand() {
    return kontostand;
  }

  public void setKontostand(double kontostand) {}

  public void einzahlen(double betrag) {
    this.kontostand += betrag;
  }

  public void auzahlen(double betrag) {
    if ((this.kontostand - betrag) >= 0) {
      this.kontostand -= betrag;
    } else {
      System.out.println("Try agin");
    }
  }

  public boolean ueberweisen(boolean gebe, double betrag) {
    if (gebe) {
      if ((this.kontostand - betrag) >= 0) {
        this.kontostand -= betrag;
        return true;
      } else {
        return false;
      }
    } else {
      this.kontostand += betrag;
      return true;
    }
  }
}
