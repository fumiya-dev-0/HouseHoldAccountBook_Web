package houserholdaccountbook;

import java.sql.SQLException;
import java.util.List;

import houserholdaccountbook.model.HouseHoldAccountBookModel;

public class ListAction extends BaseDBAction {

	/**
	 * メンバ変数
	 *
	 */
	private List<HouseHoldAccountBook> houseHoldAccountBooks;

	/**
	 * コンストラクタ
	 *
	 */
	public ListAction() {
		houseHoldAccountBooks = null;
	}

	/**
	 * 家計簿テーブル情報取得
	 * @return
	 */
	public List<HouseHoldAccountBook> getHouseHoldAccountBooks(){
		return houseHoldAccountBooks;
	}

	/**
	 * 画面表示
	 *
	 * @return
	 */
	public String show() {

		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		try {
			houseHoldAccountBooks = model.load(Integer.parseInt(getSessionAttribute(SESSION_USER_CODE)));
		} catch (SQLException e) {
			e.printStackTrace();
			setErrorMessage(SQL_ERROR);
		}

		return ACTION_SUCCESS;
	}



}
