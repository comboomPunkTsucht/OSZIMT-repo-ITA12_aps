import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import javax.swing.JLabel;
import java.awt.Font;
import java.awt.Window.Type;
import javax.swing.JButton;
import javax.swing.SwingConstants;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JTextField;

public class Form_aendern {

	private JFrame frmFormaendern;
	private JPanel panel;
	private JLabel lblNewLabel;
	private JLabel lblNewLabel_1;
	private JButton btnNewButton;
	private JButton btnNewButton_1;
	private JButton btnNewButton_2;
	private JButton btnNewButton_3;
	private JButton btnNewButton_4;
	private JButton btnNewButton_5;
	private JLabel lblNewLabel_2;
	private JButton btnNewButton_6;
	private JButton btnNewButton_7;
	private JButton btnNewButton_8;
	private JTextField txtHierBitteText;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Form_aendern window = new Form_aendern();
					window.frmFormaendern.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Form_aendern() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frmFormaendern = new JFrame();
		frmFormaendern.getContentPane().setFont(new Font(".AppleSystemUIFont", Font.PLAIN, 13));
		frmFormaendern.setFont(new Font(".AppleSystemUIFont", Font.PLAIN, 12));
		frmFormaendern.setType(Type.UTILITY);
		frmFormaendern.setTitle("Form_aendern");
		frmFormaendern.setName("frmFormaendern");
		frmFormaendern.setBounds(100, 100, 400, 900);
		frmFormaendern.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		frmFormaendern.getContentPane().add(getPanel(), BorderLayout.CENTER);
	}

	private JPanel getPanel() {
		if (panel == null) {
			panel = new JPanel();
			panel.setName("panel");
			panel.setLayout(null);
			panel.add(getLblNewLabel());
			panel.add(getLblNewLabel_1());
			panel.add(getBtnNewButton());
			panel.add(getBtnNewButton_1());
			panel.add(getBtnNewButton_2());
			panel.add(getBtnNewButton_3());
			panel.add(getBtnNewButton_4());
			panel.add(getBtnNewButton_5());
			panel.add(getLblNewLabel_2());
			panel.add(getBtnNewButton_6());
			panel.add(getBtnNewButton_7());
			panel.add(getBtnNewButton_8());
			panel.add(getTxtHierBitteText());
		}
		return panel;
	}
	private JLabel getLblNewLabel() {
		if (lblNewLabel == null) {
			lblNewLabel = new JLabel("Dieser Text soll verändert Werden");
			lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
			lblNewLabel.setBounds(6, 6, 388, 30);
			lblNewLabel.setFont(new Font("Arial", Font.PLAIN, 20));
			lblNewLabel.setName("lblNewLabel");
		}
		return lblNewLabel;
	}
	private JLabel getLblNewLabel_1() {
		if (lblNewLabel_1 == null) {
			lblNewLabel_1 = new JLabel("Aufgabe 1 : Hintergrundfarbe ändern");
			lblNewLabel_1.setFont(new Font("Arial", Font.PLAIN, 13));
			lblNewLabel_1.setBounds(6, 48, 388, 16);
			lblNewLabel_1.setName("lblNewLabel_1");
		}
		return lblNewLabel_1;
	}
	private JButton getBtnNewButton() {
		if (btnNewButton == null) {
			btnNewButton = new JButton("ROT");
			btnNewButton.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton.setBounds(6, 67, 117, 29);
			btnNewButton.setName("btnNewButton");
		}
		return btnNewButton;
	}
	private JButton getBtnNewButton_1() {
		if (btnNewButton_1 == null) {
			btnNewButton_1 = new JButton("GRÜN");
			btnNewButton_1.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_1.setBounds(126, 67, 126, 29);
			btnNewButton_1.setName("btnNewButton_1");
		}
		return btnNewButton_1;
	}
	private JButton getBtnNewButton_2() {
		if (btnNewButton_2 == null) {
			btnNewButton_2 = new JButton("BLAU");
			btnNewButton_2.addActionListener(new BtnNewButton_2ActionListener());
			btnNewButton_2.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_2.setBounds(253, 67, 117, 29);
			btnNewButton_2.setName("btnNewButton_2");
		}
		return btnNewButton_2;
	}
	private JButton getBtnNewButton_3() {
		if (btnNewButton_3 == null) {
			btnNewButton_3 = new JButton("GELB");
			btnNewButton_3.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_3.setBounds(6, 108, 117, 29);
			btnNewButton_3.setName("btnNewButton_3");
		}
		return btnNewButton_3;
	}
	private JButton getBtnNewButton_4() {
		if (btnNewButton_4 == null) {
			btnNewButton_4 = new JButton("STANDARDFARBE");
			btnNewButton_4.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_4.setBounds(126, 108, 126, 29);
			btnNewButton_4.setName("btnNewButton_4");
		}
		return btnNewButton_4;
	}
	private JButton getBtnNewButton_5() {
		if (btnNewButton_5 == null) {
			btnNewButton_5 = new JButton("FARBE WÄHLEN");
			btnNewButton_5.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_5.setBounds(253, 107, 117, 29);
			btnNewButton_5.setName("btnNewButton_5");
		}
		return btnNewButton_5;
	}
	private JLabel getLblNewLabel_2() {
		if (lblNewLabel_2 == null) {
			lblNewLabel_2 = new JLabel("Aufgabe 2: Text formatieren");
			lblNewLabel_2.setFont(new Font("Arial", Font.PLAIN, 13));
			lblNewLabel_2.setBounds(6, 149, 388, 16);
			lblNewLabel_2.setName("lblNewLabel_2");
		}
		return lblNewLabel_2;
	}
	private class BtnNewButton_2ActionListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
		}
	}
	private JButton getBtnNewButton_6() {
		if (btnNewButton_6 == null) {
			btnNewButton_6 = new JButton("MS ARIAL");
			btnNewButton_6.setFont(new Font("Arial", Font.PLAIN, 11));
			btnNewButton_6.setBounds(6, 177, 117, 29);
			btnNewButton_6.setName("btnNewButton_6");
		}
		return btnNewButton_6;
	}
	private JButton getBtnNewButton_7() {
		if (btnNewButton_7 == null) {
			btnNewButton_7 = new JButton("COMIC SANS MS");
			btnNewButton_7.setFont(new Font("Comic Sans MS", Font.PLAIN, 11));
			btnNewButton_7.setBounds(126, 176, 126, 29);
			btnNewButton_7.setName("btnNewButton_7");
		}
		return btnNewButton_7;
	}
	private JButton getBtnNewButton_8() {
		if (btnNewButton_8 == null) {
			btnNewButton_8 = new JButton("MS COURIER NEW");
			btnNewButton_8.setFont(new Font("Courier New", Font.PLAIN, 11));
			btnNewButton_8.setBounds(253, 177, 126, 29);
			btnNewButton_8.setName("btnNewButton_8");
		}
		return btnNewButton_8;
	}
	private JTextField getTxtHierBitteText() {
		if (txtHierBitteText == null) {
			txtHierBitteText = new JTextField();
			txtHierBitteText.setFont(new Font("Arial", Font.PLAIN, 11));
			txtHierBitteText.setText("Hier bitte Text eingeben");
			txtHierBitteText.setBounds(16, 218, 378, 26);
			txtHierBitteText.setName("tfdHierBitteText");
			txtHierBitteText.setColumns(10);
		}
		return txtHierBitteText;
	}
}
