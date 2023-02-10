import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse MyWorld.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Level1 extends World
{

    /**
     * Konstruktor für Objekte der Klasse MyWorld
     * 
     */
    public Ziel z1 = new Ziel();
    public Level1()
    {    
        // Erstellt eine neue Welt mit 600x400 Zellen und einer Zell-Größe von 1x1 Pixeln.
        super(1280, 720, 1); 
        
        Player1 p1 = new Player1();
        Player2 p2 = new Player2();
        int numberofG = 100;
        GameBorder [] g1 = new GameBorder[numberofG];
        for (int i = 0; i < numberofG; i++){
            g1[i] = new GameBorder();
        }
        Ziel z1 = new Ziel();
        addObject(g1[0], 615, 0);
        addObject(g1[1], 615, 50);
        addObject(g1[2], 615, 100);
        addObject(g1[3], 615, 150);
        addObject(g1[4], 615, 200);
        addObject(g1[5], 615, 250);
        addObject(g1[6], 615, 300);
        addObject(g1[7], 615, 350);
        addObject(g1[8], 615, 400);
        addObject(g1[9], 615, 450);
        addObject(g1[10], 615, 500);
        addObject(g1[11], 615, 550);
        addObject(g1[12], 815, 600);
        addObject(g1[13], 665, 550);
        addObject(g1[14], 715, 550);
        addObject(g1[15], 765, 550);
        addObject(z1, 615, 700);
        
        
        addObject(p1, 315, 360);
        addObject(p2, 955, 360);
    }
}