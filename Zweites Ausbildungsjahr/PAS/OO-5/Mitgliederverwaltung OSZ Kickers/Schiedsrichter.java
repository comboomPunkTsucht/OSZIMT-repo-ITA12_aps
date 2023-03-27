public class Schiedsrichter extends Mitglieder {
    private int anzahlSpiele;

    public Schiedsrichter() {}

    public Schiedsrichter(int anzahlSpiele, String name, String telnum, boolean beitrag) {
        super(name, telnum, beitrag);
        this.setAnzahlSpiele(anzahlSpiele);
    }
    public int getAnzahlSpiele() {
        return this.anzahlSpiele;
    }
    public void setAnzahlSpiele(int anzahlSpiele) {
        if (anzahlSpiele >= 0 ){this.anzahlSpiele = anzahlSpiele;}
    }


    @Override
    public String toString() {
        return "{" +
            " anzahlSpiele='" + this.anzahlSpiele + "'" +
            "}"; 
    } 

}