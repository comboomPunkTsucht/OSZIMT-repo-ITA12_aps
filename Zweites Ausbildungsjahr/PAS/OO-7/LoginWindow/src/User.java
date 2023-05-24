/**
 * 
 */

/**
 * @author mahd
 *
 */
public class User {
    private String pwd;
    private String username;

    /**
     * 
     */
    public User(String username) {
	// TODO Auto-generated constructor stub
	this.username = username;
    }

    public User(String username, String pwd) {
	this.pwd = pwd;
	this.username = username;
    }

    public String getPWD() {
	return this.pwd;
    }

    public void setPWD(String pwd) {
	this.pwd = pwd;
    }
    
    public String getUsername() {
	return this.username;
    }
    public void setUsername(String username) {
	this.username = username;
    }

}
