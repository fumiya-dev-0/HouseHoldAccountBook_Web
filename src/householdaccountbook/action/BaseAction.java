package householdaccountbook.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import householdaccountbook.util.ActionCommon;

/*************************************************
 * ベースアクションクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public class BaseAction extends ActionSupport implements ServletResponseAware, ServletRequestAware, ActionCommon {

	/** クッキー用変数 */
	public static final String COOKIE_USER_ID = "user_id";
	/** セッション用変数 */
	public static final String SESSION_USER_CODE = "user_code";

	/** エラーメッセージ */
	private String errorMessage;
	/** 返却用パラメータ */
	private String json;
	/** 入力データ */
	private String data;

	/** httpレスポンス情報 */
	protected HttpServletResponse response;
	/** httpリクエスト情報 */
	protected HttpServletRequest request;
	/** セッション情報 */
	protected HttpSession session;

	/**
	 * コンストラクタ
	 *
	 */
	public BaseAction() {
		errorMessage = null;
		session = null;
		json = null;
	}

	/**
	 * エラーメッセージの取得
	 *
	 * @return エラーメッセージ
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * エラーメッセージの設定
	 *
	 * @param errorMessage エラーメッセージ
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	 * セッション情報の取得
	 *
	 * @param key セッションキー
	 * @return
	 */
	protected String getSessionAttribute(String key) {
		HttpSession session = getSession();
		return (String) session.getAttribute(key);
	}
	/**
	 * セッション情報の設定
	 *
	 * @param key セッションキー
	 * @param value セッションの値
	 */
	protected void setSessionAttribute(String key, String value) {
		HttpSession session = getSession();
		session.setAttribute(key, value);
	}

	/**
	 * セッションの削除
	 *
	 * @param key セッションキー
	 */
	protected void sessionRemove(String key) {
		HttpSession session = getSession();
		session.removeAttribute(key);
	}

	/**
	 * セッションの取得
	 *
	 * @return セッション情報
	 */
	private HttpSession getSession() {
		if(session == null) {
			return request.getSession(true);
		}

		return session;
	}

	/**
	 * 返却用パラメータ getter
	 *
	 * @return json
	 */
	public String getJson() {
		return json;
	}

	/**
	 * 返却用パラメータ setter
	 *
	 * @param json
	 */
	public void setJson(String json) {
		this.json = json;
	}

	/**
	 * 入力データ getter
	 *
	 * @return data 入力データ
	 */
	public String getData() {
		return data;
	}

	/**
	 * 入力データ
	 *
	 * @param data 入力データ setter
	 */
	public void setData(String data) {
		this.data = data;
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
