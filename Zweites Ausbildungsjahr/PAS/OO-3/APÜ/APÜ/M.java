import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class M here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class M extends Actor
{
    
  //Atriebute
  private String name;
  private String resolution;
  private double sizeInInch;
  private Computer c1 = new Computer();

  //Constructor
  public M() {}

  public M(String name, String resolution, double sizeInInch, Computer c1) {
    this.name = name;
    this.resolution = resolution;
    this.sizeInInch = sizeInInch;
    this.c1 = c1;
  }

  //Verhaltungsmethoden
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getResolution() {
    return this.resolution;
  }

  public void setResolution(String resolution) {
    this.resolution = resolution;
  }

  public double getSizeInInch() {
    return this.sizeInInch;
  }

  public void setSizeInInch(double sizeInInch) {
    this.sizeInInch = sizeInInch;
  }

  public Computer getC1() {
    return this.c1;
  }

  public void setC1(Computer c1) {
    this.c1 = c1;
  }

  //methoden

  public void print() {
    System.out.println("printing...");
  }
    public void act()
    {
        // Add your action code here.
    }
}
