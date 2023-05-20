/*
* Basiselemente einer GUI
* Fenster mit Label, Textbox, Button
* und einem einfachen Layout
*/
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.event.*;


public class Fahrkartenautomat extends JFrame {

  // Panel
  private JPanel pnlInhalt;
  
  // Label f�r die �berschrift
  /* TODO!! */
  private JLabel lbl_Tickets_waehlen;
  
  // Textfeld f�r die Ausgabe
  /* TODO!! */
  private JTextField tfd_TextField;
  
  // Buttons f�r die Tickets
  /* TODO!! */
  private JButton btn_Kurz;
  private JButton btn_AB;
  private JButton btn_ABC;
  private JButton btn_Bezahlen;
  
  // Speicher f�r den Betrag
  private double zuBezahlen;
    
  public Fahrkartenautomat() {
    // Fenstertitel setzen
    super("Ticketautomat");
    // Default Close Operation
    this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    
    // Panel erzeugen, Layout setzen
    this.pnlInhalt = new JPanel();    
    GridLayout gl = new GridLayout(6, 1);
    this.pnlInhalt.setLayout(gl);
    
    // GUI-Elemente erzeugen  
    /* TODO!! */
    lbl_Tickets_waehlen = new JLabel("Ticket wählen");
    tfd_TextField = new JTextField("");
    btn_Kurz = new JButton("Kurzstäcke");
    btn_AB = new JButton("Berlin AB");
    btn_ABC = new JButton("Berlin ABC");
    btn_Bezahlen = new JButton("Bezahlen");
    
    lbl_Tickets_waehlen.setFont(new Font("Arial", Font.BOLD, 48));
    lbl_Tickets_waehlen.setHorizontalAlignment(SwingConstants.CENTER);
    lbl_Tickets_waehlen.setBackground(Color.YELLOW);
    lbl_Tickets_waehlen.setOpaque(true);
    
    tfd_TextField.setEditable(false);
    tfd_TextField.setOpaque(true);
    
    
    btn_Kurz.setOpaque(true);
    btn_AB.setOpaque(true);
    btn_ABC.setOpaque(true);
    btn_Bezahlen.setBackground(Color.GREEN);
    btn_Bezahlen.setOpaque(true);
    
    pnlInhalt.add(lbl_Tickets_waehlen);
    pnlInhalt.add(tfd_TextField);
    pnlInhalt.add(lbl_Tickets_waehlen);
    pnlInhalt.add(btn_Kurz);
    pnlInhalt.add(btn_AB);
    pnlInhalt.add(btn_ABC);
    pnlInhalt.add(btn_Bezahlen);
    
   
    
    // Action Listener setzen
    /* TODO!! */
    btn_Kurz.addActionListener(
    	    new ActionListener() {
    	      public void actionPerformed(ActionEvent e) {
    	    	  kaufeTicket(2.2);
    	      }
    	    }
    	);
    btn_AB.addActionListener(
    	    new ActionListener() {
    	      public void actionPerformed(ActionEvent e) {
    	    	  kaufeTicket(3.2);
    	      }
    	    }
    	);
    btn_ABC.addActionListener(
    	    new ActionListener() {
    	      public void actionPerformed(ActionEvent e) {
    	    	  kaufeTicket(4);
    	      }
    	    }
    	);
    btn_Bezahlen.addActionListener(
    	    new ActionListener() {
    	      public void actionPerformed(ActionEvent e) {
    	    	  bezahleAlles();
    	      }
    	    }
    	);
    
    // Panel zum Fenster hinzuf�gen
    this.setContentPane(pnlInhalt);
    this.pack();
    this.setVisible(true);
  }
  
  public void kaufeTicket(double preis) {
    this.zuBezahlen += preis;
    // Textfeld aktualisieren
    /* TODO!! */
    this.zuBezahlen = (double)(zuBezahlen*100)/100;
    tfd_TextField.setText(this.zuBezahlen +" €");
  }
  
  public void bezahleAlles() {
    this.zuBezahlen = 0;
    // Textfeld aktualisieren
    /* TODO!! */
    tfd_TextField.setText("");
  }
  
  public static void main(String[] args) {
    new Fahrkartenautomat();
  }
}
