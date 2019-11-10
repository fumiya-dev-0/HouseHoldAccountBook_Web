package householdaccountbook.action.list;

import java.util.ArrayList;
import java.util.List;

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
	public String execute() {

		String data = getParam(Constants.DATA);
		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		Gson gson = new Gson();

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
		request.setAttribute("data", gson.toJson(list));
		return ACTION_SUCCESS;
	}



}
