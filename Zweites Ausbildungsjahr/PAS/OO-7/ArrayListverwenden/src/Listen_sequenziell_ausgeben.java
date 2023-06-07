import java.util.ArrayList;
import java.util.ListIterator;

public class Listen_sequenziell_ausgeben {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("1. + 2.");
		ArrayList<Integer> list = new ArrayList<Integer>();
		for(int i = 10; i <= 1000; i += 10) {
			list.add(i);
		}
		for(int i: list) {
			System.out.println(i);
		}
		System.out.println("");
		ListIterator<Integer> li =
				 list.listIterator();
				while(li.hasNext()) {
				System.out.println(li.next());
				}
		
	}

}