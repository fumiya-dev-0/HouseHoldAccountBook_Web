package householdaccountbook.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/*************************************************
 * パラメータ用ヘルパークラス
 * 作成日: 2019/11/13
 *
 *************************************************/
public class ParamHelper {

	/** httpレスポンス情報 */
	private static HttpServletResponse response;
	/** httpリクエスト情報 */
	private static HttpServletRequest request;
	/** セッション情報 */
	private static HttpSession session;

	/**
	 * パラメータの取得
	 *
	 * @param key キー値
	 * @return パラメータ
	 */
	public static String getParam(String key) {
		return request.getParameter(key);
	}

	/**
	 * パラメータの設定
	 *
	 * @param reusltMap 結果マップ
	 * @return パラメータ
	 */
	public static void setParam(Map<String, Object> resultMap) {
		request.setAttribute(AppConstants.DATA, resultMap);
	}

	/**
	 * セッション初期化
	 *
	 * @param session セッション
	 */
	public static void initSession(HttpSession session) {
		ParamHelper.session = session;
	}

	/**
	 * セッションの取得
	 *
	 * @param key セッションキー
	 * @return
	 */
	public static String getSession(String key) {
		return (String) session.getAttribute(key);
	}

	/**
	 * セッションの設定
	 *
	 * @param key セッションキー
	 * @param value セッションの値
	 */
	public static void setSession(String key, String value) {
		session.setAttribute(key, value);
	}

	/**
	 * セッションの削除
	 *
	 * @param key セッションキー
	 */
	public static void sessionRemove(String key) {
		session.removeAttribute(key);
	}

	/**
	 * レスポンスの取得
	 *
	 * @return レスポンス
	 */
	public static HttpServletResponse getResponse() {
		return response;
	}

	/**
	 * レスポンスの設定
	 *
	 * @param response レスポンス
	 */
	public static void setResponse(HttpServletResponse response) {
		ParamHelper.response = response;
	}

	/**
	 * リクエストの取得
	 *
	 * @return リクエスト
	 */
	public static HttpServletRequest getRequest() {
		return request;
	}

	/**
	 * リクエストの設定
	 *
	 * @param request リクエスト
	 */
	public static void setRequest(HttpServletRequest request) {
		ParamHelper.request = request;
	}

}
