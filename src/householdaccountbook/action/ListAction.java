package householdaccountbook.action;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.model.HouseHoldAccountBookModel;

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
		return ACTION_SUCCESS;
	}

	/**
	 * 実行
	 *
	 */
	public String execute() {

		Gson gson = new Gson();
		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		try {
			List<Object[]> list = model.load(Integer.parseInt(getSessionAttribute(SESSION_USER_CODE)));

			List<HouseHoldAccountBook> houseHoldAccountBooks = new ArrayList<HouseHoldAccountBook>();
			for(Object[] obj : list) {

				HouseHoldAccountBook houseHoldAccountBook = new HouseHoldAccountBook();
				houseHoldAccountBook.setExpense(new Expense());

				houseHoldAccountBook.setHouseHoldAccountBookCode((Integer)obj[0]);
				houseHoldAccountBook.setName((String)obj[1]);
				houseHoldAccountBook.getExpense().setExpenseCode((Integer)obj[2]);
				houseHoldAccountBook.getExpense().setName((String)obj[3]);
				houseHoldAccountBook.setDate((String)obj[4]);
				houseHoldAccountBook.setIncome((Integer)obj[5]);
				houseHoldAccountBook.setSpending((Integer)obj[6]);

				houseHoldAccountBooks.add(houseHoldAccountBook);
			}

			json = gson.toJson(houseHoldAccountBooks);

		} catch (SQLException e) {
			e.printStackTrace();
			setErrorMessage(SQL_ERROR);
		}

		return ACTION_SUCCESS;
	}

}
