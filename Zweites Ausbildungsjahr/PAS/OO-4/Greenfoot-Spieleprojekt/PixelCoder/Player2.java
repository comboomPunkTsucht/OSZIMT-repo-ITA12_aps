import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Player2.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Player2 extends Player1
{
    Player2(){}
    /**
     * Act - tut, was auch immer Player2 tun will. Diese Methode wird aufgerufen, 
     * sobald der 'Act' oder 'Run' Button in der Umgebung angeklickt werden. 
     */
    public void act() 
    {
        this.movement();
    }
    public void movement() {
        if (Greenfoot.isKeyDown("Up")){
            setLocation(getX(), (getY() - 5));
            }else if (Greenfoot.isKeyDown("Right")){
                setLocation((getX() + 5), getY());
            }else if (Greenfoot.isKeyDown("Left")){
                setLocation((getX() - 5), getY());
            }else if (Greenfoot.isKeyDown("Right") && Greenfoot.isKeyDown("W")){
                setLocation((getX() + 5 ), (getY() - 5));
            }else if (Greenfoot.isKeyDown("Left") && Greenfoot.isKeyDown("W")){
                setLocation((getX() - 5 ), (getY() - 5));
            }else{setLocation(getX(), (getY() + 5));};
    }
}