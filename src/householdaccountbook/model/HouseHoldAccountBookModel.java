package householdaccountbook.model;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

//==================================================================
// 家計簿テーブル用モデルクラス
// 作成日: 2019/09/21
//
//==================================================================

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
	public List<Object[]> load(int userCode) throws SQLException {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append("       hhab.HOUSEHOLDACCOUNTBOOK_CODE");
		sql.append("      ,hhab.NAME as HOUSEHOLDACCOUNTBOOK_NAME");
		sql.append("      ,expense.EXPENSE_CODE");
		sql.append("      ,expense.NAME");
		sql.append("      ,hhab.DATE");
		sql.append("      ,hhab.INCOME");
		sql.append("      ,hhab.SPENDING");
		// 家計簿テーブル
		sql.append(" from HOUSEHOLDACCOUNTBOOK hhab");
		// ユーザーテーブル
		sql.append(" inner join USER user");
		sql.append(" on hhab.USER_CODE = user.USER_CODE");
		// 費目テーブル
		sql.append(" inner join EXPENSE expense");
		sql.append(" on hhab.EXPENSE_CODE = expense.EXPENSE_CODE");
		sql.append(" where hhab.USER_CODE = :userCode");

		Query<Object[]> query = session.createSQLQuery(sql.toString())
				.addScalar("HOUSEHOLDACCOUNTBOOK_CODE", StandardBasicTypes.INTEGER)
				.addScalar("HOUSEHOLDACCOUNTBOOK_NAME", StandardBasicTypes.STRING)
				.addScalar("EXPENSE_CODE", StandardBasicTypes.INTEGER)
				.addScalar("NAME", StandardBasicTypes.STRING)
				.addScalar("DATE", StandardBasicTypes.STRING)
				.addScalar("INCOME", StandardBasicTypes.INTEGER)
				.addScalar("SPENDING", StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);

		List<Object[]> list = query.list();

		session.close();

		return list;
	}

}
