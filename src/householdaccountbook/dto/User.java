package householdaccountbook.dto;

/*************************************************
 * ユーザーDTOクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public class User {

	// ユーザーコード
	private Integer userCode;
	// ユーザーID
	private String userId;
	// パスワード
	private String password;
	// ログイン状態
	private String loginState;

	/**
	 * コンストラクタ
	 */
	public User() {
		this.userCode = -1;
		this.userId = null;
		this.password = null;
		this.loginState = null;
	}

	/**
	 * ユーザーコード getter
	 *
	 * @return ユーザーコード
	 */
	public Integer getUserCode() {
		return userCode;
	}

	/**
	 * ユーザーコード setter
	 *
	 * @param userCode ユーザーコード
	 */
	public void setUserCode(Integer userCode) {
		this.userCode = userCode;
	}

	/**
	 * ユーザーID getter
	 *
	 * @return ユーザーID
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * ユーザーID setter
	 *
	 * @param userId ユーザーID
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * パスワード getter
	 *
	 * @return password パスワード
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * パスワード setter
	 *
	 * @param password パスワード
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * ログイン状態 getter
	 *
	 * @return ログイン状態
	 */
	public String getLoginState() {
		return loginState;
	}

	/**
	 * ログイン状態 setter
	 *
	 * @param loginState ログイン状態
	 */
	public void setLoginState(String loginState) {
		this.loginState = loginState;
	}

}
