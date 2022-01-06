
/*
Aps, Fabian
ITA12
6.1.22
*/
import java.util.*;

public class Whileschleifen {

	// Main-Methode
	public static void main(String[] args) {

		// Aufgabe 1:
		// Geben Sie die Zahlen von 1 bis 15 vorw�rts und r�ckw�rts aus:
		// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
		// 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
		int i = 0;
		while (i <= 14) {
			i++;
			System.out.println(i);
		}

		while (i >= 2) {
			i--;
			System.out.println(i);
		}

		// Aufgabe 2:
		// Geben Sie eine ganze Zahl ein, zum Beispiel 20 und lassen die folgendes
		// ausgegeben
		// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
		// 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
		i--;
		while (i <= 19) {
			i++;
			System.out.println(i);
		}

		while (i >= 2) {
			i--;
			System.out.println(i);
		}

		/*
		 * Aufgabe 3:
		 * 
		 * Schreiben Sie eine Methode, die den Anwender nach einem Start- und Endwert
		 * fragt und dann alle Zahlen (Integer) inklusive der eingegebenen ausgibt.
		 * 
		 * Startwert: 5
		 * Endwert: 9
		 * 5
		 * 6
		 * 7
		 * 8
		 * 9
		 */
		Scanner start_eingabe = new Scanner(System.in);
		Scanner end_eingabe = new Scanner(System.in);

		System.out.println("*********************************");
		System.out.println("* Geben Sie ihren Startwert ein *");
		System.out.println("*********************************");
		System.out.print("=> ");

		int x = start_eingabe.nextInt();
		System.out.println("*********************************");
		System.out.println("* Geben Sie ihren Endwert ein   *");
		System.out.println("*********************************");
		System.out.print("=> ");

		int z = end_eingabe.nextInt();
		while (x <= z) {
			System.out.println(x);
			x++;
		}
		/*
		 * Aufgabe 4:
		 * Schreiben Sie eine Methode, die ein Wort einliest. Das Wort wird dann so oft
		 * ausgegeben, wie es Buchstaben hat:
		 * 
		 * Geben Sie ein Wort ein: Hello
		 * Hello
		 * Hello
		 * Hello
		 * Hello
		 * Hello
		 * 
		 * Verwenden Sie die Methode length(), um die Anzahl der Zeichen eines Strings
		 * zu ermitteln:
		 * 
		 * String inputString;
		 * . . . .
		 * int laenge = inputString.length();
		 */
		Scanner wort_eingabe = new Scanner(System.in);

		System.out.println("*********************************");
		System.out.println("* Geben Sie ihr Word ein        *");
		System.out.println("*********************************");
		System.out.print("=> ");
		String word = wort_eingabe.nextLine();

		int w_length = word.length();

		while (w_length > 0) {
			System.out.println(word);
			w_length--;
		}
		/*
		 * Zusatzaufgabe
		 * 
		 * Schreiben Sie eine Methode, die zwei Worte einliest. Die Methode gibt dann
		 * beide Worte auf einer Zeile aus. Dabei werden die Worte durch Punkte
		 * getrennt.
		 * Die Gesamtlänge der ausgegebenen Zeichen soll 30 betragen:
		 * 
		 * Geben Sie das erste Wort ein:
		 * Tachchen
		 * Geben Sie das zweite Wort ein:
		 * 153
		 * 
		 * Tachchen...................153
		 * 
		 * (So etwas könnte z.B. für ein Inhaltsverzeichnis verwendet werden.)
		 * 
		 * Hinweis: Verwenden Sie System.out.print(".") innerhalb einer Schleife, um die
		 * Punkte auszugeben.
		 */
	}

}