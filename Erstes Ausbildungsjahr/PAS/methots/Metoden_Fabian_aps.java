public class Metoden_Fabian_aps {

    public static int summe(int n1, int n2) {
        // Liefert die Summe von n1 und n2 als Ergebnis.
        int sum = n1 + n2;
        return sum;
    }

    public static void gibAus(int n1, int n2, int n3) {
        String sternchen = "******************";
        System.out.println(sternchen);
        System.out.println("*   1.Wert: " + n1 + "    *");
        System.out.println("*   2.Wert: " + n2 + "    *");
        System.out.println("*   3.Wert: " + n3 + "    *");
        System.out.println(sternchen);
    }

    public static void gibaus(int line) {
        for (int i = 0; i == line; i++) {
            System.out.print("*-*");
        }

    }

    public static int quadrierung(int b) {
        int quadriert = b * b;
        return quadriert;
    }

    public static long binearrechner(int n) {
        long b = 2;
        if (n < 0) {
            b = 1;
        } else {
            for (int i = 1; i != n; i++) {
                b = b * 2;
            }
        }

        return b;
    }

    public static long binearrechner2(long b, int n) {
        if (n < 0) {
            b = 1;
        } else {
            for (int i = 1; i != n; i++) {
                b = b * 2;
            }
        }

        return b;
    }

    public static double pytagoras(double a, double b) {
        double c = Math.sqrt((a * a) + (b * b));
        return c;
    }

    public static void main(String[] args) {
        String sternchen = "*****************************************************************************************************************************";
        int aufgabe = 1;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        System.out.println(summe(6, 8));
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        gibAus(1, 2, 3);
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        gibaus(5);
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        System.out.println(quadrierung(aufgabe));
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        System.out.println(binearrechner(aufgabe));
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        System.out.println(binearrechner2(6, aufgabe));
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
        System.out.println(pytagoras(6, aufgabe));
        aufgabe++;
        System.out.println(sternchen);
        System.out.println("Aufgabe " + aufgabe);
        System.out.println(sternchen);
    }
}
