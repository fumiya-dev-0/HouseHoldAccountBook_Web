package houserholdaccountbook.util;

public interface Util {

	/**
	 * Actionクラス実行結果
	 *
	 */
	public static final String ACTION_SUCCESS = "success";
	public static final String ACTION_ERROR = "error";
	public static final String ACTION_LOGIN_ERROR = "login_error";

	/**
	 * データベースエラーメッセージ定数
	 *
	 */
	public static final String DATABASE_ERROR = "データベース側でエラーが発生しました。";

	/**
	 * ログイン処理メッセージ定数
	 *
	 */
	public static final String EMPTY_USERID_ERROR_MESSAGE = "ユーザIDが入力されていません。";
	public static final String EMPTY_PASSWORD_ERROR_MESSAGE = "パスワードが入力されていません。";
	public static final String ALPHA_USERID_ERROR_MESSAGE = "ユーザIDは半角英数字で入力してください。";
	public static final String ALPHA_PASSWORD_ERROR_MESSAGE = "パスワードは半角英数字で入力してください。";
	public static final String LOGIN_ERROR_MESSAGE = "入力されたユーザID又はパスワードが正しくありません。";

	/**
	 * データベース設定定数
	 *
	 */
	public static final String H2_DATABASE_DRIVER = "org.h2.Driver";
	public static final String H2_DATABASE_CONNECTION_URL = "jdbc:h2:tcp://localhost/~/mydb";
	public static final String H2_DATABASE_CONNECTION_USERID = "sa";
	public static final String H2_DATABASE_CONNECTION_PASSWORD = "";

	public static final String MYSQL_DATABASE_DRIVER = "com.mysql.jdbc.Driver";
	public static final String MYSQL_DATABASE_CONNECTION_URL = "";
	public static final String MYSQL_DATABASE_CONNECTION_USERID = "root";
	public static final String MYSQL_DATABASE_CONNECTION_PASSWORD = "";

	/**
	 * Hibernate設定ファイルパス
	 *
	 */
	public static final String HIBERNATE_CONFIG_PATH = "hibernate.cfg.xml";
	/**
	 *  カラム名
	 *
	 */
	public static final String USER_USERCODE_COLUMN = "user_code";
	public static final String USER_USERID_COLUMN = "user_id";
	public static final String USER_PASSWORD_COLUMN = "password";

	/**
	 * SQL
	 *
	 */
	public static final String USER_LOAD_SQL = "SELECT * FROM user";

	/**
	 * ハッシュ関数・ソルト
	 *
	 */
	public static final String HASH_ALGORITHM = "SHA-512";
	public static final String HASH_ERROR_MESSAGE = "ハッシュの生成に失敗しました。";
	public static final String SALT = "bbksadasvgsrsferccadsefg44wefKYTJRBaawf356";

	/**
	 * CSSファイルパスの列挙型クラス
	 * @author fumiya
	 *
	 */
	public enum Css {

		DEFAULT_CSS_PATH("default.css"),
		LOGIN_CSS_PATH("login.css");

		private final String path;

		/**
		 * コンストラクタ
		 *
		 * @param path
		 */
		private Css(final String path) {
			// TODO 自動生成されたコンストラクター・スタブ
			this.path = path;
		}

		/**
		 * CSSファイルパスの取得
		 *
		 * @return
		 */
		public String getPath() {
			return "css/" + this.path;
		}

	}

	/**
	 * HTMLタグの列挙型クラス
	 * @author fumiya
	 *
	 */
	public enum Html {

		TITLE("家計簿");

		private final String htmlTag;

		/**
		 * コンストラクタ
		 *
		 * @param htmlTag
		 */
		private Html(String htmlTag) {
			this.htmlTag = htmlTag;
			// TODO 自動生成されたコンストラクター・スタブ
		}

		/**
		 * HTMLタグの取得
		 *
		 * @return
		 */
		public String getHtmlTag() {
			return htmlTag;
		}

	}


}
