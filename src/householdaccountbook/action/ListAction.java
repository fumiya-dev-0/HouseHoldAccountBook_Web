package householdaccountbook.action;

import java.sql.SQLException;
import java.util.List;

import com.google.gson.Gson;

import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.model.ExpenseModel;
import householdaccountbook.model.ListModel;

//==================================================================
// 一覧画面用アクションクラス
// 作成日: 2019/09/21
//
//==================================================================
public class ListAction extends BaseAction {

	/**
	 * メンバ変数
	 *
	 */
	private String json;

	/**
	 * json getter
	 *
	 * @return
	 */
	public String getJson() {
		return json;
	}

	/**
	 * コンストラクタ
	 *
	 */
	public ListAction() {
		json = null;
	}

	/**
	 * 画面表示
	 *
	 * @return
	 */
	public String show() {

		Gson gson = new Gson();
		ListModel model = new ListModel();
		try {
			List<HouseHoldAccountBook> houseHoldAccountBooks = model.load(Integer.parseInt(getSessionAttribute(SESSION_USER_CODE)));
			json = gson.toJson(houseHoldAccountBooks);
		} catch (SQLException e) {
			e.printStackTrace();
			setErrorMessage(SQL_ERROR);
		}

		return ACTION_SUCCESS;
	}

	/**
	 * コンボボックスデータ読み込み
	 *
	 * @return
	 */
	public String loadCombo() {

		Gson gson = new Gson();
		ExpenseModel model = new ExpenseModel();

		List<Expense> expenses = model.load();
		json = gson.toJson(expenses);

		return ACTION_SUCCESS;
	}

}
