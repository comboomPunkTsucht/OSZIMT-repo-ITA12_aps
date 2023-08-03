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

public class RegisterWindow extends JFrame {

    private JTextField tfdUsername;
    private JPasswordField tfdPassword;
    private UserManagement um = new UserManagement();

    public RegisterWindow() {
        initialize();
    }

    private void initialize() {
        this.setResizable(false);
        this.setTitle("Register for OSZimt-Crypter");
        this.setBounds(100, 100, 450, 150);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.getContentPane().setLayout(new BorderLayout(0, 0));

        JPanel pnlMain = new JPanel();
        this.getContentPane().add(pnlMain, BorderLayout.CENTER);
        pnlMain.setLayout(new BorderLayout(0, 0));

        JPanel pnlButton = new JPanel();
        pnlMain.add(pnlButton, BorderLayout.SOUTH);

        JButton btnRegister = new JButton("Register");
        pnlButton.add(btnRegister);

        JButton btnCancel = new JButton("Cancel");
        pnlButton.add(btnCancel);

        JPanel pnlTextFields = new JPanel();
        pnlMain.add(pnlTextFields, BorderLayout.CENTER);
        pnlTextFields.setLayout(new GridLayout(2, 1));

        JPanel pnlUser = new JPanel();
        pnlTextFields.add(pnlUser);
        pnlUser.setLayout(new BorderLayout(0, 0));

        JLabel lblUsername = new JLabel("Username:");
        pnlUser.add(lblUsername, BorderLayout.WEST);

        tfdUsername = new JTextField();
        pnlUser.add(tfdUsername, BorderLayout.CENTER);
        tfdUsername.setColumns(10);

        JPanel pnlPassword = new JPanel();
        pnlTextFields.add(pnlPassword);
        pnlPassword.setLayout(new BorderLayout(0, 0));

        JLabel lblPassword = new JLabel("Password:");
        pnlPassword.add(lblPassword, BorderLayout.WEST);

        tfdPassword = new JPasswordField();
        pnlPassword.add(tfdPassword, BorderLayout.CENTER);

        btnRegister.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String username = tfdUsername.getText();
                String password = String.valueOf(tfdPassword.getPassword());

                if (username.isEmpty() || password.isEmpty()) {
                    JOptionPane.showOptionDialog(null, "Please enter a username and password", "Registration Error",
                            JOptionPane.CLOSED_OPTION, JOptionPane.ERROR_MESSAGE, null, null, 0);
                } else if (um.userExists(username, password)) {
                    JOptionPane.showOptionDialog(null, "Username already exists", "Registration Error",
                            JOptionPane.CLOSED_OPTION, JOptionPane.ERROR_MESSAGE, null, null, 0);
                } else {
                    um.addUser(username, password);
                    JOptionPane.showOptionDialog(null, "Registration successful", "Registration",
                            JOptionPane.CLOSED_OPTION, JOptionPane.INFORMATION_MESSAGE, null, null, 0);
                    dispose();
                    new LoginWindow();
                }
            }
        });

        btnCancel.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose();
                new LoginWindow();
            }
        });

        this.setVisible(true);
    }
}
