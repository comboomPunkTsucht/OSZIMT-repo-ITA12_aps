public class Entry {

  public int duration;
  public String activity;
  public String subject;
  public String date;

  public void output_table_line() {
    System.out.println(
      "* " + date + " * " + subject + " * " + activity + " * " + duration + " *"
    );
  }
}
