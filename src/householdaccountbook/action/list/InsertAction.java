package householdaccountbook.action.list;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.dto.User;
import householdaccountbook.model.entity.HouseHoldAccountBookModel;
import householdaccountbook.util.Constants;

/*************************************************
 * 一覧画面データ登録更新アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class InsertAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		String data = getParam(Constants.DATA);
		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();

		int houseAccountBookCode = model.findHouseHoldAccountBookCode();
		HouseHoldAccountBook houseHoldAccountBook = createHouseHoldAccountBook(houseAccountBookCode, data);

		// 登録処理
		if(!model.insert(houseHoldAccountBook)) {
			return ACTION_ERROR;
		}

		Map<String, List<String>> resultMap = new HashMap<String, List<String>>();
		resultMap.put("insert", new ArrayList<String>());
		setAttrResponse(resultMap);
		return ACTION_SUCCESS;
	}

	/**
	 * 家計簿クラスの作成
	 *
	 * @param houseAccountBookCode 家計簿コード
	 * @param data 入力データ
	 * @return 家計簿クラス
	 */
	private HouseHoldAccountBook createHouseHoldAccountBook(int houseAccountBookCode, String data) {

		Gson gson = new Gson();
		HouseHoldAccountBook houseHoldAccountBook = gson.fromJson(data, HouseHoldAccountBook.class);
		houseHoldAccountBook.setHouseHoldAccountBookCode(houseAccountBookCode);
		houseHoldAccountBook.setUser(new User());
		houseHoldAccountBook.getUser().setUserCode(Integer.parseInt(getSessionAttribute(SESSION_USER_CODE)));

		return houseHoldAccountBook;
	}

}
