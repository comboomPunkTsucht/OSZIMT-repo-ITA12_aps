public class Mannschaftsleiter extends Spieler {
    private String mannschaftString;
    private double rabattBeitrag;

    public Mannschaftsleiter() {}

    public Mannschaftsleiter(String mannschaftString, double rabattBeitrag, int trikonr, String pos, String name, String telnum,
            boolean beitrag, Manschaft manschaft) {
        super(trikonr, pos, name, telnum, beitrag, manschaft);
        this.mannschaftString = mannschaftString;
        this.setRabattBeitrag(rabattBeitrag);
    }
    public String getMannschaftString() {return this.mannschaftString;}
    public double getRabattBeitrag() {return this.rabattBeitrag;}

    public void setMannschaftString(String mannschaftString) {this.mannschaftString = mannschaftString;}
    public void setRabattBeitrag(double rabattBeitrag) {if (rabattBeitrag >= 0.0 ){this.rabattBeitrag = rabattBeitrag;}}
    

    @Override
    public String toString() {
        return "{" +
            " mannschaft='" + this.mannschaftString + "'" +
            ", rabattBeitrag='" + this.rabattBeitrag + "'" +
            "}";
    } 



}
