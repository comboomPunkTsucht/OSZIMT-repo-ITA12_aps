
public class Bus extends Fahrzeug {

	private String kennzeichen;
	private double laenge;
	
	public Bus(String _kennzeichen) {
		super(_kennzeichen);
		this.kennzeichen = _kennzeichen;
		// TODO Auto-generated constructor stub
	}
	
	public double berechneKurvenradius(double radabstand)
	{
		// TODO: Methode implementieren
		return 0.0;
	}
	
	public String getKennzeichen() {
		return kennzeichen;
	}

	public void setKennzeichen(String kennzeichen) {
		this.kennzeichen = kennzeichen;
		// Interne Nummer ist immer Kennzeichen
		this.setInterneNummer(kennzeichen);
	}

	public double getLaenge() {
		return laenge;
	}

	public void setLaenge(double laenge) {
		this.laenge = laenge;
	}



}
