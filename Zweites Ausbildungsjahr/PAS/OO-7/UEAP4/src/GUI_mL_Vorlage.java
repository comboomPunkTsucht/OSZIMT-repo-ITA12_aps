// Import-Anweisungen
import java.awt.*;    
import javax.swing.*; 
import java.awt.event.*;  
import javax.swing.event.*;    
import java.awt.GridLayout;

public class GUI_mL_Vorlage extends JFrame{    
	  
    // JFrame deklarieren
    private JTextField tfd2;
    private JTextField tfd1;
    private JButton btn1;
    private JButton btn2;
    private JPanel pnl1;
    private JLabel lbl1;

    
    // Konstruktor  
    GUI_mL_Vorlage(){
    	setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); 
      // JFrame erzeugen   
        
    
      // GUI-Komponenten erzeugen 
    	pnl1 = new JPanel();
        pnl1.setBounds(0, 0, 450, 272);
        lbl1 = new JLabel("Hier seht was!");
        lbl1.setHorizontalAlignment(SwingConstants.CENTER);

        tfd1 = new JTextField();
        tfd1.setText("Hier muss was rein!");
        tfd1.setHorizontalAlignment(SwingConstants.CENTER);
        tfd1.setColumns(10);
        btn1 = new JButton("Click!");
        tfd2 = new JTextField();
        tfd2.setHorizontalAlignment(SwingConstants.CENTER);
        tfd2.setText("Hier muss noch was rein!");
        tfd2.setColumns(10); 
        btn2 = new JButton("Nochmal Click!");

        
         
      // Layout definieren
      getContentPane().setLayout(null);
      this.
  
      // Layout dem JPanel zuordnen          

      pnl1.setLayout(new GridLayout(5, 1));
         
      // GUI-Komponeneten dem JPanel zuordnen (Reihenfolge beachten)  
      pnl1.add(lbl1);
      pnl1.add(tfd1);
      pnl1.add(btn1);
      pnl1.add(tfd2);
      pnl1.add(btn2);    
      // JPanel zum JFrame hinzuf�gen
      getContentPane().add(pnl1);
      
      
      // Gr��e des JFrame festlegen und sichtbar machen  
      this.setSize(350, 150);    
      this.setVisible(true); 
  
      // ActionListener f�r die JButtons
      // btn1
      btn1.addActionListener(
        new ActionListener() {
          public void actionPerformed(ActionEvent e) {
           
          }
        }
      );     
      
      // btn2
      btn2.addActionListener(
       new ActionListener() {
    	 public void actionPerformed(ActionEvent e) {
    	           
    	  }
    	}
      );            
    }  
        
    // Main-Methode  
    public static void main(String argvs[]){    
      new GUI_mL_Vorlage();    
    }    
}    