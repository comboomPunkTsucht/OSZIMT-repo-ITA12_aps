public class Konto {

  private String iban;
  private String name;
  private String telnum;
  private double kontostand;
  private double dispo = 100;

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

  public void setKontostand(double kontostand) {
    this.kontostand = kontostand;
  }

  public double getDispo() {
    return dispo;
  }

  public void setDispo(double dispo) {
    this.dispo = dispo;
  }

  public void einzahlen(double betrag) {
    this.kontostand += betrag;
  }

  public void auzahlen(double betrag) {
    if ((this.kontostand - betrag) >= 0) {
      this.kontostand -= betrag;
    } else if (((this.kontostand + this.dispo) - betrag) >= 0) {
      this.kontostand += this.dispo;
      this.dispo = 0;
      this.kontostand -= betrag;
    } else {
      System.out.println("Try agin");
    }
  }

  public void ueberweisen(Konto konto, double betrag) {
    if ((this.kontostand - betrag) >= 0) {
      this.kontostand -= betrag;
      konto.einzahlen(betrag);
    } else if (((this.kontostand + this.dispo) - betrag) >= 0) {
      this.kontostand += this.dispo;
      this.dispo = 0;
      this.kontostand -= betrag;
      konto.auzahlen(betrag);
    } else {
      System.out.println("Try agin");
    }
  }
}
