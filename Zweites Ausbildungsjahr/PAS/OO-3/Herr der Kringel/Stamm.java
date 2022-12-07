public class Stamm {

  //Attribute
  private String name;
  private String existirt_seit;

  //Verwaltungsmethoden

  public Stamm() {}

  public Stamm(String name, String existirt_seit) {
    this.name = name;
    this.existirt_seit = existirt_seit;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setExistirt_seit(String existirt_seit) {
    this.existirt_seit = existirt_seit;
  }

  public String getExistirt_seit() {
    return existirt_seit;
  }

  //Methoden
  public void nimmtMitgliedAuf(boolean wert) {
    System.out.println(wert);
  }

  public void gibtMitgliedAb(boolean wert) {
    System.out.println(wert);
  }
}
