
public abstract class Ubahn extends Fahrzeug {

	private int wagenzahl;
	
	public Ubahn(String _interneNummer, int _laenge) {
		super(_interneNummer);
		this.wagenzahl = _laenge;
	}

	public int getWagenzahl() {
		return wagenzahl;
	}

	public void setWagenzahl(int wagenzahl) {
		this.wagenzahl = wagenzahl;
	}

}
