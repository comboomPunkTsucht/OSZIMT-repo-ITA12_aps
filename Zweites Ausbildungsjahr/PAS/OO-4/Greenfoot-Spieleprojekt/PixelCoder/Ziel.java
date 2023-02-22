import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Ziel.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Ziel extends Actor
{
    public int points;
    public void act() 
    {
        if(this.isTouching(Player1.class) || this.isTouching(Player1.class)) {
            Greenfoot.setWorld(new Won());
        }
    }    
}