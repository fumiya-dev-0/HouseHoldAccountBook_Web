package householdaccountbook.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

//=================================================================
// 日付ユーティリティクラス
// 作成日: 2019/11/01
//
//=================================================================
public class DateUtil {

	private static final String DATE_FORMAT = "yyyy/MM/dd";
	/**
	 * コンストラクタ(直接アクセス不可)
	 */
	private DateUtil() {}

	/**
	 * 文字列を日付文字列に変換(スラッシュ)
	 *
	 * @param str 文字列
	 * @return 日付文字列
	 */
	public static String convertToSlashDateString(String str) {

		Calendar cal = getDate(str);

		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		String date = sdf.format(cal.getTime());
		return isDate(date) ? date : null;
	}

	/**
	 * 文字列を日付に変換して取得
	 *
	 * @param str 文字列
	 * @return 日付
	 */
	private static Calendar getDate(String str) {

		Calendar cal = Calendar.getInstance();
		cal.set(Integer.parseInt(str.substring(0, 4)), Integer.parseInt(str.substring(4, 6)), Integer.parseInt(str.substring(6, 8)));

		return cal;
	}

	/**
	 * 文字列の日付チェック
	 *
	 * @param str 文字列
	 * @return true / false
	 */
	private static boolean isDate(String str) {
		DateFormat df = new SimpleDateFormat(DATE_FORMAT);
		df.setLenient(false);

		try {
			df.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

}
