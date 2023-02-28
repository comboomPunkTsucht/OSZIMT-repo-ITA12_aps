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
    addObject(g1[28], 865, 353);
    addObject(c1[1], 915, 353);
    addObject(g1[29], 965, 353);
    addObject(g1[30], 1015, 303);
    addObject(g1[31], 1065, 253);
    addObject(g1[32], 1115, 203);
    addObject(g1[33], 1165, 153);
    addObject(g1[34], 1215, 103);
    addObject(g1[35], 1265, 53);
    addObject(c1[2], 1265, 3);
    addObject(g1[36], 565, 697);
    addObject(g1[37], 565, 601);
    addObject(g1[38], 565, 502);
    addObject(g1[39], 565, 403);
    addObject(g1[40], 565, 304);
    addObject(g1[41], 565, 205);
    addObject(g1[42], 565, 106);
    addObject(g1[43], 515, 100);
    addObject(g1[44], 465, 100);
    addObject(g1[45], 415, 100);
    addObject(g1[46], 365, 100);
    addObject(g1[47], 315, 100);
    addObject(g1[48], 265, 100);
    addObject(g1[49], 215, 100);
    addObject(g1[50], 165, 100);
    addObject(g1[51], 115, 100);
    addObject(g1[52], 65, 100);
    addObject(c1[3], 15, 100);
    addObject(g1[53], 65, 150);
    addObject(g1[54], 65, 200);
    addObject(g1[55], 65, 250);
    addObject(g1[56], 65, 300);
    addObject(g1[57], 65, 350);
    addObject(g1[58], 65, 400);
    addObject(g1[59], 65, 450);
    addObject(g1[60], 65, 500);
    addObject(g1[61], 65, 550);
    addObject(g1[62], 65, 600);
    addObject(g1[63], 65, 650);
    addObject(c1[4], 115, 200);
    addObject(g1[64], 165, 300);
    addObject(g1[65], 215, 250);
    addObject(g1[66], 265, 300);
    addObject(g1[67], 315, 300);
    addObject(g1[68], 365, 300);
    addObject(g1[69], 415, 300);
    addObject(g1[70], 465, 300);
    addObject(g1[71], 515, 300);
    addObject(g1[72], 215, 300);
    addObject(g1[73], 115, 300);
    addObject(g1[74], 115, 250);
    addObject(g1[75], 165, 250);
    addObject(c1[5], 115, 400);
    addObject(g1[76], 115, 450);
    addObject(g1[77], 165, 450);
    addObject(g1[78], 215, 500);
    addObject(g1[79], 265, 550);
    addObject(g1[80], 315, 600);
    addObject(g1[81], 365, 650);
    
    addObject(p1, 315, 690);
    addObject(p2, 955, 690);
  }

  public void addZiel() {
    if (z1.points == numberofC) {
      addObject(z1, 615, 700);
    }
  }

  public void act() {
    addZiel();
    showText("Code-Snippets: " + z1.points + "/" + numberofC, 120, 15);
  }
}
