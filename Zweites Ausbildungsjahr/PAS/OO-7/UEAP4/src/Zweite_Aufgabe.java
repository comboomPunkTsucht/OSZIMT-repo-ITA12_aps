import java.util.ArrayList;
import java.util.ListIterator;
import java.util.Random;

/**
 * 
 */

/**
 * @author mahd
 *
 */
public class Zweite_Aufgabe {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<String> list = new ArrayList<String>();
		Random rand = new Random();
		int temp;
		for(int i = 0; i<5; i++) {
			temp = rand.nextInt();
			list.add(String.valueOf(temp));
		}
		
		for(String i : list) {
			System.out.println(i);
		}
		temp = rand.nextInt();
		list.add(String.valueOf(temp));
		temp = 999;
		list.add(String.valueOf(temp));
		list.remove(2);
		list.remove(4);
		System.out.println(list.size());
		System.out.println(list.contains(String.valueOf(999)));
		ListIterator<String> li = list.listIterator();
		
		while(li.hasNext()) {
			System.out.println(li.next());
		}
	}

}
