package householdaccountbook.base;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

import householdaccountbook.action.util.ActionCommon;
import householdaccountbook.util.ParamHelper;

/*************************************************
 * 抽象アクションクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public abstract class AbstractAction extends ActionSupport implements ServletResponseAware, ServletRequestAware, ActionCommon {

	/** 結果マップ */
	protected Map<String, Object> resultMap = new HashMap<String, Object>();

	/**
	 * 実行(抽象メソッド)
	 *
	 */
	abstract public String execute() throws Exception;

	@Override
	public void setServletResponse(HttpServletResponse response) {
		ParamHelper.setResponse(response);
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		ParamHelper.setRequest(request);
		ParamHelper.initSession(request.getSession(true));
	}

}
