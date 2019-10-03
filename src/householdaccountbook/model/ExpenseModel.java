package householdaccountbook.model;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;

import householdaccountbook.dto.Expense;

//==================================================================
// 費目モデルクラス
// 作成日: 2019/10/03
//
//==================================================================
public class ExpenseModel extends BaseModel {

	/**
	 * コンストラクタ
	 *
	 */
	public ExpenseModel() {}

	/**
	 * コンボボックス用読み込み処理
	 *
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Expense> loadCombo() {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append("       expense.EXPENSE_CODE");
		sql.append("      ,expense.NAME");
		sql.append("      ,expense.DISPLAY_ORDER");
		// 費目テーブル
		sql.append(" from EXPENSE expense");

		Query<Expense> query = session.createSQLQuery(sql.toString()).addEntity(Expense.class);

		List<Expense> list = query.list();

		session.close();

		return list;
	}
}
