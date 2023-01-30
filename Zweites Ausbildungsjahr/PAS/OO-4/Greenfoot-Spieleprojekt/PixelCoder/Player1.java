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
        boolean haspressed = false;
        this.movement(haspressed);
    }
    public void movement(boolean haspressed) {
        if (Greenfoot.isKeyDown("W") && this.haspressed != true){
            setLocation(getX(), (getY() - 10));
            this.haspressed = true;
            }else if (Greenfoot.isKeyDown("D")){
                setLocation((getX() + 5), getY());
            }else if (Greenfoot.isKeyDown("A")){
                setLocation((getX() - 5), getY());
            }else if (Greenfoot.isKeyDown("D") && Greenfoot.isKeyDown("W") && this.haspressed != true){
                setLocation((getX() + 5 ), (getY() - 10));
                this.haspressed = true;
            }else if (Greenfoot.isKeyDown("A") && Greenfoot.isKeyDown("W") && this.haspressed != true){
                setLocation((getX() - 5 ), (getY() - 10));
                this.haspressed = true;
            }else if (!(Greenfoot.isKeyDown("W"))){setLocation(getX(), (getY() + 1)); haspressed = false;};
    }
}
