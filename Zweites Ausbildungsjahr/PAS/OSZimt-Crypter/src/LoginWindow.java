import javax.swing.JFrame;
import java.awt.BorderLayout;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JPasswordField;

public class LoginWindow extends JFrame {

	private JTextField tfdUsername;
	private JPasswordField tfdPassword;
	private UserManagement um = new UserManagement();

	public static void main(String[] args) {
		new LoginWindow();
	}

	public LoginWindow() {
		initialize();
	}

	private void initialize() {
		this.setResizable(false);
		this.setTitle("Login for OSZimt-Crypter");
		this.setBounds(100, 100, 450, 150);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.getContentPane().setLayout(new BorderLayout(0, 0));

		JPanel pnlMain = new JPanel();
		this.getContentPane().add(pnlMain, BorderLayout.CENTER);
		pnlMain.setLayout(new BorderLayout(0, 0));

		JPanel pnlbutton = new JPanel();
		pnlMain.add(pnlbutton, BorderLayout.SOUTH);

		JButton btnReset = new JButton("Reset");
		pnlbutton.add(btnReset);

		JButton btnLogin = new JButton("Login");
		pnlbutton.add(btnLogin);

		JButton btnRegister = new JButton("Register");
		pnlbutton.add(btnRegister);

		JPanel pnlTextfields = new JPanel();
		pnlMain.add(pnlTextfields, BorderLayout.CENTER);
		pnlTextfields.setLayout(new GridLayout(2, 1));

		JPanel pnlUser = new JPanel();
		pnlTextfields.add(pnlUser);
		pnlUser.setLayout(new BorderLayout(0, 0));

		JLabel lblUsername = new JLabel("username:");
		pnlUser.add(lblUsername, BorderLayout.WEST);

		tfdUsername = new JTextField();
		pnlUser.add(tfdUsername, BorderLayout.CENTER);
		tfdUsername.setColumns(10);

		JPanel pnlPassord = new JPanel();
		pnlTextfields.add(pnlPassord);
		pnlPassord.setLayout(new BorderLayout(0, 0));

		JLabel lblPassword = new JLabel("password:");
		pnlPassord.add(lblPassword, BorderLayout.WEST);

		tfdPassword = new JPasswordField();
		pnlPassord.add(tfdPassword, BorderLayout.CENTER);

		JPanel pnlLabel = new JPanel();
		pnlMain.add(pnlLabel, BorderLayout.NORTH);

		JLabel lblWindowText = new JLabel("Login for OSZimt-Crypter");
		pnlLabel.add(lblWindowText);

		btnReset.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				tfdUsername.setText("");
				tfdPassword.setText("");
			}
		});

		btnLogin.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String username = tfdUsername.getText();
				String password = String.valueOf(tfdPassword.getPassword());
				if (um.userExists(username, password)) {
					new CipherWindow(password, username);
					dispose();
				} else {
					JOptionPane.showOptionDialog(null, "username or password are wrong", "Login unsuccessful",
							JOptionPane.CLOSED_OPTION, JOptionPane.ERROR_MESSAGE, null, null, 0);
				}
			}
		});

		btnRegister.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				dispose();
				new RegisterWindow();
			}
		});

		this.setVisible(true);
	}
}
