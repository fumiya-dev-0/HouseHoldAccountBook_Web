package houserholdaccountbook;

import java.sql.SQLException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import houserholdaccountbook.model.LoginModel;

public class LoginAction extends BaseDBAction implements ServletResponseAware, ServletRequestAware{

	/**
	 * メンバ変数
	 *
	 */
	private LoginModel loginModel;

	private int userCode;
	private String userId;
	private String password;

	private Boolean auto;
	private HttpServletResponse response;
	private HttpServletRequest request;

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

		loginModel = new LoginModel(this, userCode, userId, password);

		if(!isValidate()) {
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

		try {
			User user = loginModel.load();
			if(user != null) {
				return true;
			}else {
				return false;
			}
		} catch (SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			return false;
		}

	}

	/**
	 * 入力チェック
	 *
	 * @return
	 */
	private boolean isValidate() {

		if(loginModel.isValidateUserId(userId)) {
			setErrorMessage(EMPTY_USERID_ERROR_MESSAGE);
			return false;
		}
		if(loginModel.isValidatePassword(password)) {
			setErrorMessage(EMPTY_PASSWORD_ERROR_MESSAGE);
			return false;
		}
		if(!isAlphaOrDigit(userId)) {
			setErrorMessage(ALPHA_USERID_ERROR_MESSAGE);
			return false;
		}

		if(!isAlphaOrDigit(password)) {
			setErrorMessage(ALPHA_PASSWORD_ERROR_MESSAGE);
			return false;
		}

		return true;
	}

	/**
	 * 文字列が半角英数字から構成されているかどうかチェック
	 *
	 * @param s
	 * @return
	 */
	private boolean isAlphaOrDigit(String s) {
		for(int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if(!isAlphaOrDigit(c)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 文字が半角英数字から構成されているかどうかチェック
	 *
	 * @param c
	 * @return
	 */
	private boolean isAlphaOrDigit(char c) {
		if('A' <= c && c <= 'Z') {
			return true;
		}
		if('a' <= c && c <= 'z') {
			return true;
		}
		if('0' <= c && c <= '9') {
			return true;
		}

		return false;
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
			if(cookies[i].getName().equals(USER_USERID_COLUMN)) {
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

		Cookie cookie = new Cookie(USER_USERID_COLUMN, userId);
		cookie.setMaxAge(60 * 60 * 24);
		response.addCookie(cookie);

	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}


}
