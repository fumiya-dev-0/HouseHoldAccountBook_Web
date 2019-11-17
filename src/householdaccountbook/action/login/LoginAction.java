package householdaccountbook.action.login;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.Cookie;

import org.apache.commons.lang.BooleanUtils;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.User;
import householdaccountbook.model.entity.UserModel;
import householdaccountbook.util.HtmlConstants;
import householdaccountbook.util.ParamHelper;
import householdaccountbook.util.StringUtil;

/*************************************************
 * ログインアクションクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public class LoginAction extends AbstractAction {

	/** ユーザーID(入力) */
	private String userId;
	/** パスワード(入力) */
	private String password;
	/** エラーメッセージ */
	private String errorMessage;

	/** ハッシュ関数 */
	public static final String HASH_ALGORITHM = "SHA-512";
	/** ソルト */
	public static final String SALT = "bbksadasvgsrsferccadsefg44wefKYTJRBaawf356";

	/** ユーザー入力エラーメッセージ */
	public static final String LOGIN_ERROR_MESSAGE = "入力されたユーザID又はパスワードが正しくありません。";
	/** ハッシュ生成エラーメッセージ */
	public static final String HASH_ERROR_MESSAGE = "ハッシュの生成に失敗しました。";

	@Override
	public String execute() throws Exception {

		userId = ParamHelper.getParam(HtmlConstants.USER_ID);
		password = ParamHelper.getParam(HtmlConstants.PASSWORD);

		if(!isCheck()) {
			return ACTION_LOGIN_ERROR;
		}

		try {
			if(!login()) {
				return ACTION_LOGIN_ERROR;
			}
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
			setErrorMessage(HASH_ERROR_MESSAGE);
		}

		userIdSaveToCookie();

		return ACTION_SUCCESS;
	}

	/**
	 * ログイン処理
	 *
	 * @return true(ログイン成功) / false(ログイン失敗)
	 * @throws UnsupportedEncodingException
	 * @throws NoSuchAlgorithmException
	 */
	private boolean login() throws NoSuchAlgorithmException, UnsupportedEncodingException {

		UserModel model = new UserModel();
		User user = model.load(userId, getPasswordHash());
		if(user != null) {
			ParamHelper.setSession(SESSION_USER_CODE, String.valueOf(user.getUserCode()));
			return true;
		}else {
			setErrorMessage(LOGIN_ERROR_MESSAGE);
			return false;
		}

	}

	/**
	 * ハッシュの取得(パスワード)
	 *
	 * @return ハッシュ
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	private String getPasswordHash() throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
		String target = password + userId + SALT;
		digest.update(target.getBytes("utf8"));

		return String.format("%064x", new BigInteger(1, digest.digest()));

	}

	/**
	 * 入力チェック
	 *
	 * @return true / false
	 */
	private boolean isCheck() {

		if(!StringUtil.isEmpty(userId)) {
			setErrorMessage(EMPTY_USERID_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isEmpty(password)) {
			setErrorMessage(EMPTY_PASSWORD_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isAlphaOrDigit(userId)) {
			setErrorMessage(ALPHA_USERID_ERROR_MESSAGE);
			return false;
		}

		if(!StringUtil.isAlphaOrDigit(password)) {
			setErrorMessage(ALPHA_PASSWORD_ERROR_MESSAGE);
			return false;
		}

		return true;
	}

	/**
	 * ユーザIDをクッキーに保存
	 *
	 */
	private void userIdSaveToCookie() {

		Boolean auto = BooleanUtils.toBoolean(ParamHelper.getParam(HtmlConstants.AUTO));
		// ユーザID保存チェックボックスがtrueのとき
		if(auto) {
			setCookie();
		}
	}

	/**
	 * クッキーの設定
	 *
	 */
	private void setCookie() {

		Cookie cookie = new Cookie(COOKIE_USER_ID, userId);
		cookie.setMaxAge(60 * 60 * 24);
		ParamHelper.getResponse().addCookie(cookie);
	}

	/**
	 * エラーメッセージの取得
	 *
	 * @return エラーメッセージ
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * エラーメッセージの設定
	 *
	 * @param errorMessage エラーメッセージ
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
