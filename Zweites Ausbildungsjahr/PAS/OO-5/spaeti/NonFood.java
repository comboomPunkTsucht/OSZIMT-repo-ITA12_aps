
public class NonFood extends Artikel {

	// Attribute
	private boolean istSperrgut;
	
	// Konstruktor
	public NonFood(int _artikelnr, String _bezeichnung) {
		// Konstruktor der Oberklasse aufrufen
		super(_artikelnr, _bezeichnung);
	}

	public boolean getIstSperrgut() {
		return istSperrgut;
	}

	public void setIstSperrgut(boolean istSperrgut) {
		this.istSperrgut = istSperrgut;
	}

}
