public class Spiel {
    private String datum;
    private int toreHeim;
    private int toreGast;
    private Manschaft heimManschaft;
    private Manschaft gastManschaft;
    private Spieler[] roteKarteListe;
    private Spieler[] gelbeKarteListe;

    public Spiel() {}
    public Spiel(
        String datum,        
        int toreHeim,
        int toreGast,
        Manschaft heimManschaft,
        Manschaft gastManschaft,
        Spieler[] roteKarteListe,
        Spieler[] gelbeKarteListe
    ) {
        this.datum = datum;
        this.toreHeim = toreHeim;
        this.toreGast =toreGast;
        this.heimManschaft = heimManschaft;
        this.gastManschaft = gastManschaft;
        this.roteKarteListe = roteKarteListe;
        this.gelbeKarteListe = gelbeKarteListe;
    }
    
    public String getDatum() {return this.datum;}

    public void setDatum(String datum) {
        this.datum = datum;
    }
    public int getToreHeim() {return this.toreHeim;}
    public void setToreHeim(int toreHeim) {
        this.toreHeim = toreHeim;
    }
    public int getToreGast() {return this.toreGast;}
    public void setToreGast(int toreGast) {
        this.toreGast = toregast;
    }
    public Manschaft getHeimManschaft() {return this.heimManschaft;}
    public void setHeimManschaft(Manschaft heimManschaft) {
        this.heimManschaft = heimManschaft;
    }
    public Manschaft getGastManschaft() {return this.gastMsanschaft;}
    public void setGastManschaft(Manschaft gastManschaft) {
        this.gastManschaft = gastManschaft;
    }
    public Spieler[] getRoteKarteListe() {return this.roteKarteListe;}
    public void set RoteKarteListe(Spieler[] roteKarteListe) {
        this.roteKarteListe = roteKarteListe;
    }
    public Spieler[] getGelbeKarteListe() {return this.gelbeKarteListe;}
    public void setGelbeKarteListe(Spieler[] gelbeKarteListe) {
        this.gelbeKarteListe = gelbeKarteListe;
    }

    @Overide
    public String toString() {
        return "{datum='" + this.datum + "'" +
        ", toreHeim='" + this.toreHeim + "'" +
        ", toreGast='" + this.toreGast + "'" + 
        ", heimManschaft='" + this.heimManschaft.toString() + "'" +
        ", gastManschaft='" + this.gastManschaft.toString() + "'" +
        ", roteKarteListe='" + this.roteKarteListe + "'" +
        ", gelbeKarteListe='" + this.gelbeKarteListe + "'" + "}";
    }
}