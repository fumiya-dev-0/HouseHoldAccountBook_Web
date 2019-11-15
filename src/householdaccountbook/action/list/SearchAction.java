package householdaccountbook.action.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.model.list.ListModel;
import householdaccountbook.util.AppConstants;
import householdaccountbook.util.DateUtil;
import householdaccountbook.util.ParamHelper;
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
		String year = ParamHelper.getParam(AppConstants.YEAR);
		// ユーザーコード
		Integer userCode = Integer.parseInt(ParamHelper.getSession(SESSION_USER_CODE));

		ListModel listModel = new ListModel();
		List<Object[]> list = (year == null) ? listModel.load(userCode, null) : listModel.load(userCode, year);

		// 合計マップ
		Map<Integer, Integer> sumMap = new HashMap<Integer, Integer>();
		sumMap.put(5, 0);
		sumMap.put(6, 0);
		// 結果リストを合計マップに変換
		convertSumMap(list, sumMap);

		resultMap.put("resultList", convertList(list));

		// 収入
		String incomeSum = String.format("%s円", StringUtil.separate(sumMap.get(5)));
		// 支出
		String spendingSum = String.format("%s円", StringUtil.separate(sumMap.get(6)));

		resultMap.put("incomeSum", incomeSum);
		resultMap.put("spendingSum", spendingSum);

		ParamHelper.setServerParam(resultMap);

		return ACTION_SUCCESS;
	}

	/**
	 * 合計マップに変換
	 *
	 * @param list 家計簿データリスト
	 * @param sumMap 合計マップ
	 * @return 合計マップ
	 */
	private void convertSumMap(List<Object[]> list, Map<Integer, Integer> sumMap) {

		for(Object[] obj : list) {
			for(Map.Entry<Integer, Integer> entry : sumMap.entrySet()) {
				Integer sum = (Integer) obj[entry.getKey()];
				sum += sumMap.get(entry.getKey());
				sumMap.put(entry.getKey(), sum);
			}
		}

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
