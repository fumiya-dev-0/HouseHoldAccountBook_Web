package householdaccountbook.action.list;

import org.apache.commons.lang.math.NumberUtils;

import householdaccountbook.base.AbstractAction;
import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.dto.User;
import householdaccountbook.model.entity.HouseHoldAccountBookModel;
import householdaccountbook.util.HtmlConstants;
import householdaccountbook.util.ParamHelper;

/*************************************************
 * 一覧画面データ登録更新アクションクラス
 * 作成日: 2019/11/10
 *
 *************************************************/
public class UpsertAction extends AbstractAction {

	@Override
	public String execute() throws Exception {

		// 家計簿コード
		Integer houseHoldAccountBookCode = NumberUtils.isNumber(ParamHelper.getParam(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) ? Integer.valueOf(ParamHelper.getParam(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)) : null;
		// 品名
		String name = ParamHelper.getParam(HtmlConstants.NAME);
		// 日付
		String date = ParamHelper.getParam(HtmlConstants.DATE);
		// 費目コード
		Integer expenseCode = NumberUtils.isNumber(ParamHelper.getParam(HtmlConstants.EXPENSE_CODE)) ? Integer.valueOf(ParamHelper.getParam(HtmlConstants.EXPENSE_CODE)) : null;
		// 収入
		Integer income = NumberUtils.isNumber(ParamHelper.getParam(HtmlConstants.INCOME)) ? Integer.valueOf(ParamHelper.getParam(HtmlConstants.INCOME)) : null;
		// 支出
		Integer spending = NumberUtils.isNumber(ParamHelper.getParam(HtmlConstants.SPENDING)) ? Integer.valueOf(ParamHelper.getParam(HtmlConstants.SPENDING)) : null;

		HouseHoldAccountBook houseHoldAccountBook = createHouseHoldAccountBook(houseHoldAccountBookCode, name, date, expenseCode, income, spending);

		// 登録更新
		if(!upsert(houseHoldAccountBook)) {
			return ACTION_ERROR;
		}

		return ACTION_SUCCESS;
	}

	/**
	 * 登録更新処理
	 *
	 * @param houseHoldAccountBook  家計簿クラス
	 * @return true(成功) / false(失敗)
	 */
	private Boolean upsert(HouseHoldAccountBook houseHoldAccountBook) {

		HouseHoldAccountBookModel model = new HouseHoldAccountBookModel();
		if(houseHoldAccountBook.getHouseHoldAccountBookCode() == null) {
			// 自動採番
			houseHoldAccountBook.setHouseHoldAccountBookCode(model.maxCode());
			// 登録処理
			if(!model.upsert(houseHoldAccountBook, true)) {
				return false;
			}
		}else{
			// 更新処理
			if(!model.upsert(houseHoldAccountBook, false)) {
				return false;
			}
		}

		return true;
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
		Integer userCode = Integer.parseInt(ParamHelper.getSession(SESSION_USER_CODE));
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
