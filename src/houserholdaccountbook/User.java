package houserholdaccountbook;

public class User {

	/**
	 * メンバ変数
	 */
	private int userCode;
	private String userId;
	private String password;
	private String loginState;

	/**
	 * コンストラクタ
	 */
	public User() {
		userCode = -1;
		userId = null;
		password = null;
		loginState = null;
	}


	/**
	 * アクセサ
	 *
	 * @return
	 */
	public int getUserCode() {
		return userCode;
	}

	public void setUserCode(int userCode) {
		this.userCode = userCode;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getLoginState() {
		return loginState;
	}

	public void setLoginState(String loginState) {
		this.loginState = loginState;
	}


}
