package householdaccountbook.util;

//=================================================================
// 文字列ユーティリティクラス
// 作成日: 2019/11/01
//
//=================================================================
public class StringUtil {

	/**
	 * コンストラクタ(直接アクセス不可)
	 *
	 */
	private StringUtil() {}

	/**
	 * 空文字チェック
	 *
	 * @param s 文字列
	 * @return true / false
	 */
	public static boolean isEmpty(String s) {
		return s.trim().isEmpty() ? false : true;
	}

	/**
	 * 文字列が半角英数字から構成されているかどうかチェック
	 *
	 * @param s 文字列
	 * @return true / false
	 */
	public static boolean isAlphaOrDigit(String s) {
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
	public static boolean isAlphaOrDigit(char c) {
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
	 * 三桁ごとにカンマを入れる
	 *
	 * @param str 文字列
	 * @return カンマ挿入後の文字列
	 */
	public static String separate(int num) {
		return String.format("%,d", num);
	}

}
