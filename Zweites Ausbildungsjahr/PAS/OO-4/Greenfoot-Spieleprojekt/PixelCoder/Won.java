import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Won.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Won extends World
{

    /**
     * Konstruktor für Objekte der Klasse Won
     * 
     */
    public Won()
    {    
        // Erstellt eine neue Welt mit 600x400 Zellen und einer Zell-Größe von 1x1 Pixeln.
        super(1280, 720, 1); 
        Level1.z1.points = 0;
        Greenfoot.setWorld(new GameMenu());
        Greenfoot.stop();
    }
}