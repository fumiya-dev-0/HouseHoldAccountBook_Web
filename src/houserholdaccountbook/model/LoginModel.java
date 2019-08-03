package houserholdaccountbook.model;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
	public User load() throws SQLException {

		Statement statement = null;

		try {

			statement = getConnection().createStatement();
			String sql = String.format("%s WHERE user_id = '%s' AND password = '%s'", USER_LOAD_SQL, userId, getPasswordHash());
			ResultSet resultSet = statement.executeQuery(sql);

			if(!resultSet.first()) {
				loginAction.setErrorMessage(LOGIN_ERROR_MESSAGE);
				return null;
			}

			return setRtnUser(resultSet);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			loginAction.setErrorMessage(DATABASE_ERROR);
			return null;
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			loginAction.setErrorMessage(HASH_ERROR_MESSAGE);
			return null;
		} finally {
			if(statement != null) {
				statement.close();
				statement = null;
			}
		}

	}

	/**
	 * ユーザテーブル情報を設定し返す
	 *
	 * @param resultSet
	 * @return
	 * @throws SQLException
	 */
	private User setRtnUser(ResultSet resultSet) throws SQLException {

		User user = new User();
		user.setUserCode(resultSet.getInt(USER_USERCODE_COLUMN));
		user.setUserId(resultSet.getString(USER_USERID_COLUMN));
		user.setPassword(resultSet.getString(USER_PASSWORD_COLUMN));

		return user;
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
