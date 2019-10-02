package householdaccountbook.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import householdaccountbook.util.Util;

public class BaseAction extends ActionSupport implements Util, ServletResponseAware, ServletRequestAware {

	/**
	 * メンバ変数
	 *
	 */
	private String errorMessage;

	protected HttpServletResponse response;
	protected HttpServletRequest request;
	protected HttpSession session;

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
