
import java.util.ArrayList;

public class Linie {
	
	private int bezeichnung;
	private ArrayList<Haltepunkt> linienverlauf;

	public Linie(int _bezeichnung) {
		// TODO Auto-generated constructor stub
		this.bezeichnung = _bezeichnung;
		linienverlauf = new ArrayList<Haltepunkt>();
	}
	
	
	public double berechneGesamtlänge() {
		// TODO: Methode implementieren
		return 0.0;
	}
	
	public double berechneFahrtdauer(int durchschnitssgeschwindigkeit, double dauerProHalt)
	{
		// TODO: Methode implementieren
		return 0.0;
	}
	
	
	public int getBezeichnung() {
		return bezeichnung;
	}

	public void setBezeichnung(int bezeichnung) {
		this.bezeichnung = bezeichnung;
	}

	public ArrayList<Haltepunkt> getLinienverlauf() {
		return linienverlauf;
	}

	public void setLinienverlauf(ArrayList<Haltepunkt> linienverlauf) {
		this.linienverlauf = linienverlauf;
	}

}
