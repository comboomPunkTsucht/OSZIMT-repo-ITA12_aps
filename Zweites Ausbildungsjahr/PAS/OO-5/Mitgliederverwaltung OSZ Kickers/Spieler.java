public class Spieler extends Mitglieder {
    private int trikonr;
    private String pos;
    private Manschaft manschaft;

    public Spieler() {}
    public Spieler(int trikonr, String pos, String name, String telnum, boolean beitrag, Manschaft manschaft) {
        super(name, telnum, beitrag);
        this.setTrikonr(trikonr);
        this.pos = pos;
        this.manschaft = manschaft;
    }

    public int getTrikonr() {return this.trikonr;}
    public String getPos() {return this.pos;}

    public void setTrikonr(int trikonr) {if (trikonr >= 0 && trikonr <= 99 ){this.trikonr = trikonr;}}
    public void setPos(String pos) {this.pos = pos;}
    

    @Override
    public String toString() {
        return "{" +
            " trikonr='" + this.trikonr + "'" +
            ", pos='" + this.pos + "'" + 
            ", pos='" + this.pos + "'" + ", manschaft='" + manschaft.toString() + "'"
            "}";
    }

}

