public class test {

  public static void main(String[] args) {
    int[] fib = new int[10];

    for (int var = 0; var < fib.length; var++) {
      fib[var] = var * var;
    }

    for (int var : fib) {
      System.out.println(var);
    }
  }
}
