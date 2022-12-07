public class Mgegegenstandt {

  //Attribute
  private String type;
  private int mWert;

  //Verwaltungsmethoden
  public Mgegegenstandt() {}

  public Mgegegenstandt(String type, int mWert) {
    this.type = type;
    this.mWert = mWert;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getType() {
    return type;
  }

  public void setMwert(int mWert) {
    this.mWert = mWert;
  }

  //Mthoden
  public void verzauberung(String verzauberung) {
    System.out.println(verzauberung);
  }

  public void wirdverwendet(boolean wert) {
    System.out.println(wert);
  }
}
