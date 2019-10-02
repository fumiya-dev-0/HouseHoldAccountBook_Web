package houserholdaccountbook.dto;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import houserholdaccountbook.util.Util;

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
		this.userCode = -1;
		this.userId = null;
		this.password = null;
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

	public String getPassword() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		return getPasswordHash();
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

	/**
	 * ユーザID空文字チェック
	 *
	 * @param userId
	 * @return
	 */
	public boolean isValidateUserId(String userId) {
		return userId.trim().isEmpty();
	}

	/**
	 * パスワード空文字チェック
	 *
	 * @param password
	 * @return
	 */
	public boolean isValidatePassword(String password) {
		return password.trim().isEmpty();
	}

	/**
	 * ハッシュの取得(パスワード)
	 *
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	private String getPasswordHash() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest digest = MessageDigest.getInstance(Util.HASH_ALGORITHM);
		String target = password + userId + Util.SALT;
		digest.update(target.getBytes("utf8"));

		return String.format("%064x", new BigInteger(1, digest.digest()));

	}

}
