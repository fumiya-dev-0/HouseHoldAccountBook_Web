package householdaccountbook.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

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
		return convertSanitize(request.getParameter(key));
	}

	/**
	 * パラメータの設定
	 *
	 * @param reusltMap 結果マップ
	 * @return パラメータ
	 */
	public static void setParam(Map<String, Object> resultMap) {
		request.setAttribute(AppConstants.DATA, resultMap);
		paramUnSanitize();
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
	public static void removeSession(String key) {
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

	/**
	 * サニタイジングを行う
	 *
	 * @param str 文字列
	 * @return サニタイズ後の文字列
	 */
	private static String convertSanitize(String str) {

		if(StringUtils.isEmpty(str)) {
			return str;
		}
		return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39");
	}

	/**
	 * サニタイジングされたタグを元に戻す
	 *
	 * @param str 文字列
	 * @return タグを元に戻した文字列
	 */
	private static String convertUnSanitize(String str) {

		if(StringUtils.isEmpty(str)) {
			return str;
		}
		return str.replaceAll("&#39", "'").replaceAll("&quot;", "\"").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&");
	}

	/**
	 * パラメータでサニタイジングされたタグを元に戻す
	 *
	 */
	@SuppressWarnings("unchecked")
	private static void paramUnSanitize(){

		Object obj = (Object) request.getAttribute(AppConstants.DATA);

		if(obj instanceof HashMap) {
			Map<String, Object> resultMap = (Map<String, Object>) obj;
			mapUnSanitize(resultMap);
		}
	}

	/**
	 * マップでサニタイジングされたタグを元に戻す
	 *
	 * @param resultMap 結果マップ
	 */
	@SuppressWarnings("unchecked")
	private static void mapUnSanitize(Map<String, Object> resultMap) {

		for(Map.Entry<String, Object> entry : resultMap.entrySet()) {
			if(entry.getValue() instanceof String) {
				resultMap.put(entry.getKey(), convertUnSanitize((String) entry.getValue()));
			}
			if(entry.getValue() instanceof List) {
				List<Object[]> list = (List<Object[]>) entry.getValue();
				listUnSanitize(list);
				resultMap.put(entry.getKey(), list);
			}
		}
	}

	/**
	 * リストでサニタイジングされたタグを元に戻す
	 *
	 * @param list リスト(結果マップのvalue)
	 */
	private static void listUnSanitize(List<Object[]> list) {

		int idx = 0;
		for(Object[] objAry : list) {
			objAryUnSanitize(objAry);
			list.set(idx++, objAry);
		}
	}

	/**
	 * オブジェクト配列でサニタイジングされたタグを元に戻す
	 *
	 * @param objAry オブジェクト配列
	 */
	private static void objAryUnSanitize(Object[] objAry) {

		int idx = 0;
		for(Object obj : objAry) {
			if(obj instanceof String) {
				objAry[idx] = convertUnSanitize((String) obj);
			}
			idx++;
		}
	}

}
