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
	public static final String SQL_ERROR = "SQLの発行に失敗しました。";

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
	 * ハッシュ関数・ソルト
	 *
	 */
	public static final String HASH_ALGORITHM = "SHA-512";
	public static final String HASH_ERROR_MESSAGE = "ハッシュの生成に失敗しました。";
	public static final String SALT = "bbksadasvgsrsferccadsefg44wefKYTJRBaawf356";

	/**
	 * クッキー用変数
	 */
	public static final String COOKIE_USER_ID = "user_id";

	/**
	 * セッション用変数
	 */
	public static final String SESSION_USER_CODE = "user_code";

	/**
	 * CSSファイルパスの列挙型クラス
	 * @author
	 *
	 */
	public enum Css {

		LOGIN_CSS_PATH("login.css"),
		LIST_CSS_PATH("list.css"),
		TAB_CSS_PATH("tab.css"),
		TABBODY_LISTPAGE_CSS_PATH("tabbody_listpage.css"),
		MODAL_CSS_PATH("modal.css");

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
	 * @author
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

	/**
	 * JSファイルパスの列挙型クラス
	 *
	 * @author
	 *
	 */
	public enum JavaScript {

		TAB_JS_PATH("tab.js"),
		TABBODY_LISTPAGE_JS_PATH("tabbody_listpage.js");

		private final String path;

		/**
		 * コンストラクタ
		 *
		 * @param path
		 */
		private JavaScript(String path) {
			this.path = path;
		}

		/**
		 * JSファイルパスの取得
		 *
		 * @return
		 */
		public String getPath() {
			return "js/" + path;
		}

	}

}
