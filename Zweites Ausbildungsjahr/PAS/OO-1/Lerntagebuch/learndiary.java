/**
 * It's a simple program that allows you to input data into an array and then outputs it in a table
 * @author Aps, Fabian, ITA12
 * @version 1.0.1 - 07.09.2022
 */
import java.util.*;

public class learndiary {

  public static Scanner scan = new Scanner(System.in);

  /**
   * It prints out a table of the data in the arrays
   *
   * @param date an array of strings that contains the dates of the activities
   * @param subject The subject of the activity.
   * @param activity the activity that was done
   * @param duration an array of integers
   * @param length the number of rows in the table
   */
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

  /**
   * It asks the user to input a number, and if the number is less than 10, it will ask the user to
   * input a number again
   *
   * @return The length of the array.
   */
  public static int getlength() {
    int length = 10;
    do {
      System.out.println("***********************************");
      System.out.println("* Specify the amount of data rows *");
      System.out.println("*     !!(not smaller than 10)!!   *");
      System.out.println("***********************************");
      System.out.print("=> ");
      length = scan.nextInt();
    } while (!(length >= 10));
    return length;
  }

  /**
   * It asks the user to input a month and a day of the month, and then returns a string containing the
   * day and month in the format "dd.mm."
   *
   * @return A String with the date in the format "dd.mm."
   */
  public static String setDate() {
    int month;
    do {
      System.out.println("*************");
      System.out.println("* set Month *");
      System.out.println("*************");
      System.out.print("=> ");
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
      System.out.println("********************");
      System.out.println("* set day of Month *");
      System.out.println("********************");
      System.out.print("=> ");
      dayOfMonth = scan.nextInt();
    } while (!(dayOfMonth <= maxDays && dayOfMonth > 0));
    System.out.println(" ");

    String date;
    if (dayOfMonth < 10) {
      date = "0" + dayOfMonth + "." + month + ".";
    } else if (month < 10) {
      date = dayOfMonth + ".0" + month + ".";
    } else if (month < 10 && dayOfMonth < 10) {
      date = "0" + dayOfMonth + ".0" + month + ".";
    } else {
      date = dayOfMonth + "." + month + ".";
    }
    return date;
  }

  /**
   * It's a menu that allows the user to input data into the arrays
   */
  public static void main(String[] args) {
    int length = getlength();
    int[] duration = new int[length];
    String[] activity = new String[length];
    String[] subject = new String[length];
    String[] date = new String[length];

    duration[0] = 45;
    activity[0] = "Übung zu Schleifen und Methode";
    subject[0] = "PAS";
    date[0] = "11.08.";
    duration[1] = 30;
    activity[1] = "Lerntagebuch - Planung erstellen";
    subject[1] = "PAS";
    date[1] = "12.08.";
    duration[2] = 55;
    activity[2] = "Ringparabel Motive";
    subject[2] = "De";
    date[2] = "12.08.";
    duration[3] = 30;
    activity[3] = "Arrays - Hausaufgaben";
    subject[3] = "PAS";
    date[3] = "14.08.";

    boolean quit = false;

    char menu;

    int i = 4;

    do {
      output_table(date, subject, activity, duration, length);

      System.out.println("********************");
      System.out.println("* select an option *");
      System.out.println("*  [i] input data  *");
      System.out.println("*  [d] delete data *");
      System.out.println("*     [q] quit     *");
      System.out.println("********************");
      System.out.print("=> ");
      menu = scan.next().charAt(0);

      switch (menu) {
        case 'q':
          quit = true;
          break;
        case 'i':
          date[i] = setDate();
          System.out.println("****************");
          System.out.println("* what Subject *");
          System.out.println("****************");
          System.out.print("=> ");
          subject[i] = scan.next();
          while (subject[i].length() < 3) {
            subject[i] += " ";
          }
          while (subject[i].length() < 3) {
            subject[i] += " ";
          }
          while (subject[i].length() < 3) {
            subject[i] += " ";
          }
          System.out.println("*****************");
          System.out.println("* what activity *");
          System.out.println("*****************");
          System.out.print("=> ");
          activity[i] = scan.next();
          System.out.println("*************************");
          System.out.println("* what duration[min] *");
          System.out.println("*************************");
          System.out.print("=> ");
          duration[i] = scan.nextInt();
          break;
        case 'd':
          System.out.println("************************");
          System.out.println("* wich Entry to delete *");
          System.out.println("************************");
          int entry = scan.nextInt();
          if (entry > 0) {
            entry = entry - 1;
          } else if (entry == 0) {
            entry = 0;
          } else if (entry < 0) {
            entry = -entry;
            entry--;
          }
          for (int id = entry; i < length - 1; id++) {
            date[id] = date[id + 1];
            subject[id] = subject[id + 1];
            activity[id] = activity[id + 1];
            duration[i] = duration[id + 1];
          }
          i--;
          break;
        default:
          System.out.println(
            "*************************************************************"
          );
          System.out.println(
            "* !!user interface is resetting, data will not be cleared!! *"
          );
          System.out.println(
            "*************************************************************"
          );
          break;
      }
      i++;
    } while (quit == false);
  }
}
