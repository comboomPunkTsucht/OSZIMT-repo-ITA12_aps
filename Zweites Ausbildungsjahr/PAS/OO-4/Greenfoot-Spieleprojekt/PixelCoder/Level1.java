import greenfoot.*; // (World, Actor, GreenfootImage, Greenfoot und MouseInfo)

/**
 * Ergänzen Sie hier eine Beschreibung für die Klasse MyWorld.
 *
 * @author (Ihr Name)
 * @version (eine Versionsnummer oder ein Datum)
 */
public class Level1 extends World {

  static Ziel z1 = new Ziel();
  int numberofC = 6;
  int numberofG = 100;
  /**
   * Konstruktor für Objekte der Klasse MyWorld
   *
   */

  public Level1() {
    // Erstellt eine neue Welt mit 600x400 Zellen und einer Zell-Größe von 1x1 Pixeln.
    super(1280, 720, 1);
    Player1 p1 = new Player1();
    Player2 p2 = new Player2();
    GameBorder[] g1 = new GameBorder[numberofG];
    CodeSnipets[] c1 = new CodeSnipets[numberofC];
    for (int i = 0; i < numberofG; i++) {
      g1[i] = new GameBorder();
    }

    for (int i = 0; i < numberofC; i++) {
      c1[i] = new CodeSnipets();
    }
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
    addObject(g1[16], 865, 649);
    addObject(g1[17], 915, 697);
    addObject(g1[18], 765, 649);
    addObject(g1[19], 765, 600);
    addObject(g1[20], 765, 697);
    addObject(g1[21], 665, 452);
    addObject(g1[22], 665, 353);
    addObject(g1[23], 665, 254);
    addObject(g1[24], 665, 155);
    addObject(c1[0], 665, 50);
    addObject(g1[25], 715, 353);
    addObject(g1[26], 765, 353);
    addObject(g1[27], 815, 353);
    addObject(g1[28], 815, 353);

    addObject(p1, 315, 360);
    addObject(p2, 955, 360);
  }

  public void addZiel() {
    if (z1.points == numberofC) {
      addObject(z1, 615, 700);
    }
  }

  public void act() {
    addZiel();
  }
}
