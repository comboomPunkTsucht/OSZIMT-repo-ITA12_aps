public class Zwerg {

  //Attribute
  private String name;
  private int alter;
  private int machtfaktor;

  //Verwaltungsmethoden
  public Zwerg() {}

  public Zwerg(String name, int alter, int machtfaktor) {
    this.name = name;
    this.alter = alter;
    this.machtfaktor = machtfaktor;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setAlter(int alter) {
    this.alter = alter;
  }

  public int getAlter() {
    return alter;
  }

  public void setMachtfaktor(int machtfaktor) {
    this.machtfaktor = machtfaktor;
  }

  //Methoden
  public void setztMGegenstandtEin(boolean wert) {
    System.out.println(wert);
  }

  public void heiltSicht(boolean wert) {
    System.out.println(wert);
  }
}
