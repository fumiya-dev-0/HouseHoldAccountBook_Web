package householdaccountbook.util;

/*************************************************
 * 定数クラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class AppConstants {

	/*************************************************
	 * 全共通
	 *************************************************/
	public static final String DATA = "data";
	public static final String ERROR = "error";

	/*************************************************
	 * 共通カラム名
	 *************************************************/
	/** 名前 */
	public static final String NAME = "NAME";
	public static final String COUNT = "COUNT";
	public static final String SUM = "SUM";

	/*************************************************
	 * 家計簿テーブル変数
	 *************************************************/
	/** 家計簿テーブル */
	public static final String T_HOUSE_HOLD_ACCOUNT_BOOK = "HOUSEHOLDACCOUNTBOOK";
	/** 家計簿コード */
	public static final String HOUSE_HOLD_ACCOUNT_BOOK_CODE = "HOUSEHOLDACCOUNTBOOK_CODE";
	/** 日付 */
	public static final String DATE = "DATE";
	/** 収入 */
	public static final String INCOME = "INCOME";
	/** 支出 */
	public static final String SPENDING = "SPENDING";

	/*************************************************
	 * 費目マスタ変数
	 *************************************************/
	/** 費目マスタ */
	public static final String M_EXPENSE = "EXPENSE";
	/** 費目コード */
	public static final String EXPENSE_CODE = "EXPENSE_CODE";
	/** 表示順 */
	public static final String DISPLAY_ORDER = "DISPLAY_ORDER";

	/*************************************************
	 * ユーザーマスタ変数
	 *************************************************/
	/** ユーザーマスタ */
	public static final String M_USER = "USER";
	/** ユーザーコード */
	public static final String USER_CODE = "USER_CODE";
	/** ユーザーID */
	public static final String USER_ID = "USER_ID";
	/** パスワード */
	public static final String PASSWORD = "PASSWORD";
	/** ログイン状態 */
	public static final String LOGINSTATE = "LOGINSTATE";

}
