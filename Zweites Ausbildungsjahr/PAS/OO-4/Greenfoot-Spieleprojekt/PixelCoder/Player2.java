import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Player2.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Player2 extends Player1
{
    private int x = 0;
    private int y = 0;
    Player2(){}
    Player2(int x, int y){
        this.x = x;
        this.y = y;
        setLocation(this.x, this.y);
    
    }
    /**
     * Act - tut, was auch immer Player2 tun will. Diese Methode wird aufgerufen, 
     * sobald der 'Act' oder 'Run' Button in der Umgebung angeklickt werden. 
     */
    public void act() 
    {
        this.movement();
    }
    public void movement() {
        if (Greenfoot.isKeyDown("W")){
            this.y = getY() - 5;
            setLocation(this.x, this.y);
        }
    }
}