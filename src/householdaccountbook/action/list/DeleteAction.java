/**
 *
 */
package householdaccountbook.action.list;

import org.apache.commons.lang.math.NumberUtils;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.model.entity.HouseHoldAccountBookModel;
import householdaccountbook.util.AppConstants;
import householdaccountbook.util.ParamHelper;

/*************************************************
 * 一覧画面データ削除アクションクラス
 * 作成日: 2019/11/11
 *
 *************************************************/
public class DeleteAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		// 家計簿コード
		Integer houseHoldAccountBookCode = NumberUtils.isNumber(ParamHelper.getParam(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) ? Integer.valueOf(ParamHelper.getParam(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) : null;

		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		HouseHoldAccountBook houseHoldAccountBook = model.findHouseHoldAccountBookCode(houseHoldAccountBookCode);
		// 登録処理
		if(!model.delete(houseHoldAccountBook)) {
			return ACTION_ERROR;
		}

		return ACTION_SUCCESS;
	}

}
