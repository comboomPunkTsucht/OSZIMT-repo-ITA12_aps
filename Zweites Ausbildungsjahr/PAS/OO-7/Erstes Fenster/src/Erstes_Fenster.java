import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import javax.swing.JLabel;
import java.awt.FlowLayout;

public class Erstes_Fenster {

	private JFrame ErstesFenster;
	private JPanel pnlHintergrund;
	private JLabel lblWas;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Erstes_Fenster window = new Erstes_Fenster();
					window.ErstesFenster.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Erstes_Fenster() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		ErstesFenster = new JFrame();
		ErstesFenster.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		ErstesFenster.setTitle("Erstes Fenster");
		ErstesFenster.setName("ErstesFenster");
		ErstesFenster.setBounds(100, 100, 300, 300);
		ErstesFenster.getContentPane().add(getPnlHintergrund(), BorderLayout.CENTER);
	}

	private JPanel getPnlHintergrund() {
		if (pnlHintergrund == null) {
			pnlHintergrund = new JPanel();
			pnlHintergrund.setName("pnlHintergrund");
			pnlHintergrund.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));
			pnlHintergrund.add(getLblWas());
		}
		return pnlHintergrund;
	}

	private JLabel getLblWas() {
		if (lblWas == null) {
			lblWas = new JLabel("Label: Hier bin ich");
			lblWas.setName("");
		}
		return lblWas;
	}
}
