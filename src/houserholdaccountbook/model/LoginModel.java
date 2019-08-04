package houserholdaccountbook.model;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;

import houserholdaccountbook.LoginAction;
import houserholdaccountbook.User;

public class LoginModel extends BaseModel {

	/**
	 * メンバ変数
	 *
	 */
	private LoginAction loginAction;
	private int userCode;
	private String userId;
	private String password;


	/**
	 * コンストラクタ
	 *
	 * @param loginAction
	 * @param userCode
	 * @param userId
	 * @param password
	 */
	public LoginModel(LoginAction loginAction, int userCode, String userId, String password) {
		super();
		this.loginAction = loginAction;
		this.userCode = userCode;
		this.userId = userId;
		this.password = password;
	}

	/**
	 * アクセサ
	 *
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

	/**
	 * ユーザテーブル読み込み(単一)
	 *
	 * @return
	 * @throws SQLException
	 */
	public User load() {

		Session session = getSession();

		try {
			String sql = String.format("%s WHERE user_id = '%s' AND password = '%s'", USER_LOAD_SQL, userId, getPasswordHash());
			@SuppressWarnings("unchecked")
			List<User> users = session.createSQLQuery(sql).addEntity(User.class).list();

			if(users == null || users.size() == 0) {
				loginAction.setErrorMessage(LOGIN_ERROR_MESSAGE);
				return null;
			}
			return users.get(0);
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			loginAction.setErrorMessage(HASH_ERROR_MESSAGE);
			return null;
		} finally {
			session.close();
		}

	}

	/**
	 * ハッシュの取得
	 *
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	private String getPasswordHash() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
		String target = password + userId + SALT;
		digest.update(target.getBytes("utf8"));

		return String.format("%064x", new BigInteger(1, digest.digest()));

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

}
