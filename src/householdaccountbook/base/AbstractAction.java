package householdaccountbook.base;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import householdaccountbook.action.util.ActionCommon;
import householdaccountbook.util.AppConstants;

/*************************************************
 * 抽象アクションクラス
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
	 * 実行(抽象メソッド)
	 *
	 */
	abstract public String execute() throws Exception;

	/**
	 * セッションの取得
	 *
	 * @return セッション情報
	 */
	private HttpSession getSession() {
		return session == null ? request.getSession(true) : session;
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
	 * パラメータの取得
	 *
	 * @param key キー値
	 * @return パラメータ
	 */
	protected String getParam(String key) {
		return request.getParameter(key);
	}

	/**
	 * 属性の設定
	 *
	 * @param <T> ジェネリクス
	 * @param resultMap 結果マップ
	 * @return 属性
	 */
	@SuppressWarnings("unchecked")
	protected <T> void setAttrResponse(Map<String, T> resultMap) {

		// 属性値が存在する場合
		if(request.getAttribute(AppConstants.DATA) != null) {
			// マップに属性値のコピーを行う
			Map<String, T> map =  (Map<String, T>) request.getAttribute(AppConstants.DATA);
			// マップに新しいマップを追加
			for(Map.Entry<String, T> entry : resultMap.entrySet()){
				map.put(entry.getKey(), entry.getValue());
			}
			request.setAttribute(AppConstants.DATA, map);
		} else {
			// 属性値が存在しない場合
			request.setAttribute(AppConstants.DATA, resultMap);
		}
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
