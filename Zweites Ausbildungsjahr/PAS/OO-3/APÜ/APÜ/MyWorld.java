import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MyWorld here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class MyWorld extends World
{

    /**
     * Constructor for objects of class MyWorld.
     * 
     */
    public MyWorld(){
        super(600, 400, 1);
        M monitor = new M();
    
        monitor.setName("M1");
        monitor.setResolution("3840×2160");
        monitor.setSizeInInch(27.00);
        Computer computer = new Computer("HaaPee007", "Zintel x3", 16.00, monitor);
        monitor.setC1(computer);
    
        System.out.println(monitor.getName());
        System.out.println(monitor.getResolution());
        System.out.println(monitor.getSizeInInch());
        System.out.println(monitor.getC1());
        System.out.println(monitor.getC1().getName());
        System.out.println(monitor.getC1().getCPU());
        System.out.println(monitor.getC1().getRAM());
        System.out.println(monitor.getC1().getM1());
        System.out.println(monitor.getC1().getM1().getName());
    
        computer.rechnen();
        monitor.print();
         
    }
}
