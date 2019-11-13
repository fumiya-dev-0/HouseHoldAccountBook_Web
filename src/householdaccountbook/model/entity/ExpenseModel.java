package householdaccountbook.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

import householdaccountbook.base.BaseModel;
import householdaccountbook.dto.Expense;
import householdaccountbook.util.AppConstants;

/*************************************************
 * 費目モデルクラス
 * 作成日: 2019/10/03
 *
 *************************************************/
public class ExpenseModel extends BaseModel {

	/**
	 * コンストラクタ
	 *
	 */
	public ExpenseModel() {}

	/**
	 * 読み込み処理
	 *
	 * @return list 費目データのリスト
	 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	public List<Expense> load() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(Expense.class);
		criteria.addOrder(Order.asc(AppConstants.DISPLAY_ORDER));
		List<Expense> list = criteria.list();

		session.close();

		return list;
	}
}
