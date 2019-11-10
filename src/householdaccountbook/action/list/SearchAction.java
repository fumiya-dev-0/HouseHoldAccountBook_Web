package householdaccountbook.action.list;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.model.list.ListModel;
import householdaccountbook.util.Constants;
import householdaccountbook.util.DateUtil;
import householdaccountbook.util.StringUtil;

/*************************************************
 * 一覧画面データ取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchAction extends AbstractAction {

	@Override
	public String execute() {

		String data = getParam(Constants.DATA);
		int userCode = Integer.parseInt(getSessionAttribute(SESSION_USER_CODE));
		ListModel model = new ListModel();

		try {
			List<Object[]> list = (data == null) ? model.load(userCode, null) : model.load(userCode, data);

			Map<String, List<Object[]>> resultMap = new HashMap<String, List<Object[]>>();
			resultMap.put("resultList", convertList(list));
			setAttrResponse(resultMap);

		} catch (SQLException e) {
			e.printStackTrace();
			return ACTION_ERROR;
		}

		return ACTION_SUCCESS;
	}

	/**
	 * データのフォーマット変換
	 *
	 * @param list 家計簿データリスト
	 * @return フォーマット変換後の家計簿データリスト
	 */
	private List<Object[]> convertList(List<Object[]> list){

		for(Object[] obj : list) {
			obj[4] = DateUtil.convertToSlashDateString((String) obj[4]);// 日付
			obj[5] = StringUtil.separate((Integer) obj[5]) + "円"; // 所得
			obj[6] = StringUtil.separate((Integer) obj[6]) + "円"; // 出費
		}
		return list;
	}

}
