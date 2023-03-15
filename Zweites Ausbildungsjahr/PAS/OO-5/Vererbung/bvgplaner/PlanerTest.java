
import org.junit.Test;

import de.oszimt.fos.bvgplaner.Betriebsstätte;
import de.oszimt.fos.bvgplaner.Bus;
import de.oszimt.fos.bvgplaner.Haltepunkt;
import de.oszimt.fos.bvgplaner.Linie;
import de.oszimt.fos.bvgplaner.Tram;

public class PlanerTest {

	@Test
	public void testBus()
	{
		
		String intNummer = "OB-352";
		String kennzeichen = "B-VG-1234";
		Bus bus001 = new Bus(intNummer);
		assert (bus001.getKennzeichen().equals(intNummer));
		
		bus001.setKennzeichen("B-VG-1234");
		bus001.setAnzahlPlätze(64);
		bus001.setLaenge(23.7);	
		
		assert (bus001.getKennzeichen().equals(kennzeichen));
		assert (bus001.getInterneNummer().equals(kennzeichen));
		assert (bus001.getLaenge() == 23.7);
		assert (bus001.getAnzahlPlätze() == 64);
		
	}
	
	@Test
	public void testReferences() {
		Betriebsstätte b1 = new Betriebsstätte();
		b1.setBezeichnung("Busdepot Lichtenberg");
		Bus bus001 = new Bus("OB-352");
		bus001.setKennzeichen("B-VG-1234");
		bus001.setDepot(b1);
		
		Haltepunkt h001 = new Haltepunkt();
		h001.setBezeichnung("Ostbahnhof");
		
		Haltepunkt h002 = new Haltepunkt();
		h002.setBezeichnung("Grünberger Str. / Warschauer Str.");
		
		Linie l001 = new Linie(240);
		l001.getLinienverlauf().add(h001);
		l001.getLinienverlauf().add(h002);
		
		assert b1.hatFahrzeugtypVerfügbar(Bus.class);
		assert !b1.hatFahrzeugtypVerfügbar(Tram.class);
		assert b1.getBezeichnung().equals("Busdepot Lichtenberg");
	}

}
