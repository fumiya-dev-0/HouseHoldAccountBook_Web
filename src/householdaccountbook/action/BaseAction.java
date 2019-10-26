package householdaccountbook.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import householdaccountbook.util.ActionCommon;

public class BaseAction extends ActionSupport implements ServletResponseAware, ServletRequestAware, ActionCommon {

	// Actionクラス実行結果
	public static final String ACTION_SUCCESS = "success";
	public static final String ACTION_ERROR = "error";
	public static final String ACTION_LOGIN_ERROR = "login_error";

	// データベースエラーメッセージ定数
	public static final String DATABASE_ERROR = "データベース側でエラーが発生しました。";
	public static final String SQL_ERROR = "SQLの発行に失敗しました。";

	// データベース設定定数
	public static final String H2_DATABASE_DRIVER = "org.h2.Driver";
	public static final String H2_DATABASE_CONNECTION_URL = "jdbc:h2:tcp://localhost/~/mydb";
	public static final String H2_DATABASE_CONNECTION_USERID = "sa";
	public static final String H2_DATABASE_CONNECTION_PASSWORD = "";

	public static final String MYSQL_DATABASE_DRIVER = "com.mysql.jdbc.Driver";
	public static final String MYSQL_DATABASE_CONNECTION_URL = "";
	public static final String MYSQL_DATABASE_CONNECTION_USERID = "root";
	public static final String MYSQL_DATABASE_CONNECTION_PASSWORD = "";

	/**
	 * メンバ変数
	 *
	 */
	private String errorMessage;

	protected HttpServletResponse response;
	protected HttpServletRequest request;
	protected HttpSession session;

	// クッキー用変数
	public static final String COOKIE_USER_ID = "user_id";


	// セッション用変数
	public static final String SESSION_USER_CODE = "user_code";

	/**
	 * コンストラクタ
	 *
	 */
	public BaseAction() {
		errorMessage = null;
		session = null;
	}

	/**
	 * アクセサ
	 *
	 * @return
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	 * セッション情報の取得
	 *
	 * @param key
	 * @return
	 */
	protected String getSessionAttribute(String key) {
		HttpSession session = getSession();
		return (String) session.getAttribute(key);
	}

	/**
	 * セッション情報の設定
	 *
	 * @param key
	 * @param value
	 */
	protected void setSessionAttribute(String key, String value) {
		HttpSession session = getSession();
		session.setAttribute(key, value);
	}

	/**
	 * セッションの削除
	 *
	 * @param key
	 */
	protected void sessionRemove(String key) {
		HttpSession session = getSession();
		session.removeAttribute(key);
	}

	/**
	 * セッションの取得
	 *
	 */
	private HttpSession getSession() {
		if(session == null) {
			return request.getSession(true);
		}

		return session;
	}

	/**
	 * オーバーライド
	 *
	 */
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

}
