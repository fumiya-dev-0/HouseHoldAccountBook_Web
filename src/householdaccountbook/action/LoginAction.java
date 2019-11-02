package householdaccountbook.action;

import javax.servlet.http.Cookie;

import householdaccountbook.dto.User;
import householdaccountbook.model.UserModel;
import householdaccountbook.util.StringUtil;

public class LoginAction extends BaseAction{

	/**
	 * メンバ変数
	 *
	 */
	private UserModel loginModel;
	private User user;

	private String userId;
	private String password;

	private Boolean auto;


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

		/**
		 * クッキーにユーザIDが存在する場合、クッキーをユーザIDのセッターに設定する
		 */
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

		user = new User();
		user.setUserId(userId);
		user.setPassword(password);
		loginModel = new UserModel(this, user);

		if(!isCheck()) {
			return ACTION_LOGIN_ERROR;
		}

		if(!login()) {
			return ACTION_LOGIN_ERROR;
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
	 */
	private boolean login() {

		User user = loginModel.load();
		if(user != null) {
			setSessionAttribute(SESSION_USER_CODE, String.valueOf(user.getUserCode()));
			return true;
		}else {
			return false;
		}

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
