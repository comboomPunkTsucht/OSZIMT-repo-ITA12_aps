import greenfoot.*; // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse Player2.
 *
 * @author (Ihr Name)
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Player2 extends Player1 {

  private int verticalspeed = 0;

  Player2() {}

  /**
   * Act - tut, was auch immer Player2 tun will. Diese Methode wird aufgerufen,
   * sobald der 'Act' oder 'Run' Button in der Umgebung angeklickt werden.
   */
  public void act() {
    movement();
    checkFalling();
    addPoints();
  }

  public void movement() {
    if (Greenfoot.isKeyDown("Up") && verticalspeed == 0 && !underGameborder()) {
            setLocation(getX(), (getY() - 55));
        }
    if (Greenfoot.isKeyDown("Right") && !gameborderIsSideR()) {
             setLocation((getX() + 5), getY());
    } else if (Greenfoot.isKeyDown("Left") && !gameborderIsSideL()) {
             setLocation((getX() - 5), getY());
        }
  }

  public void falling() {
    setLocation(getX(), (getY() + verticalspeed));
    verticalspeed += 1;
  }

  public boolean onGround() {
    Actor ground = getOneObjectAtOffset(
      0,getImage().getHeight() / 2,GameBorder.class
    );
    return ground != null;
  }
  
  public boolean underGameborder() {
    Actor ground = getOneObjectAtOffset(
      0,
      (getImage().getHeight() / 2) + getImage().getHeight(),
      GameBorder.class
    );
    return ground != null;
  }
  
  public boolean gameborderIsSideR() {
    Actor ground = getOneObjectAtOffset(25,0,GameBorder.class);
    return ground != null;
  }
  public boolean gameborderIsSideL() {
    Actor ground = getOneObjectAtOffset(-25,0,GameBorder.class);
    return ground != null;
  }

  public void checkFalling() {
    if ((this.onGround() == true || this.getY() >= 685) && this.getY() >= 50) {
      verticalspeed = 0;
    } else {
      this.falling();
    }
  }
  
          public void addPoints() {
    if (this.isTouching(CodeSnipets.class)) {
        Level1.z1.points++;
        this.removeTouching(CodeSnipets.class);
    }
}
}
