package householdaccountbook.action.list;

import java.util.List;

import com.google.gson.Gson;

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

		Gson gson = new Gson();

		ExpenseModel model = new ExpenseModel();
		List<Expense> expenses = model.load();
		request.setAttribute("data", gson.toJson(expenses));
		return ACTION_SUCCESS;
	}

}
