package householdaccountbook.model;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

/*************************************************
 * 一覧画面用モデルクラス
 * 作成日: 2019/10/03
 *
 *************************************************/
public class ListModel extends BaseModel {

	/**
	 * コンストラクタ
	 *
	 */
	public ListModel() {}

	/**
	 * 読み込み
	 *
	 * @param userCode ユーザーコード
	 * @param year 年月
	 * @return 家計簿情報リスト
	 * @throws SQLException
	 */
	@SuppressWarnings({ "unchecked" })
	public List<Object[]> load(int userCode, String year) throws SQLException {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append("       hhab.USER_CODE");
		sql.append("      ,hhab.HOUSEHOLDACCOUNTBOOK_CODE");
		sql.append("      ,hhab.NAME as HOUSEHOLDACCOUNTBOOK_NAME");
		sql.append("      ,expense.EXPENSE_CODE");
		sql.append("      ,expense.NAME");
		sql.append("      ,hhab.DATE");
		sql.append("      ,hhab.INCOME");
		sql.append("      ,hhab.SPENDING");

		// 家計簿テーブル
		sql.append(" from HOUSEHOLDACCOUNTBOOK hhab");
		// 費目テーブル
		sql.append(" inner join EXPENSE expense");
		sql.append(" on hhab.EXPENSE_CODE = expense.EXPENSE_CODE");
		sql.append(" where hhab.USER_CODE = :userCode");
		if(year != null) sql.append(" and concat(substr(hhab.DATE, 1, 4), substr(hhab.DATE, 5, 2)) = :year");

		Query<Object[]> query = session
				.createSQLQuery(sql.toString())
				.addScalar("USER_CODE", StandardBasicTypes.INTEGER)
				.addScalar("HOUSEHOLDACCOUNTBOOK_CODE", StandardBasicTypes.INTEGER)
				.addScalar("HOUSEHOLDACCOUNTBOOK_NAME", StandardBasicTypes.STRING)
				.addScalar("EXPENSE_CODE", StandardBasicTypes.INTEGER)
				.addScalar("NAME", StandardBasicTypes.STRING)
				.addScalar("DATE", StandardBasicTypes.STRING)
				.addScalar("INCOME", StandardBasicTypes.INTEGER)
				.addScalar("SPENDING", StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);
		if(year != null) query.setParameter("year", year);

		List<Object[]> list = query.list();

		session.close();

		return list;
	}

}
