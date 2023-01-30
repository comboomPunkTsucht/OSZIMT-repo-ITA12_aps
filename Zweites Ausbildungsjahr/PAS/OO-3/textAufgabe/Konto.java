/**
 * A Konto object has a iban, a name, a telnum, a kontostand, and a dispo
 */
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

  
  /** 
   * @return String
   */
  public String getIban() {
    return iban;
  }

  
  /** 
   * @param iban
   */
  public void setIban(String iban) {
    this.iban = iban;
  }

  
  /** 
   * @return String
   */
  public String getName() {
    return name;
  }

  
  /** 
   * @param name
   */
  public void setName(String name) {
    this.name = name;
  }

  
  /** 
   * @return String
   */
  public String getTelnum() {
    return telnum;
  }

  
  /** 
   * @param telnum
   */
  public void setTelnum(String telnum) {
    this.telnum = telnum;
  }

  
  /** 
   * @return double
   */
  public double getKontostand() {
    return kontostand;
  }

  
  /** 
   * @param kontostand
   */
  public void setKontostand(double kontostand) {
    this.kontostand = kontostand;
  }

  
  /** 
   * @return double
   */
  public double getDispo() {
    return dispo;
  }

  
  /** 
   * @param dispo
   */
  public void setDispo(double dispo) {
    this.dispo = dispo;
  }

  
  /** 
   * @param betrag
   */
  public void einzahlen(double betrag) {
    this.kontostand += betrag;
  }

  
  /** 
   * @param betrag
   */
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

  
  /** 
   * @param konto
   * @param betrag
   */
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
