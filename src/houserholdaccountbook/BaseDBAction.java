package houserholdaccountbook;

import com.opensymphony.xwork2.ActionSupport;

import houserholdaccountbook.util.Util;

public class BaseDBAction extends ActionSupport implements Util {

	/**
	 * メンバ変数
	 *
	 */
	private String errorMessage;

	/**
	 * コンストラクタ
	 *
	 */
	public BaseDBAction() {
		errorMessage = null;
	}

	/**
	 * アクセサ
	 *
	 * @return
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}



}
