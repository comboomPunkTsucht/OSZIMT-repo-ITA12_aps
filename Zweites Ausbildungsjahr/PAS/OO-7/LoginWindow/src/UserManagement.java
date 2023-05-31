/**
 * @author mahd
 *
 */
public class UserManagement {

    private User[] userList;
    
    // Initialisierung der Benutzerliste im Konstruktor
    public UserManagement() {
        userList = new User[1]; // Die Größe der Benutzerliste sollte entsprechend der Anzahl der Benutzer festgelegt werden
        userList[0] = new User("mahd", "fabian66");
    }

    public void insert(User user) {
        // Füge den übergebenen Benutzer zur Liste hinzu
        User[] updatedList = new User[userList.length + 1];
        System.arraycopy(userList, 0, updatedList, 0, userList.length);
        updatedList[userList.length] = user;
        userList = updatedList;
    }

    public void remove(User user) {
        // Entferne den übergebenen Benutzer aus der Liste
        for (int i = 0; i < userList.length; i++) {
            if (userList[i] != null && userList[i].getUsername().equals(user.getUsername())) {
                userList[i] = null;
                break;
            }
        }
    }

    public boolean exist(String username, String pwd) {
        for (int i = 0; i < userList.length; i++) {
            if (userList[i] != null && userList[i].getUsername().equals(username) && userList[i].getPWD().equals(pwd)) {
                return true;
            }
        }
        return false;
    }
}
