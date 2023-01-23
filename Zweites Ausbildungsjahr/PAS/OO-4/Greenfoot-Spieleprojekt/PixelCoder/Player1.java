import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Player1.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Player1 extends Actor   
{
    Player1(){}
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
            setLocation(getX(), (getY() - 5));
            }else if (Greenfoot.isKeyDown("D")){
                setLocation((getX() + 5), getY());
            }else if (Greenfoot.isKeyDown("A")){
                setLocation((getX() - 5), getY());
            }else if (Greenfoot.isKeyDown("D") && Greenfoot.isKeyDown("W")){
                setLocation((getX() + 5 ), (getY() - 5));
            }else if (Greenfoot.isKeyDown("A") && Greenfoot.isKeyDown("W")){
                setLocation((getX() - 5 ), (getY() - 5));
            }else{setLocation(getX(), (getY() + 5));};
    }
}
