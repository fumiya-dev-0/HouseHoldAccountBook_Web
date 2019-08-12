package houserholdaccountbook.model;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;

import houserholdaccountbook.HouseHoldAccountBook;

public class HouseHoldAccountBookModel extends BaseModel {

	/**
	 * コンストラクタ
	 *
	 */
	public HouseHoldAccountBookModel() {}

	/**
	 * 読み込み
	 *
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public List<HouseHoldAccountBook> load(int userCode) throws SQLException {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select hhab.*, expense.*");
		// 家計簿テーブル
		sql.append(" from HOUSEHOLDACCOUNTBOOK hhab");
		// ユーザーテーブル
		sql.append(" inner join USER user");
		sql.append(" on hhab.USER_CODE = user.USER_CODE");
		// 費目テーブル
		sql.append(" inner join EXPENSE expense");
		sql.append(" on hhab.EXPENSE_CODE = expense.EXPENSE_CODE");
		sql.append(" where hhab.USER_CODE = :userCode");

		Query<HouseHoldAccountBook> query = session.createSQLQuery(sql.toString()).addEntity(HouseHoldAccountBook.class);

		query.setParameter("userCode", userCode);
		List<HouseHoldAccountBook> list = query.list();

		session.close();

		return list;
	}

}
