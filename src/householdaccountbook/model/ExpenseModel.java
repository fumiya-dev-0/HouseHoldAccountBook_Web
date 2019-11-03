package householdaccountbook.model;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

import householdaccountbook.dto.Expense;

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
		criteria.addOrder(Order.asc("displayOrder"));
		List<Expense> list = criteria.list();

		session.close();

		return list;
	}
}
