
public class DVD extends Medium {

	private int anzahlOscars;
	private String regisseur;
	
	public DVD(String _titel)
	{
		this.setTitel(_titel);
	}

	public boolean sucheInAmazon() {
		// TODO: Steam-Suche anbinden
		return false;
	}

	public int getAnzahlOscars() {
		return anzahlOscars;
	}

	public void setAnzahlOscars(int anzahlOscars) {
		this.anzahlOscars = anzahlOscars;
	}


	public String getRegisseur() {
		return regisseur;
	}


	public void setRegisseur(String regisseur) {
		this.regisseur = regisseur;
	}

}
