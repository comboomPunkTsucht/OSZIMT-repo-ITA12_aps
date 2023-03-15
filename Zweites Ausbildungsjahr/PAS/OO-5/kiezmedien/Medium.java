

public class Medium {

	// Attribute
	private String titel;
	private boolean verliehen;

	// Konstruktor
	public Medium() {
	}

	public Medium(String _titel) {
		this.titel = _titel;
	}

	public boolean sucheInAmazon() {
		// TODO: Steam-Suche anbinden
		return false;
	}

	public boolean leiheMediumAus(int anzahlTage) {
		if (anzahlTage > 0)
		{
			this.verliehen = true;
			return true;
		}
		// TODO: Steam-Suche anbinden
		return false;
	}

	public boolean gebeMediumZurück() {
		// TODO: Steam-Suche anbinden
		if (verliehen)
		{
			verliehen = false;
			return true;
		}
		return false;
	}

	// Methoden
	public String getTitel() {
		return titel;
	}

	public void setTitel(String titel) {
		this.titel = titel;
	}

	public boolean getVerliehen() {
		return verliehen;
	}

	public void setVerliehen(boolean _verliehen) {
		this.verliehen = _verliehen;
	}

}
