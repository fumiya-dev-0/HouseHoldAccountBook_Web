package householdaccountbook.action.list;

import org.apache.commons.lang.math.NumberUtils;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.dto.User;
import householdaccountbook.model.entity.HouseHoldAccountBookModel;
import householdaccountbook.util.AppConstants;

/*************************************************
 * 一覧画面登録更新アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class UpsertAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		// 家計簿コード
		Integer houseHoldAccountBookCode = NumberUtils.isNumber(getParam(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) ? Integer.valueOf(getParam(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) : null;
		// 品名
		String name = getParam(AppConstants.NAME);
		// 日付
		String date = getParam(AppConstants.DATE);
		// 費目コード
		Integer expenseCode = NumberUtils.isNumber(getParam(AppConstants.EXPENSE_CODE)) ? Integer.valueOf(getParam(AppConstants.EXPENSE_CODE)) : null;
		// 収入
		Integer income = NumberUtils.isNumber(getParam(AppConstants.INCOME)) ? Integer.valueOf(getParam(AppConstants.INCOME)) : null;
		// 支出
		Integer spending = NumberUtils.isNumber(getParam(AppConstants.SPENDING)) ? Integer.valueOf(getParam(AppConstants.SPENDING)) : null;

		HouseHoldAccountBook houseHoldAccountBook = createHouseHoldAccountBook(houseHoldAccountBookCode, name, date, expenseCode, income, spending);
		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		if(houseHoldAccountBook.getHouseHoldAccountBookCode() == null) {
			// 自動採番
			houseHoldAccountBook.setHouseHoldAccountBookCode(model.findHouseHoldAccountBookCode());
			// 登録処理
			if(!model.upsert(houseHoldAccountBook, true)) {
				return ACTION_ERROR;
			}
		}else{
			// 更新処理
			if(!model.upsert(houseHoldAccountBook, false)) {
				return ACTION_ERROR;
			}
		}

		return ACTION_SUCCESS;
	}

	/**
	 * 家計簿クラスの作成
	 *
	 * @param houseHoldAccountBookCode 家計簿コード
	 * @param name 品名
	 * @param date 日付
	 * @param expenseCode 費目コード
	 * @param income 収入
	 * @param spending 支出
	 * @return 家計簿クラス
	 */
	private HouseHoldAccountBook createHouseHoldAccountBook(Integer houseHoldAccountBookCode, String name, String date, Integer expenseCode, Integer income, Integer spending) {

		HouseHoldAccountBook houseHoldAccountBook = new HouseHoldAccountBook();
		Integer userCode = Integer.parseInt(getSessionAttribute(SESSION_USER_CODE));
		houseHoldAccountBook.setHouseHoldAccountBookCode(houseHoldAccountBookCode);
		houseHoldAccountBook.setName(name);
		houseHoldAccountBook.setDate(date);
		houseHoldAccountBook.setIncome(income);
		houseHoldAccountBook.setSpending(spending);
		houseHoldAccountBook.setExpense(new Expense());
		houseHoldAccountBook.getExpense().setExpenseCode(expenseCode);
		houseHoldAccountBook.setUser(new User());
		houseHoldAccountBook.getUser().setUserCode(userCode);

		return houseHoldAccountBook;
	}

}
