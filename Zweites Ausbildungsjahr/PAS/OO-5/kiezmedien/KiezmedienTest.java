
public class KiezmedienTest {
	
	public static void main(String[] args)
	{
		Brettspiel b001 = new Brettspiel("Siedler von Vertan", 4);
		b001.setSpielDesJahres(true);
		b001.setVerliehen(false);		
		
		Videospiel c001 = new Videospiel("Pacman III - Fressen oder gefressen werden",1);
		c001.setPlattform("Commodore 64");
		c001.setVerliehen(false);
		
		DVD dvd001 = new DVD("Krieg der Sterne");
		dvd001.setAnzahlOscars(1);
		dvd001.setVerliehen(false);
		
		CD cd001 = new CD("Best Of Fahrstuhlmusik", "James Last und Freunde");
		cd001.setAnzahlTracks(14);
		cd001.setVerliehen(true);
	}

}
