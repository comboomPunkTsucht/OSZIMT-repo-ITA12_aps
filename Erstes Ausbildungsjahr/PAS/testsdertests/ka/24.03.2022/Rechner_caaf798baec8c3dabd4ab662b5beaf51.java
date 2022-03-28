/**
 * @author <a href="mailto:mcpeaps_HD@outlook.com" /a>Aps,Fabian
 * @version 1.00 from 24/03/2022
 */

public class Rechner {

	/**
	 * 
	 * @param zahl1 wird mit zahl2 addirt.
	 * @param zahl2 wird mit zahl1 addirt.
	 * @return gibt das ergebniss als Flusszahl zuruek.
	 */
	public static double berechneEtwas(int zahl1, int zahl2) {
		return (zahl1 + zahl2) / 2.0;
	}

	/**
	 * 
	 * @param zahl wird mit dem rest einer division verglichen ob es 0 is oder nicht
	 * @return gibt false aus wenn die Zahl groesser als 1 ist und true wenn es
	 *         kleiner gleich 1 ist
	 */
	public static boolean pruefeZahl(int zahl) {
		for (int i = zahl - 1; i > 1; i--) {
			if (zahl % i == 0) {
				return false;
			}
		}
		return true;
	}
}