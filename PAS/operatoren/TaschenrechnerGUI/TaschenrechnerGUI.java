import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

/**
 *
 * Beschreibung
 *
 * @version 1.0 vom 11.11.2021
 * @author 
 */

public class TaschenrechnerGUI extends Application {
  // Anfang Attribute
  // Ende Attribute
  
  public void start(Stage primaryStage) { 
    Pane root = new Pane();
    Scene scene = new Scene(root, 320, 500);
    // Anfang Komponenten
    
    // Ende Komponenten
    
    primaryStage.setOnCloseRequest(e -> System.exit(0));
    primaryStage.setTitle("Rechner");
    primaryStage.setScene(scene);
    primaryStage.show();
  } // end of public TaschenrechnerGUI
  
  // Anfang Methoden
  
  public static void main(String[] args) {
    launch(args);
  } // end of main
  
  // Ende Methoden
} // end of class TaschenrechnerGUI

