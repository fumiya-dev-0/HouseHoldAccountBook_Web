package householdaccountbook.action.login;

import javax.servlet.http.Cookie;

import householdaccountbook.base.AbstractAction;

/*************************************************
 * クッキー取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchCookieAction extends AbstractAction {

	/** ユーザーID(入力) */
	private String userId;

	@Override
	public String execute() throws Exception {

		// クッキーにユーザIDが存在する場合、クッキーをユーザIDのセッターに設定する
		Cookie cookies [] = request.getCookies();
		if(isCookie(cookies)) {
			setUserId(getCookie(cookies));
		}

		return ACTION_SUCCESS;
	}

	/**
	 * クッキーが存在するかチェック
	 *
	 * @return true / false
	 */
	private boolean isCookie(Cookie cookies[]) {

		if(cookies == null) {
			return false;
		}

		if(cookies.length == 0) {
			return false;
		}

		return true;
	}

	/**
	 * クッキーの取得
	 *
	 * @return クッキー情報
	 */
	private String getCookie(Cookie cookies[]) {
		String cookie = "";

		for(int i = 0; i < cookies.length; i++) {
			if(cookies[i].getName().equals(COOKIE_USER_ID)) {
				cookie = cookies[i].getValue();
			}
		}

		return cookie;
	}

	/**
	 * ユーザーID
	 *
	 * @return ユーザーID
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * ユーザーID
	 *
	 * @param userId ユーザーID
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

}
