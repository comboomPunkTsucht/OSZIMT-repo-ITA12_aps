public class Fibonacci {

  public static void main(String[] args) {
    int fib[] = new int[10];

    for (int i = 0; i < 10; i++) {
      fib[i] = fibonacci(i);
    }

    for (int i = 0; i < 10; i++) {
      System.out.println(fib[i]);
    }
  }

  public static int fibonacci(int n) {
    if (n == 0) {
      return 0;
    } else if (n == 1) {
      return 1;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }
}
