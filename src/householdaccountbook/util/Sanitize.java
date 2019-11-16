package householdaccountbook.util;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

public class Sanitize {

	/**
	 * サニタイジングを行う
	 *
	 * @param str 文字列
	 * @return サニタイズ後の文字列
	 */
	public static String convertSanitize(String str) {

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
	public static String convertUnSanitize(String str) {

		if(StringUtils.isEmpty(str)) {
			return str;
		}
		return str.replaceAll("&#39", "'").replaceAll("&quot;", "\"").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&");
	}

	/**
	 * サニタイジングされたタグを元に戻す(リスト)
	 *
	 * @param list リスト
	 * @return タグを元に戻したリスト
	 */
	public static List<Object[]> convertListUnSanitize(List<Object[]> list){

		int idx = 0;
		for(Object[] objAry : list) {
			// サニタイジングされたタグを元に戻す(配列)
			convertArrayUnSanitize(objAry);
			// リストを配列で上書き
			list.set(idx++, objAry);
		}
		return list;
	}

	/**
	 * サニタイジングされたタグを元に戻す(配列)
	 *
	 * @param objAry 配列
	 */
	private static void convertArrayUnSanitize(Object[] objAry){

		int idx = 0;
		for(Object obj : objAry) {
			if(obj instanceof String) {
				objAry[idx] = convertUnSanitize((String) obj);
			}
			idx++;
		}
	}

	/**
	 * サニタイジングされたタグを元に戻す(Bean)
	 *
	 * @param <T> 総称型ジェネリクス
	 * @param list リスト
	 * @return タグを元に戻したリスト
	 * @throws NoSuchMethodException 特定のメソッドが見つからない場合にスロー実行
	 * @throws InvocationTargetException 呼び出されるメソッドまたはコンストラクタがスローする例外をラップする
	 * @throws IllegalAccessException 配列以外のインスタンス生成、フィールドの設定または取得、メソッドの呼び出しを試みた場合にスロー実行
	 */
	public static <T> List<T> convertBeanUnSanitize(List<T> list) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException{

		List<T> rtnList = new ArrayList<T>();
		for(T t : list) {
			// Beanをマップに変換
			Map<String, String> map = BeanUtils.describe(t);
			// サニタイジングされたタグを元に戻す(Map)
			convertMapUnSanitize(map);
			// 変換したマップをBeanに戻す
			BeanUtils.populate(t, map);
			rtnList.add(t);
		}

		return rtnList;
	}

	/**
	 * サニタイジングされたタグを元に戻す(Map)
	 *
	 * @param map マップ
	 */
	private static void convertMapUnSanitize(Map<String, String> map) {

		for(Entry<String, String> entry : map.entrySet()) {
			if(entry.getValue() instanceof String) {
				map.put(entry.getKey(), convertUnSanitize(entry.getValue()));
			}
		}
	}

}
