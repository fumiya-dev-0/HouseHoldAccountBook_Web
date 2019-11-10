package householdaccountbook.action.list;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.Expense;
import householdaccountbook.model.entity.ExpenseModel;

/*************************************************
 * 一覧画面コンボボックスデータ取得アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class SearchComboAction extends AbstractAction {

	@Override
	public String execute() {

		ExpenseModel model = new ExpenseModel();
		List<Expense> expenses = model.load();

		Map<String, List<Expense>> resultMap = new HashMap<String, List<Expense>>();
		resultMap.put("expenses", expenses);
		setAttrResponse(resultMap);

		return ACTION_SUCCESS;
	}

}
