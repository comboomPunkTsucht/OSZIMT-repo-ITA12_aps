

public class Videospiel extends Spiel {
	
	private String plattform;
	
	public Videospiel(String _titel, int _anzahlSpieler) {
		super(_titel, _anzahlSpieler);
	}

	public double berechneSpaßfaktor()
	{
		// Berechne Spaßfaktor für Brettspiele
		return 0.0;
	}
	
	public boolean sucheInSteam()
	{
		// TODO: Steam-Suche anbinden
		return false;
	}
	
	public String getPlattform() {
		return plattform;
	}

	public void setPlattform(String plattform) {
		this.plattform = plattform;
	}



}
