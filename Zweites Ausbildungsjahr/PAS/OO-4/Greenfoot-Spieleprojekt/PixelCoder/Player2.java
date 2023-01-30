import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Player2.
 * 
 * @author (Ihr Name) 
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Player2 extends Player1
{
    private boolean haspressed = false;
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
        if (Greenfoot.isKeyDown("Up") && this.haspressed != true){
            setLocation(getX(), (getY() - 10));
            this.haspressed = true;
            }else if (Greenfoot.isKeyDown("Right")){
                setLocation((getX() + 5), getY());
                
            }else if (Greenfoot.isKeyDown("Left")){
                setLocation((getX() - 5), getY());
                
            }else if (Greenfoot.isKeyDown("Right") && Greenfoot.isKeyDown("W") && this.haspressed != true){
                setLocation((getX() + 5 ), (getY() - 10));
                this.haspressed = true;
            }else if (Greenfoot.isKeyDown("Left") && Greenfoot.isKeyDown("W") && this.haspressed != true){
                setLocation((getX() - 5 ), (getY() - 10));
                this.haspressed = true;
            }else if (!(Greenfoot.isKeyDown("Up"))){setLocation(getX(), (getY() + 1)); this.haspressed = false; };
    }
}