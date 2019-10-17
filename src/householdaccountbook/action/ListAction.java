package householdaccountbook.action;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.dto.User;
import householdaccountbook.model.ExpenseModel;
import householdaccountbook.model.HouseHoldAccountBookModel;
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
	private String data;

	/**
	 * パラメーター返却
	 *
	 * @return json
	 */
	public String getJson() {
		return json;
	}

	/**
	 * 入力データ(追加・更新)
	 *
	 * @return data 入力データ
	 */
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
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
	 * @return ACTION_SUCCESS
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
	 * @return ACTION_SUCCESS
	 */
	public String loadCombo() {

		Gson gson = new Gson();
		ExpenseModel model = new ExpenseModel();

		List<Expense> expenses = model.load();
		json = gson.toJson(expenses);

		return ACTION_SUCCESS;
	}

	/**
	 * 登録処理
	 *
	 */
	public String insert() {

		Gson gson = new Gson();

		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		int houseAccountBookCode = model.findHouseHoldAccountBookCode();
		HouseHoldAccountBook houseHoldAccountBook = gson.fromJson(data, HouseHoldAccountBook.class);
		houseHoldAccountBook.setHouseHoldAccountBookCode(houseAccountBookCode);
		houseHoldAccountBook.setUser(new User());
		houseHoldAccountBook.getUser().setUserCode(Integer.parseInt(getSessionAttribute(SESSION_USER_CODE)));

		// 登録処理
		if(!model.insert(houseHoldAccountBook)) {
			return ACTION_ERROR;
		}

		List<String> list = new ArrayList<String>();
		json = gson.toJson(list);
		return ACTION_SUCCESS;
	}


}
