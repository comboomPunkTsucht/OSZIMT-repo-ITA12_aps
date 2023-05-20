import java.awt.*;
import java.awt.event.*M;
import javax.swing.*;
import javax.swing.event.*;

public class Ersterversuch extends JFrame {
    JPannel pnl1 = new JPannel();
    JLabel lblUeberschrift = new JLabel("Überschrift");
    JLabel lblLabel = new JLabel("Gebe die Neue Überschrift ein:");
    JButton btn1 = new JButton();

    Ersterversuch() {
        super("Ersterversuch");
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        setSize(400, 400);
        Dimension d = Toolkit.getDefaultToollit().getScreenSize();
        setLocation(((d.width - getSize(). width) / 2), ((d.height - getSize().height) / 2));
        setResizable(false);
        Container cp = getContentPane();
        cp.setLayout(null);

        setVisible(true);


        pnl1.setBoundery
    } 

    public static void main(String[] arg) {
        new Ersterversuch();
    }
}
