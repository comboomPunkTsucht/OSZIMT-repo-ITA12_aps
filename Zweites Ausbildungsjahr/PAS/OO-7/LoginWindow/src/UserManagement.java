import java.util.ArrayList;

/**
 * @author mahd
 *
 */
public class UserManagement {

    private ArrayList<User> userList = new ArrayList<User>();
    
    // Initialisierung der Benutzerliste im Konstruktor
    public UserManagement() { // Die Größe der Benutzerliste sollte entsprechend der Anzahl der Benutzer festgelegt werden
        userList.add(new User("mahd", "fabian66"));
    }

    public void insert(User user) {
        // Füge den übergebenen Benutzer zur Liste hinzu
        userList.add(user);
    }

    public void remove(User user) {
        // Entferne den übergebenen Benutzer aus der Liste
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i) != null && (userList.get(i).getUsername().equals(user.getUsername()))) {
            	userList.remove(i);
                break;
            }
        }
    }

    public boolean exist(String username, String pwd) {
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i) != null && userList.get(i).getUsername().equals(username) && userList.get(i).getPWD().equals(pwd)) {
                return true;
            }
        }
        return false;
    }
}
