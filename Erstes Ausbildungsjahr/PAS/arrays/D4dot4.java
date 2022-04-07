public class D4dot4 {

  public static void main(String[] args) {
    int[] x = { 12, 11, -1 };
    double[] y = { 1.3, 1.4, -12.3, 2.23 };
    char[] z = { 'a', '#' };
    String[] v = { "Ar", "ra", "y" };

    System.out.println("A1");
    System.out.println(x[0]);
    System.out.println(y[3]);
    System.out.println(z[1]);
    System.out.println(v[0]);
    array_a2();
  }

  public static void array_a2() {
    int[] x = { 12, 11, -1 };
    x[0] = 12;
    x[1] = 11;
    x[2] = -1;
    System.out.println("A2");
    System.out.println("  | intArray");
    System.out.println("----------------");
    System.out.println("0 | " + x[0]);
    System.out.println("1 | " + x[1]);
    System.out.println("2 | " + x[2]);
    double[] y = { 12, 11, -1 };
    y[0] = 12;
    y[1] = 11;
    y[2] = -1;
    System.out.println("A2");
    System.out.println("  | doubleArray");
    System.out.println("----------------");
    System.out.println("0 | " + y[0]);
    System.out.println("1 | " + y[1]);
    System.out.println("2 | " + y[2]);
  }
}
