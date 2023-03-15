

public class CD extends Medium {

	private String artist;
	private int anzahlTracks;
	private double gesamtl�nge;
	
	public CD(String _titel, String _artist) {
		setTitel(_titel);
		this.artist = _artist;
	}

	public boolean sucheInSpotify() {
		// TODO: Steam-Suche anbinden
		return false;
	}
	
	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public int getAnzahlTracks() {
		return anzahlTracks;
	}

	public void setAnzahlTracks(int anzahlTracks) {
		this.anzahlTracks = anzahlTracks;
	}

	public double getGesamtl�nge() {
		return gesamtl�nge;
	}

	public void setGesamtl�nge(double gesamtl�nge) {
		this.gesamtl�nge = gesamtl�nge;
	}

}
