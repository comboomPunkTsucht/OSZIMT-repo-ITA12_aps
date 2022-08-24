public class Zusatz {

  public static void main(String[] args) {
    int[] zahlen = { 1, 6, 3, 7, 2 };
    int i = 4;

    //a) 7
    System.out.println(zahlen[3]);
    //b) Index out of bounds error message.
    //System.out.println(zahlen[5]);
    //c) 6
    System.out.println(zahlen[1]);
    //d) 2
    System.out.println(zahlen[4]);
    //e) 3
    System.out.println(zahlen[2]);
    //f) 2
    System.out.println(zahlen[i]);
    //g) 4
    System.out.println(i);
    //h) Index  out of bounds error message
    //System.out.println(i + 3);
    //i) 6
    System.out.println(zahlen[zahlen[0]]);
    //j) index  out of bounds error message
    //System.out.println(zahlen[i + zahlen[0]]);


    System.out.println("A2")

    int[] zahlen2 = { 1, 6, 3, 7, 2, 2, 4, 8 };

    //a)
    for (int i = 0; i < zahlen.length; i++) { System.out.println ( zahlen[i] );
    }
   // b)
    for (int i = 1; i < zahlen.length / 2; i++) { System.out.println ( zahlen[i] );
    }
    //c)
    for (int i = zahlen.length – 1; i >= 0; i--) { System.out.println ( zahlen[i] );
    }
    //d)
    for (int i= 1; i<=zahlen.length; i*=2) { System.out.println ( zahlen[i] );
    }
  }
}
