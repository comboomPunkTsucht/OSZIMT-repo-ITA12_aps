
public class Getränk extends Food {

	private double füllmenge;
	private int altersfreigabe;
	
	public Getränk(int _artikelnr, String _bezeichnung) {
		super(_artikelnr, _bezeichnung);
	}
	
	public boolean prüfeAlter(int _alter)
	{
		return (_alter >= altersfreigabe);
	}

	public int getAltersfreigabe() {
		return altersfreigabe;
	}

	public void setAltersfreigabe(int altersfreigabe) {
		this.altersfreigabe = altersfreigabe;
	}

	public double getFüllmenge() {
		return füllmenge;
	}

	public void setFüllmenge(double fuellmenge) {
		this.füllmenge = fuellmenge;
	}
	


}
