package householdaccountbook.base;

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
public abstract class AbstractAction extends ActionSupport implements ServletResponseAware, ServletRequestAware, ActionCommon {

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
	public AbstractAction() {
		session = null;
	}

	/**
	 * 抽象メソッド
	 *
	 */
	abstract public String execute();

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
	 * パラメータの取得
	 *
	 * @param key キー値
	 * @return パラメータ
	 */
	protected String getParam(String key) {
		return request.getParameter(key);
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

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

}
