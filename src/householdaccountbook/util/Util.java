package householdaccountbook.util;

public interface Util {

	/**
	 * CSSファイルパスの列挙型クラス
	 *
	 * @author
	 */
	public enum Css {

		LOGIN_CSS_PATH("login.css"),
		LIST_CSS_PATH("list.css"),
		TAB_CSS_PATH("tab.css"),
		TABBODY_LISTPAGE_CSS_PATH("/page/tabbody_listpage.css"),
		MODAL_CSS_PATH("/common/modal.css"),
		PROGRESS_CSS_PATH("/common/progress.css");

		private final String path;

		/**
		 * コンストラクタ
		 *
		 * @param path
		 */
		private Css(final String path) {
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
	 *
	 * @author
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
	 */
	public enum JavaScript {

		TAB_JS_PATH("tab.js"),
		TABBODY_LISTPAGE_JS_PATH("/page/tabbody_listpage.js");

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
