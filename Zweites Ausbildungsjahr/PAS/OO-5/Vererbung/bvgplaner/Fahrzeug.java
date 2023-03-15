
public class Fahrzeug {

	private Betriebsstätte depot;
	private String interneNummer;
	private int anzahlPlätze;
	
	public Fahrzeug(String _interneNummer) {
		this.interneNummer = _interneNummer;
	}

	public Betriebsstätte getDepot() {
		return depot;
	}

	public void setDepot(Betriebsstätte depot) {
		this.depot = depot;
		if (depot == null)
			return;
		if (!depot.istFahrzeugVorhanden(this))
		{
			depot.fügeFahrzeugHinzu(this);
		}
	}

	public String getInterneNummer() {
		return interneNummer;
	}

	public void setInterneNummer(String interneNummer) {
		this.interneNummer = interneNummer;
	}

	public int getAnzahlPlätze() {
		return anzahlPlätze;
	}

	public void setAnzahlPlätze(int anzahlPlätze) {
		this.anzahlPlätze = anzahlPlätze;
	}

}
