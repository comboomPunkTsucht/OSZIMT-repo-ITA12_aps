import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse MyWorld.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class MyWorld extends World
{

    /**
     * Konstruktor für Objekte der Klasse MyWorld
     * 
     */
    public MyWorld()
    {    
        // Erstellt eine neue Welt mit 600x400 Zellen und einer Zell-Größe von 1x1 Pixeln.
        super(1280, 720, 1); 
        
        Player1 p1 = new Player1(600, 420);
        Player2 p2 = new Player2(600, 420);
    }
}