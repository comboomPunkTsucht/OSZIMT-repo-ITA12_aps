
public class Spiel extends Medium {

	private int anzahlSpieler;
	
	public Spiel(String _titel, int _anzahlSpieler) {
		super();
		this.setTitel(_titel);
		this.anzahlSpieler = _anzahlSpieler;
	}

	public int getAnzahlSpieler() {
		return anzahlSpieler;
	}

	public void setAnzahlSpieler(int anzahlSpieler) {
		this.anzahlSpieler = anzahlSpieler;
	}
	
	

}
