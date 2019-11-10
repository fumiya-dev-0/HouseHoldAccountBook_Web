package householdaccountbook.action.util;

/*************************************************
 * アクション用共通インターフェース
 * 作成日: 2019/10/26
 *
 *************************************************/
public interface ActionCommon {

	/** Actionクラス実行結果 */
	public static final String ACTION_SUCCESS = "success";
	public static final String ACTION_ERROR = "error";
	public static final String ACTION_LOGIN_ERROR = "login_error";

	/** データベースエラーメッセージ定数 */
	public static final String DATABASE_ERROR = "データベース側でエラーが発生しました。";
	public static final String SQL_ERROR = "SQLの発行に失敗しました。";

	/** データベース設定定数(H2) */
	public static final String H2_DATABASE_DRIVER = "org.h2.Driver";
	public static final String H2_DATABASE_CONNECTION_URL = "jdbc:h2:tcp://localhost/~/mydb";
	public static final String H2_DATABASE_CONNECTION_USERID = "sa";
	public static final String H2_DATABASE_CONNECTION_PASSWORD = "";

	/** データベース設定定数(MySQL) */
	public static final String MYSQL_DATABASE_DRIVER = "com.mysql.jdbc.Driver";
	public static final String MYSQL_DATABASE_CONNECTION_URL = "";
	public static final String MYSQL_DATABASE_CONNECTION_USERID = "root";
	public static final String MYSQL_DATABASE_CONNECTION_PASSWORD = "";

	/** ログイン処理メッセージ定数 */
	public static final String EMPTY_USERID_ERROR_MESSAGE = "ユーザIDが入力されていません。";
	public static final String EMPTY_PASSWORD_ERROR_MESSAGE = "パスワードが入力されていません。";
	public static final String ALPHA_USERID_ERROR_MESSAGE = "ユーザIDは半角英数字で入力してください。";
	public static final String ALPHA_PASSWORD_ERROR_MESSAGE = "パスワードは半角英数字で入力してください。";

	/** クッキー用変数 */
	public static final String COOKIE_USER_ID = "user_id";
	/** セッション用変数 */
	public static final String SESSION_USER_CODE = "user_code";

}
