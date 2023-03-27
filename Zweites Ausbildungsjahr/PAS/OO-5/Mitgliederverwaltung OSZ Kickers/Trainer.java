public class Trainer extends Mitglieder {
    private char lklasse;
    private double gehalt;

    public Trainer() {}
    public Trainer(char lklasse, double gehalt, String name, String telnum, boolean beitrag) {
        super(name, telnum, beitrag);
        this.lklasse = lklasse;
        this.setGehalt(gehalt);
    }

    public char getLklasse() {return this.lklasse;}
    public double getGehalt() {return this.gehalt;}

    public void setLklasse(char lklasse) {this.lklasse = lklasse;}
    public void setGehalt(double gehalt) {if (gehalt >= 0.0 ){this.gehalt = gehalt;}}

    

    @Override
    public String toString() {
        return "{" +
            " lklasse='" + this.lklasse + "'" +
            ", gehalt='" + this.gehalt + "'" +
            "}";
    }
    
}