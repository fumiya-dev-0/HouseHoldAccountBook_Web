package householdaccountbook.dto;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import householdaccountbook.util.Util;

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
	 * ユーザーコード getter
	 *
	 * @return
	 */
	public int getUserCode() {
		return userCode;
	}

	/**
	 * ユーザーコード setter
	 *
	 * @return
	 */
	public void setUserCode(int userCode) {
		this.userCode = userCode;
	}

	/**
	 * ユーザーID getter
	 *
	 * @return
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * ユーザーID setter
	 *
	 * @return
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * パスワード getter
	 *
	 * @return
	 */
	public String getPassword() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		return getPasswordHash();
	}

	/**
	 * パスワード setter
	 *
	 * @return
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * ログイン状態 getter
	 *
	 * @return
	 */
	public String getLoginState() {
		return loginState;
	}

	/**
	 * ログイン状態 setter
	 *
	 * @return
	 */
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
