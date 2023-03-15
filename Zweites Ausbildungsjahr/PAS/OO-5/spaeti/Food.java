
public class Food extends Artikel {

	// Attribute
	private boolean kühlung;
	private String haltbarkeit;
	
	// Konstruktor
	public Food(int _artikelnr, String _bezeichnung) {
		// Konstruktor der Oberklasse aufrufen
		super(_artikelnr, _bezeichnung);		
	}

	// Methoden
	
	public boolean überprüfeHaltbarkeit()
	{
		// TODO: Methode implementieren
		return true;
	}
	
	public boolean isKühlung() {
		return kühlung;
	}

	public void setKühlung(boolean kuehlung) {
		this.kühlung = kuehlung;
	}

	public String getHaltbarkeit() {
		return haltbarkeit;
	}

	public void setHaltbarkeit(String haltbarkeit) {
		this.haltbarkeit = haltbarkeit;
	}
	

}
