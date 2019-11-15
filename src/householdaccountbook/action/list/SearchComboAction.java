package householdaccountbook.action.list;

import java.util.List;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.Expense;
import householdaccountbook.model.entity.ExpenseModel;
import householdaccountbook.util.ParamHelper;

/*************************************************
 * 一覧画面コンボボックスデータ取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchComboAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		ExpenseModel model = new ExpenseModel();
		List<Expense> expenses = model.load();

		resultMap.put("expenses", expenses);
		ParamHelper.setServerParam(resultMap);

		return ACTION_SUCCESS;
	}

}
