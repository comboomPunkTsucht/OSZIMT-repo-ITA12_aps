/**
 * @author <a href="mailto:mcpeaps_HD@outlook.com" target="_blank">Aps, Fabian; ITA12</a>
 * @version 1.0 (2022-05-19)
 */


import java.util.*;


public class AP4 {


public static Random rand = new Random();

public static int[] wuerfeln() {
    int wuerfel[] = new int[50];
    for (int i = 0; i < wuerfel.length; i++) {
        wuerfel[i] = rand.nextInt(6)+1;
    }
    return wuerfel;
}
public static void ausgabe(int wuerfel[]) {
    for (int i = 0; i < wuerfel.length; i++) {
        System.out.print(wuerfel[i] + ", ");
    }
    System.out.println(" ");
}
public static void pasch(int wuerfel[]) {
    int pasch = 0;
    int j =0;
    for (int i = 0; i < wuerfel.length; i++) {
        j = i -1;   
        if(j >=0) {
        if (wuerfel[i] == wuerfel[j]) {
                pasch++;
            }
        }
        }
        System.out.println("Es liegen " + pasch + " Pasch(e) vor.");
    }
    public static void main(String[] args) {
        int wuerfel[] = wuerfeln();
        ausgabe(wuerfel);
        pasch(wuerfel);
    }
}