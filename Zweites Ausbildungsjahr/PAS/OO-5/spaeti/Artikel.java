
public class Artikel {

	// Attribute
	private int artikelnr;
	private String bezeichnung;
	private String verpackung;
	private int lagerbestand;

	private Lieferant lieferant;

	// Konstruktor
	public Artikel(int _artikelnr, String _bezeichnung) {
		this.artikelnr = _artikelnr;
		this.bezeichnung = _bezeichnung;
	}

	// Methoden
	public boolean bucheArtikelAus(int anzahl)
	{
		if (anzahl < 0)
			return false;
		if (lagerbestand - anzahl < 0 )
			return false;
		this.lagerbestand -= anzahl;
		return true;
	}
	
	public boolean bucheArtikelEin(int anzahl)
	{
		if (anzahl < 0)
			return false;
		this.lagerbestand += anzahl;
		return true;
	}
	
	public double berechneInventar(double preis)
	{
		if (preis > 0)
			return this.lagerbestand * preis;
		else
			return 0.0;
	}
	
	
	public int getArtikelr() {
		return artikelnr;
	}

	public void setArtikelr(int artikelr) {
		this.artikelnr = artikelr;
	}

	public String getBezeichnung() {
		return bezeichnung;
	}

	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}

	public String getVerpackung() {
		return verpackung;
	}

	public void setVerpackung(String verpackung) {
		this.verpackung = verpackung;
	}

	public int getLagerbestand() {
		return lagerbestand;
	}

	public void setLagerbestand(int lagerbestand) {
		this.lagerbestand = lagerbestand;
	}

	public Lieferant getLieferant() {
		return lieferant;
	}

	public void setLieferant(Lieferant lieferant) {
		if (lieferant != null) {
			this.lieferant = lieferant;
			if (!lieferant.getLieferbareArtikel().contains(this))
				lieferant.getLieferbareArtikel().add(this);
		}
	}

}
