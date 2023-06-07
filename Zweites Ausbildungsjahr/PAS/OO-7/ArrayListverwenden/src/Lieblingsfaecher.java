import java.util.ArrayList;
/**
 * 
 */

/**
 * @author mahd
 *
 */
public class Lieblingsfaecher {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<String> lieblingsfaecher = new ArrayList<>();
		
		System.out.println("1.");
		lieblingsfaecher.add("PAS");
		lieblingsfaecher.add("Ma");
		
		for(int i = 0; i < lieblingsfaecher.size(); i++) {
			System.out.println(lieblingsfaecher.get(i));
		}
		System.out.println("\n 2.");
		
		lieblingsfaecher.add("ITS-I");
		for(int i = 0; i < lieblingsfaecher.size(); i++) {
			System.out.println(lieblingsfaecher.get(i));
		}
		System.out.println("\n 3.");
		
		System.out.print("Meine Lieblingsfächer sind: ");
		for(int i = 0; i < lieblingsfaecher.size(); i++) {
			System.out.print(lieblingsfaecher.get(i) + " ");
		}
		System.out.print("\n");
		
		System.out.println("\n 4.");
		
		lieblingsfaecher.set(0, "Leibesübung");
		for(int i = 0; i < lieblingsfaecher.size(); i++) {
			System.out.println(lieblingsfaecher.get(i));
		}
	}

}
