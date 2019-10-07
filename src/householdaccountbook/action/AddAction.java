package householdaccountbook.action;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import householdaccountbook.model.HouseHoldAccountBookModel;

//==================================================================
// 登録・更新用アクションクラス
// 作成日: 2019/09/21
//
//==================================================================
public class AddAction extends BaseAction {

	/**
	 * メンバ変数
	 *
	 */
	private String json;
	private String data;

	/**
	 * json getter
	 *
	 * @return
	 */
	public String getJson() {
		return json;
	}

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
	public AddAction() {
		json = null;
	}


	/**
	 * 追加処理
	 *
	 */
	public String insert() {

		Gson gson = new Gson();

		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		int houseAccountBookCode = model.findHouseHoldAccountBookCode();
//		model.insert();

		List<String> list = new ArrayList<String>();
		json = gson.toJson(list);
		return ACTION_SUCCESS;
	}

}
