package householdaccountbook.action;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.Cookie;

import householdaccountbook.dto.User;
import householdaccountbook.model.UserModel;
import householdaccountbook.util.StringUtil;

/*************************************************
 * ログインアクションクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public class LoginAction extends BaseAction {

	private String userId;
	private String password;
	private Boolean auto;

	// ハッシュ関数
	public static final String HASH_ALGORITHM = "SHA-512";
	// ソルト
	public static final String SALT = "bbksadasvgsrsferccadsefg44wefKYTJRBaawf356";

	public static final String LOGIN_ERROR_MESSAGE = "入力されたユーザID又はパスワードが正しくありません。";
	public static final String HASH_ERROR_MESSAGE = "ハッシュの生成に失敗しました。";

	/**
	 * コンストラクタ
	 *
	 */
	public LoginAction() {
		userId = null;
		password = null;
		auto = null;
	}

	/**
	 * 画面表示
	 *
	 * @return
	 */
	public String show() {

		// クッキーにユーザIDが存在する場合、クッキーをユーザIDのセッターに設定する
		Cookie cookies [] = request.getCookies();
		if(isCookie(cookies)) {
			setUserId(getCookie(cookies));
		}

		return ACTION_SUCCESS;
	}

	/**
	 * 実行
	 *
	 * @return
	 */
	public String execute() {

		if(!isCheck()) {
			return ACTION_LOGIN_ERROR;
		}

		try {
			if(!login()) {
				return ACTION_LOGIN_ERROR;
			}
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
			setErrorMessage(HASH_ERROR_MESSAGE);
		}

		userIdSaveToCookie();

		return ACTION_SUCCESS;
	}

	/**
	 * アクセサ
	 *
	 * @return
	 */
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

	public Boolean getAuto() {
		return auto;
	}

	public void setAuto(Boolean auto) {
		this.auto = auto;
	}

	/**
	 * ログイン処理
	 *
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws NoSuchAlgorithmException
	 */
	private boolean login() throws NoSuchAlgorithmException, UnsupportedEncodingException {

		UserModel userModel = new UserModel();

		User user = userModel.load(this, userId, getPasswordHash());
		if(user != null) {
			setSessionAttribute(SESSION_USER_CODE, String.valueOf(user.getUserCode()));
			return true;
		}else {
			setErrorMessage(LOGIN_ERROR_MESSAGE);
			return false;
		}

	}

	/**
	 * ハッシュの取得(パスワード)
	 *
	 * @return ハッシュ
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
	 * 入力チェック
	 *
	 * @return
	 */
	private boolean isCheck() {

		if(!StringUtil.isEmpty(userId)) {
			setErrorMessage(EMPTY_USERID_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isEmpty(password)) {
			setErrorMessage(EMPTY_PASSWORD_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isAlphaOrDigit(userId)) {
			setErrorMessage(ALPHA_USERID_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isAlphaOrDigit(password)) {
			setErrorMessage(ALPHA_PASSWORD_ERROR_MESSAGE);
			return false;
		}

		return true;
	}

	/**
	 * ユーザIDをクッキーに保存
	 *
	 */
	private void userIdSaveToCookie() {

		// ユーザID保存チェックボックスがtrueのとき
		if(getAuto()) {
			setCookie();
		}

	}

	/**
	 * クッキーが存在するかチェック
	 * @return
	 */
	private boolean isCookie(Cookie cookies[]) {

		if(cookies == null) {
			return false;
		}

		if(cookies.length == 0) {
			return false;
		}

		return true;
	}

	/**
	 * クッキーの取得
	 * @return
	 *
	 */
	private String getCookie(Cookie cookies[]) {
		String cookie = "";

		for(int i = 0; i < cookies.length; i++) {
			if(cookies[i].getName().equals(COOKIE_USER_ID)) {
				cookie = cookies[i].getValue();
			}
		}

		return cookie;
	}

	/**
	 * クッキーの設定
	 *
	 */
	private void setCookie() {

		Cookie cookie = new Cookie(COOKIE_USER_ID, userId);
		cookie.setMaxAge(60 * 60 * 24);
		response.addCookie(cookie);

	}

}
