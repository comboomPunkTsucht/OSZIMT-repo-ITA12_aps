import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Toolkit;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class UMWindow {

    private JFrame frmOszImtKickers;
    private JPanel panel;
    private String nameOfUser;
    private JLabel lblNewLabel;
    ImageIcon icon = new ImageIcon("icon.png");

    /**
     * Create the application.
     */
    public UMWindow(String name) {
	this.nameOfUser = name;
	initialize();
    }

    /**
     * Initialize the contents of the frame.
     */
    private void initialize() {
	frmOszImtKickers = new JFrame();
	frmOszImtKickers.setIconImage(Toolkit.getDefaultToolkit().getImage("icon.png"));
	frmOszImtKickers.setTitle("OSZ IMT Kickers - User Management");
	frmOszImtKickers.setBounds(100, 100, 450, 102);
	frmOszImtKickers.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	frmOszImtKickers.getContentPane().setLayout(null);
	frmOszImtKickers.getContentPane().add(getPanel());
	frmOszImtKickers.setVisible(true);
    }

    private JPanel getPanel() {
	if (panel == null) {
	    panel = new JPanel();
	    panel.setBounds(0, 0, 450, 74);
	    panel.setName("panel");
	    panel.setLayout(new GridLayout(1, 1));
	    panel.add(getLblNewLabel());
	}
	return panel;
    }

    private JLabel getLblNewLabel() {
	if (lblNewLabel == null) {
	    lblNewLabel = new JLabel("Hallo, " + nameOfUser);
	    lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
	    lblNewLabel.setFont(new Font("Arial", Font.PLAIN, 20));
	    lblNewLabel.setName("lblNewLabel");
	    lblNewLabel.setIcon(icon);
	}
	return lblNewLabel;
    }
}
