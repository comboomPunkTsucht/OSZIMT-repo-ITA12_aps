import java.util.*;

public class Arrayten {

  public static void main(String[] args) {
    int num[] = new int[10];

    for (int i = 0; i < 10; i++) {
      num[i] = (i + 1);
      System.out.println(num[i]);
    }
    int[] a = { 1, 5, -5, 4, -4, 3 };
    System.out.println(" ");
    for (int i = 0; i < a.length; i++) {
      a[i] = a[i] * 3;
      System.out.println(a[i]);
    }
    int sum = 0;
    System.out.println(" ");
    for (int i = 0; i < a.length; i++) {
      a[i] = a[i] * 3;
      sum = sum + a[i];
    }
    System.out.println(sum);
  }
}
