public class Mannschaftsleiter extends Spieler {
    private String mannschaft;
    private double rabattBeitrag;

    public Mannschaftsleiter() {}

    public Mannschaftsleiter(String mannschaft, double rabattBeitrag, int trikonr, String pos, String name, String telnum,
            boolean beitrag) {
        super(trikonr, pos, name, telnum, beitrag);
        this.mannschaft = mannschaft;
        this.setRabattBeitrag(rabattBeitrag);
    }
    public String getMannschaft() {return this.mannschaft;}
    public double getRabattBeitrag() {return this.rabattBeitrag;}

    public void setMannschaft(String mannschaft) {this.mannschaft = mannschaft;}
    public void setRabattBeitrag(double rabattBeitrag) {if (rabattBeitrag >= 0.0 ){this.rabattBeitrag = rabattBeitrag;}}
    
}
