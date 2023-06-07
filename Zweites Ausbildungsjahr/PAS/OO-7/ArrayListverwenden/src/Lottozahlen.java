import java.util.ArrayList;

/**
 * 
 */

/**
 * @author mahd
 *
 */
public class Lottozahlen {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("1.");
		ArrayList<Integer> lottozahlen = new ArrayList<Integer>();
		int[] temp = {1,17,25,30,31,33};
		
		for(int i = 0; i < lottozahlen.size(); i++) {
			lottozahlen.add(temp[i]);
		}
		
		for(int i = 0; i < lottozahlen.size(); i++) {
			System.out.println(lottozahlen.get(i));
		}
		
		System.out.println("\n 2.");
		
		System.out.println(12 + " " + lottozahlen.contains(12));
		System.out.println(31 + " " + lottozahlen.contains(31));
		
		System.out.println("\n 3.");
		
		System.out.println(lottozahlen.size());
		
		System.out.println("\n 4.");
		
		System.out.println(17 + " entfert \n");
		lottozahlen.remove(1);
		for(int i = 0; i < lottozahlen.size(); i++) {
			System.out.println(lottozahlen.get(i));
		}
	}

}
