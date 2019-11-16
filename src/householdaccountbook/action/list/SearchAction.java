package householdaccountbook.action.list;

import java.util.List;

import org.apache.commons.lang.math.NumberUtils;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.model.list.ListModel;
import householdaccountbook.util.AppConstants;
import householdaccountbook.util.DateUtil;
import householdaccountbook.util.ParamHelper;
import householdaccountbook.util.Sanitize;
import householdaccountbook.util.StringUtil;

/*************************************************
 * 一覧画面データ取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchAction extends AbstractAction {

	/** 1ページのデータ最大表示数 */
	private static final Integer PAGER_MAX = 15;

	/** 現在ページ判定 */
	private static final Integer IS_NOW_PAGE = 4;

	@Override
	public String execute() throws Exception {

		// ユーザーコード
		Integer userCode = NumberUtils.isNumber(ParamHelper.getSession(SESSION_USER_CODE)) ? Integer.parseInt(ParamHelper.getSession(SESSION_USER_CODE)) : null;

		// 年月(入力データ)
		String year = ParamHelper.getParam(AppConstants.YEAR);

		// 現在ページ
		Integer nowPage = NumberUtils.isNumber(ParamHelper.getParam(AppConstants.NOW_PAGE)) ? Integer.parseInt(ParamHelper.getParam(AppConstants.NOW_PAGE)) : 1;
		// データ取得開始番号
		Integer start = (nowPage - 1) * PAGER_MAX;

		ListModel listModel = new ListModel();
		// テーブル表示データ取得
		List<Object[]> list = year == null ? listModel.load(userCode, start, PAGER_MAX) : listModel.search(userCode, start, PAGER_MAX, year);
		// テーブル表示データフォーマット変換
		list = convertList(list);
		// テーブル表示データカウント取得
		Integer count = year == null ? listModel.count(userCode, null) : listModel.count(userCode, year);
		// 支出・収入合計リスト取得
		List<Object[]> sumList = year == null ? listModel.sum(userCode, null) : listModel.sum(userCode, year);

		// 収入
		String incomeSum = String.format("%s円", StringUtil.separate((Integer) sumList.get(0)[0]));
		// 支出
		String spendingSum = String.format("%s円", StringUtil.separate((Integer) sumList.get(0)[1]));

		// 最大ページ数
		Integer maxPage = (int) Math.ceil((double) count / PAGER_MAX);

		Integer startPage = null;
		Integer endPage = null;

		if(nowPage >= IS_NOW_PAGE) {
			startPage = nowPage - 2;
			endPage = (nowPage + 2) < maxPage ? nowPage + 2 : maxPage;
		}else{
			startPage = 1;
			endPage = 5 < maxPage ? 5 : maxPage;
		}

		resultMap.put("resultList", Sanitize.convertListUnSanitize(list));
		resultMap.put("incomeSum", incomeSum);
		resultMap.put("spendingSum", spendingSum);
		resultMap.put("nowPage", nowPage);
		resultMap.put("startPage", startPage);
		resultMap.put("endPage", endPage);
		resultMap.put("maxPage", maxPage);

		ParamHelper.setServerParam(resultMap);

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
