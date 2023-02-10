import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse GameMenu.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class GameMenu extends World
{

    /**
     * Konstruktor für Objekte der Klasse GameMenu
     * 
     */
    public GameMenu()
    {    
        // Erstellt eine neue Welt mit 600x400 Zellen und einer Zell-Größe von 1x1 Pixeln.
        super(1280, 720, 1);
        GameMenuChecker gmc1 = new GameMenuChecker();
        addObject(gmc1, 640, 360);
}
}