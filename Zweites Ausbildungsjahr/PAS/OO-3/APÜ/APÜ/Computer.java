import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Computer here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Computer extends Actor
{
    
  // Atribute
  private String name;
  private String cpu;
  private double ram;
  private M m1 = new M();

  // Constructor
  public Computer() {}

  public Computer(String name, String cpu, double ram, M m1) {
    this.name = name;
    this.cpu = cpu;
    this.ram = ram;
    this.m1 = m1;
  }

  //Verwaltungsmethoden
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCPU() {
    return this.cpu;
  }

  public void setCPU(String cpu) {
    this.cpu = cpu;
  }

  public double getRAM() {
    return this.ram;
  }

  public void setRAM(double ram) {
    this.ram = ram;
  }

  public M getM1() {
    return this.m1;
  }

  public void setM1(M m1) {
    this.m1 = m1;
  }

  // Methoden
  public void rechnen() {
    System.out.println("Loding...");
  }
    public void act()
    {
        // Add your action code here.
    }
}
