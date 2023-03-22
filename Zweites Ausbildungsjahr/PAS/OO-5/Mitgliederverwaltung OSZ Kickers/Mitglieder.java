public abstract class Mitglieder {
    private String name;
    private String telnum;
    private boolean beitrag;

    public Mitglieder() {}

    public Mitglieder(String name, String telnum, boolean beitrag) {
        this.name = name;
        this.telnum = telnum;
        this.beitrag = beitrag;
    }

    public String getName() {return this.name;}
    public String getTelnum() {return this.telnum;}
    public boolean getBeitrag() {return this.beitrag;}

    public void setName(String name) {this.name = name;}
    public void setTelnum(String telnum) {this.telnum = telnum;}
    public void setBeitrag(boolean beitrag) {this.beitrag = beitrag;}
}
