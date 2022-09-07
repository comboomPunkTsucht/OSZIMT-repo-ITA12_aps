import java.util.*;

public class learndiary {

  public static Scanner scan = new Scanner(System.in);

  public static void output_table(
    String[] date,
    String[] subject,
    String[] activity,
    int[] duration,
    int length
  ) {
    System.out.println("************************************************");
    System.out.println("* date * subject * activity * duration[min] *");
    System.out.println("************************************************");
    int i = 0;
    do {
      System.out.println(
        "* " +
        date[i] +
        " * " +
        subject[i] +
        " * " +
        activity[i] +
        " * " +
        duration[i] +
        " *"
      );
      i++;
    } while (i < length);
    System.out.println("************************************************");
  }

  public static int getlength() {
    int length = 10;
    do {
      System.out.println("******************************************");
      System.out.println("* Geben Sie die Menge der Datenzeilen an *");
      System.out.println("*       !!(nicht kleiner als 10)!!       *");
      System.out.println("******************************************");
      System.out.print("=> ");
      length = scan.nextInt();
    } while (!(length >= 10));
    return length;
  }

  public static String setDate() {
    int month;
    do {
      System.out.print("set Month: ");
      month = scan.nextInt();
    } while (!(month <= 12 && month >= 1));
    System.out.println(" ");

    int maxDays = 0;

    switch (month) {
      case 1:
        maxDays = 31;
        break;
      case 2:
        maxDays = 29;
        break;
      case 3:
        maxDays = 31;
        break;
      case 4:
        maxDays = 30;
        break;
      case 5:
        maxDays = 31;
        break;
      case 6:
        maxDays = 30;
        break;
      case 7:
        maxDays = 31;
        break;
      case 8:
        maxDays = 31;
        break;
      case 9:
        maxDays = 30;
        break;
      case 10:
        maxDays = 31;
      case 11:
        maxDays = 30;
        break;
      case 12:
        maxDays = 31;
        break;
    }

    int dayOfMonth;
    do {
      System.out.print("set day of Month: ");
      dayOfMonth = scan.nextInt();
    } while (!(dayOfMonth <= maxDays && dayOfMonth > 0));
    System.out.println(" ");

    String date = dayOfMonth + "." + month + ".";
    return date;
  }

  public static void main(String[] args) {
    int length = getlength();
    int[] durraration = new int[length];
    String[] activity = new String[length];
    String[] subject = new String[length];
    String[] date = new String[length];

    durraration[0] = 45;
    activity[0] = "Übung zu Schleifen und Methode";
    subject[0] = "PAS";
    date[0] = "11.08.";
    durraration[1] = 30;
    activity[1] = "Lerntagebuch - Planung erstellen";
    subject[1] = "PAS";
    date[1] = "12.08.";
    durraration[2] = 55;
    activity[2] = "Ringparabel Motive";
    subject[2] = "De";
    date[2] = "12.08.";
    durraration[3] = 30;
    activity[3] = "Arrays - Hausaufgaben";
    subject[3] = "PAS";
    date[3] = "14.08.";

    boolean quit = false;

    char menu = 'i';

    int i = 4;

    do {
      output_table(date, subject, activity, durraration, length);

      System.out.println("select an option:");
      System.out.println("[i] input data");
      System.out.println("[q] quit");
      System.out.print("=> ");
      menu = scan.next().charAt(0);

      switch (menu) {
        case 'q':
          quit = true;
        case 'i':
          date[i] = setDate();
          subject[i] = scan.next();
          activity[i] = scan.next();
          durraration[i] = scan.nextInt();
        default:
          System.out.println(
            "user interface is resetting, data will not be cleared"
          );
          break;
      }
      i++;
    } while (quit = false);
  }
}
