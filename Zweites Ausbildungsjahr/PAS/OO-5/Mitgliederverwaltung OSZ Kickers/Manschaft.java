public class Manschaft {

  private String name;
  private String spielklasse;
  private Spieler[] spielerListe;
  private int minSpieler;
  private int maxSpieler;
  private Trainer trainer;
  private Spiel[] spielListe

  public Munschaft() {}

  public Manschaft(
    String name,
    String spielerklasse,
    Spieler[] spielerListe,
    int minSpieler,
    int maxSpieler,
    Trainer trainer,
    Spiel[] spielListe
  ) {
    this.name = name;
    this.spielklasse = spielerklasse;
    this.spielerListe = spielerListe;
    this.minSpieler = minSpieler;
    this.maxSpieler = maxSpieler;
    this.trainer = trainer;
    this.spielListe = spielListe
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSpilerklasse() {
    return this.spielerklasse;
  }

  public void setSpielerklasse(String spielerklasse) {
    this.spielerklasse = spielerklasse;
  }

  public Spieler[] getSpielerListe() {
    return this.spielerListe;
  }

  public void setSpielerListe(Spieler[] spielerListe) {
    this.spielerListe = spielerListe;
  }

  public int getMinSpieler() {
    return this.minSpieler;
  }

  public void setMinSpieler(int minSpieler) {
    this.minSpieler = minSpieler;
  }

  public Trainer getTrainer() {
    return this.trainer;
  }

  public void setTrainer(Trainer trainer) {
    this.trainer = trainer;
  }
  public Spiel[] getSpielListe() {return this.spielListe;}
  public void setSpielListe(Spiel[] spielListe) {this.spielListe = spielListe}

  @Overide
  public String toString() {
    return "{name='" + this.name + "'" + ",spielerklasse='" +
    this.spielerklasse + "'" + ",spielerListe[]='" + 
    this.Spielerliste + "'"+ ", minSpieler='" +
    this.minSpieler + "'" + ", maxSpieler='" +
    this.maxSpieler + "'" + ", trainer='" +
    this.trainer.toString() + "'" + ", spielListe='"
    this.spielListe + "'" + "}";
  }
}
