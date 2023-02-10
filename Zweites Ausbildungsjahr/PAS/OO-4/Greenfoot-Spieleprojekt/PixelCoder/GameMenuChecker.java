import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse GameMenuChecker.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class GameMenuChecker extends Actor
{
    /**
     * Act - tut, was auch immer GameMenuChecker tun will. Diese Methode wird aufgerufen, 
     * sobald der 'Act' oder 'Run' Button in der Umgebung angeklickt werden. 
     */
    public void act() 
    {
        if (Greenfoot.isKeyDown("Space")) {
            Greenfoot.setWorld(new Level1());
        }
    }    
}