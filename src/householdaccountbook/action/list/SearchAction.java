package householdaccountbook.action.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.model.entity.HouseHoldAccountBookModel;
import householdaccountbook.model.list.ListModel;
import householdaccountbook.util.AppConstants;
import householdaccountbook.util.DateUtil;
import householdaccountbook.util.StringUtil;

/*************************************************
 * 一覧画面データ取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		// 年月(入力データ)
		String year = getParam(AppConstants.YEAR);
		Integer userCode = Integer.parseInt(getSessionAttribute(SESSION_USER_CODE));

		ListModel listModel = new ListModel();
		List<Object[]> list = (year == null) ? listModel.load(userCode, null) : listModel.load(userCode, year);

		Map<String, List<Object[]>> resultMap = new HashMap<String, List<Object[]>>();
		resultMap.put("resultList", convertList(list));
		setAttrResponse(resultMap);


		HouseHoldAccountBookModel houseHoldAccountBookModel = new HouseHoldAccountBookModel();
		Integer incomeSum = houseHoldAccountBookModel.findIncomeSum();
		Integer spendingSum = houseHoldAccountBookModel.findSpendingSum();

		String sIncomeSum = StringUtil.separate((Integer) incomeSum) + "円";
		String sSpendingSum = StringUtil.separate((Integer) spendingSum) + "円";

		Map<String, String> integerMap = new HashMap<String, String>();
		integerMap.put("incomeSum", sIncomeSum);
		integerMap.put("spendingSum", sSpendingSum);
		setAttrResponse(integerMap);

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
