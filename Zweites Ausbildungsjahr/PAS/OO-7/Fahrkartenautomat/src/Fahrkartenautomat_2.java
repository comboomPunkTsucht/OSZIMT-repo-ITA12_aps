
/*
* Basiselemente einer GUI
* Fenster mit Label, Textbox, Button
* und einem einfachen Layout
*/
import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

public class Fahrkartenautomat_2 extends JFrame {

    // Panel
    private JPanel pnlInhalt;

    // Label f�r die �berschrift
    /* TODO!! */
    private JLabel lbl_Tickets_waehlen;

    // Textfeld f�r die Ausgabe
    /* TODO!! */
    private JTextField tfd_TextFieldUp;
    private JTextField tfd_TextFieldDown;

    // Buttons f�r die Tickets
    /* TODO!! */
    private JButton btn_Kurz;
    private JButton btn_AB;
    private JButton btn_ABC;
    private JButton btn_Bezahlen;
    private JButton btn_neuer_Kauf;
    private JButton btn_Fahrad_AB;
    private JButton btn_Fahrad_ABC;
    private JButton btn_4_AB;
    private JButton btn_4_ABC;

    // Speicher f�r den Betrag
    private double zuBezahlen;
    private int anzahl_Tickets;

    public Fahrkartenautomat_2() {
	// Fenstertitel setzen
	super("Ticketautomat v2");
	// Default Close Operation
	this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);

	// Panel erzeugen, Layout setzen
	this.pnlInhalt = new JPanel();
	GridLayout gl = new GridLayout(12, 1);
	this.pnlInhalt.setLayout(gl);

	// GUI-Elemente erzeugen
	/* TODO!! */
	lbl_Tickets_waehlen = new JLabel("Ticket wählen");
	tfd_TextFieldUp = new JTextField("");
	btn_Kurz = new JButton("Kurzstäcke");
	btn_AB = new JButton("Berlin AB");
	btn_ABC = new JButton("Berlin ABC");
	btn_Fahrad_AB = new JButton("Fahrad Berlin AB");
	btn_Fahrad_ABC = new JButton("Fahrad Berlin ABC");
	btn_4_AB = new JButton("4-Farten Berlin AB");
	btn_4_ABC = new JButton("4-Farten Berlin ABC");
	btn_Bezahlen = new JButton("Bezahlen");
	tfd_TextFieldDown = new JTextField("");
	btn_neuer_Kauf = new JButton("neuer Kauf");

	lbl_Tickets_waehlen.setFont(new Font("Arial", Font.BOLD, 48));
	lbl_Tickets_waehlen.setHorizontalAlignment(SwingConstants.CENTER);
	lbl_Tickets_waehlen.setBackground(Color.YELLOW);
	lbl_Tickets_waehlen.setOpaque(true);

	tfd_TextFieldUp.setEditable(false);
	tfd_TextFieldUp.setOpaque(true);
	tfd_TextFieldDown.setEditable(false);
	tfd_TextFieldDown.setOpaque(true);

	btn_Kurz.setOpaque(true);
	btn_AB.setOpaque(true);
	btn_ABC.setOpaque(true);
	btn_Fahrad_ABC.setOpaque(true);
	btn_Fahrad_AB.setOpaque(true);
	btn_4_ABC.setOpaque(true);
	btn_4_AB.setOpaque(true);
	btn_Bezahlen.setBackground(Color.GREEN);
	btn_Bezahlen.setOpaque(true);
	btn_Bezahlen.setEnabled(false);
	btn_neuer_Kauf.setBackground(Color.RED);
	btn_neuer_Kauf.setOpaque(true);
	btn_neuer_Kauf.setEnabled(false);

	pnlInhalt.add(lbl_Tickets_waehlen);
	pnlInhalt.add(tfd_TextFieldUp);
	pnlInhalt.add(lbl_Tickets_waehlen);
	pnlInhalt.add(btn_Kurz);
	pnlInhalt.add(btn_AB);
	pnlInhalt.add(btn_ABC);
	pnlInhalt.add(btn_Fahrad_AB);
	pnlInhalt.add(btn_Fahrad_ABC);
	pnlInhalt.add(btn_4_AB);
	pnlInhalt.add(btn_4_ABC);
	pnlInhalt.add(btn_Bezahlen);
	pnlInhalt.add(tfd_TextFieldDown);
	pnlInhalt.add(btn_neuer_Kauf);

	// Action Listener setzen
	/* TODO!! */
	btn_Kurz.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(2.2);
	    }
	});
	btn_AB.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(3.2);
	    }
	});
	btn_ABC.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(4);
	    }
	});
	btn_Fahrad_AB.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(2.2);
	    }
	});
	btn_Fahrad_ABC.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(2.8);
	    }
	});
	btn_4_AB.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(10.0);
	    }
	});
	btn_4_ABC.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		kaufeTicket(14.4);
	    }
	});
	btn_Bezahlen.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		bezahleAlles();
	    }
	});
	btn_neuer_Kauf.addActionListener(new ActionListener() {
	    @Override
	    public void actionPerformed(ActionEvent e) {
		neuer_Kauf();
	    }
	});

	// Panel zum Fenster hinzuf�gen
	this.setContentPane(pnlInhalt);
	this.pack();
	this.setSize(getMaximumSize());
	this.setAlwaysOnTop(true);
	this.setVisible(true);
	this.setResizable(false);
    }

    public void kaufeTicket(double preis) {
	this.zuBezahlen += preis;
	anzahl_Tickets++;
	this.zuBezahlen = zuBezahlen * 100 / 100;
	// Textfeld aktualisieren
	/* TODO!! */
	tfd_TextFieldUp.setText(this.zuBezahlen + " €");
	btn_neuer_Kauf.setEnabled(true);
	btn_Bezahlen.setEnabled(true);
    }

    public void bezahleAlles() {
	// Textfeld aktualisieren
	/* TODO!! */
	if (anzahl_Tickets > 0 && zuBezahlen > 0) {
	    tfd_TextFieldUp.setText("bezahlt: " + zuBezahlen + " €");
	    tfd_TextFieldDown.setText("gedruckt: " + anzahl_Tickets + " Tickets");
	    btn_Bezahlen.setEnabled(false);
	}
    }

    /**
     * 
     */
    public void neuer_Kauf() {
	if (anzahl_Tickets > 0 && zuBezahlen > 0) {
	    this.zuBezahlen = 0;
	    this.anzahl_Tickets = 0;
	    // Textfeld aktualisieren
	    /* TODO!! */
	    tfd_TextFieldUp.setText("");
	    tfd_TextFieldDown.setText("");
	    btn_neuer_Kauf.setEnabled(false);
	    btn_Bezahlen.setEnabled(false);
	}
    }

    public static void main(String[] args) {
	new Fahrkartenautomat_2();
    }
}
