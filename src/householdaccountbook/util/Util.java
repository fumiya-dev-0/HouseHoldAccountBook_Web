package householdaccountbook.util;

/*************************************************
 * 画面用ユーティリティクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public interface Util {

	/**
	 * CSSファイルパスの列挙型クラス
	 *
	 */
	public enum Css {

		LOGIN_CSS_PATH("login/login.css"),
		MAIN_CSS_PATH("main/main.css"),
		TAB_CSS_PATH("main/tab.css"),
		TABPAGE_TABBODY_CSS_PATH("tabpage/tabbody_listpage.css"),
		BASE_DIALOG_CSS_PATH("base/base_dialog.css"),
		MODAL_CSS_PATH("common/modal.css"),
		MESSAGE_CSS_PATH("common/message.css"),
		PROGRESS_CSS_PATH("common/progress.css"),
		PAGER_CSS_PATH("common/pager.css");

		// CSSファイルパス
		private final String path;

		/**
		 * コンストラクタ
		 *
		 * @param path CSSファイルパス
		 */
		private Css(final String path) {
			this.path = path;
		}

		/**
		 * CSSファイルパスの取得
		 *
		 * @return CSSファイルパス
		 */
		public String getPath() {
			return "css/" + this.path;
		}

	}

	/**
	 * HTMLタグの列挙型クラス
	 *
	 */
	public enum Html {

		TITLE("家計簿");

		// HTMLタグ
		private final String htmlTag;

		/**
		 * コンストラクタ
		 *
		 * @param htmlTag HTMLタグ
		 */
		private Html(String htmlTag) {
			this.htmlTag = htmlTag;
		}

		/**
		 * HTMLタグの取得
		 *
		 * @return HTMLタグ
		 */
		public String getHtmlTag() {
			return htmlTag;
		}

	}

	/**
	 * JSファイルパスの列挙型クラス
	 *
	 * @author
	 */
	public enum JavaScript {

		TAB_JS_PATH("main/tab.js"),
		TABPAGE_TABBODY_JS_PATH("/tabpage/tabbody_listpage.js");

		// JSファイルパス
		private final String path;

		/**
		 * コンストラクタ
		 *
		 * @param path JSファイルパス
		 */
		private JavaScript(String path) {
			this.path = path;
		}

		/**
		 * JSファイルパスの取得
		 *
		 * @return JSファイルパス
		 */
		public String getPath() {
			return "js/" + path;
		}

	}

}
