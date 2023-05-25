import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Toolkit;
import java.awt.Window.Type;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

public class LoginWindow {

    private JFrame frame;
    private JPanel panel;
    private JLabel lbl_Username;
    private JLabel lbl_PWD;
    private JTextField tfd_Username;
    private JPasswordField tfd_Pwd;
    private JButton btn_reset;
    private JButton btn_Login;
    private UserManagement userManagement = new UserManagement();
    ImageIcon icon = new ImageIcon("icon.png");

    /**
     * Launch the application.
     */
    public static void main(String[] args) {
	EventQueue.invokeLater(new Runnable() {
	    @Override
	    public void run() {
		try {
		    LoginWindow window = new LoginWindow();
		    window.frame.setVisible(true);
		} catch (Exception e) {
		    e.printStackTrace();
		}
	    }
	});
    }

    /**
     * Create the application.
     */
    public LoginWindow() {
	initialize();
    }

    /**
     * Initialize the contents of the frame.
     */
    private void initialize() {
	frame = new JFrame();
	frame.setIconImage(Toolkit.getDefaultToolkit().getImage("icon.png"));
	frame.setAlwaysOnTop(true);
	frame.setResizable(false);
	frame.setTitle("LogIn - OSZ IMT Kickers");
	frame.setName("frame");
	frame.setType(Type.POPUP);
	frame.setBounds(100, 100, 450, 173);
	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	frame.getContentPane().setLayout(null);
	frame.getContentPane().add(getPanel());
    }

    private JPanel getPanel() {
	if (panel == null) {
	    panel = new JPanel();
	    panel.setBounds(0, 0, 450, 144);
	    panel.setName("panel");
	    panel.setLayout(null);
	    panel.add(getLbl_Username());
	    panel.add(getLbl_PWD());
	    panel.add(getTfd_Username());
	    panel.add(getTfd_Pwd());
	    panel.add(getBtn_reset());
	    panel.add(getBtn_Login());
	}
	return panel;
    }

    private JLabel getLbl_Username() {
	if (lbl_Username == null) {
	    lbl_Username = new JLabel("usernme:");
	    lbl_Username.setFont(new Font("Arial", Font.PLAIN, 13));
	    lbl_Username.setBounds(23, 19, 61, 16);
	}
	return lbl_Username;
    }

    private JLabel getLbl_PWD() {
	if (lbl_PWD == null) {
	    lbl_PWD = new JLabel("password:");
	    lbl_PWD.setFont(new Font("Arial", Font.PLAIN, 13));
	    lbl_PWD.setBounds(23, 64, 70, 16);
	}
	return lbl_PWD;
    }

    private JTextField getTfd_Username() {
	if (tfd_Username == null) {
	    tfd_Username = new JTextField();
	    tfd_Username.setName("tfd_Username");
	    tfd_Username.setFont(new Font("Arial", Font.PLAIN, 13));
	    tfd_Username.setBounds(96, 19, 301, 26);
	    tfd_Username.setColumns(10);
	}
	return tfd_Username;
    }

    private JPasswordField getTfd_Pwd() {
	if (tfd_Pwd == null) {
	    tfd_Pwd = new JPasswordField();
	    tfd_Pwd.setName("tfd_Pwd");
	    tfd_Pwd.setFont(new Font("Arial", Font.BOLD, 18));
	    tfd_Pwd.setEchoChar('*');
	    tfd_Pwd.setBounds(96, 57, 301, 26);
	}
	return tfd_Pwd;
    }

    private JButton getBtn_reset() {
	if (btn_reset == null) {
	    btn_reset = new JButton("Restet Input");
	    btn_reset.setFont(new Font("Arial", Font.PLAIN, 13));
	    btn_reset.setBounds(23, 92, 117, 29);
	    btn_reset.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
		    // TODO Auto-generated method stub
		    tfd_Username.setText("");
		    tfd_Pwd.setText("");
		}
	    });
	}
	return btn_reset;
    }

    private JButton getBtn_Login() {
	if (btn_Login == null) {
	    btn_Login = new JButton("Login");
	    btn_Login.setFont(new Font("Arial", Font.PLAIN, 13));
	    btn_Login.setBounds(280, 95, 117, 29);
	    btn_Login.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
		    // TODO Auto-generated method stub
		    if (userManagement.exist(tfd_Username.getText(), String.valueOf(tfd_Pwd.getPassword())) == true) {
			frame.dispose();
			JOptionPane.showOptionDialog(null, "Login in ........", "Login Sucsesfull",
				JOptionPane.CLOSED_OPTION, JOptionPane.INFORMATION_MESSAGE, icon, null, 0);
			new UMWindow(tfd_Username.getText());

		    } else {
			JOptionPane.showOptionDialog(null, "username or passwor are wrong", "Login unsucsesfull",
				JOptionPane.CLOSED_OPTION, JOptionPane.ERROR_MESSAGE, null, null, 0);
		    }
		}
	    });
	}
	return btn_Login;
    }
}
