
import java.util.ArrayList;

public class Lieferant {

	private String name;
	private String ort;
	private ArrayList<Artikel> lieferbareArtikel;
	
	public Lieferant() {
		lieferbareArtikel = new ArrayList<Artikel>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOrt() {
		return ort;
	}

	public void setOrt(String ort) {
		this.ort = ort;
	}

	public ArrayList<Artikel> getLieferbareArtikel() {
		return lieferbareArtikel;
	}

	public void setLieferbareArtikel(ArrayList<Artikel> lieferbareArtikel) {
		this.lieferbareArtikel = lieferbareArtikel;
	}
	
	public void fuegeArtikelHinzu(Artikel neuerArtikel)
	{
		this.lieferbareArtikel.add(neuerArtikel);
		neuerArtikel.setLieferant(this);
	}

}
