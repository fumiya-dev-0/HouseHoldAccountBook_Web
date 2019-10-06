package householdaccountbook.model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

import householdaccountbook.dto.Expense;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.dto.User;

//==================================================================
// 一覧画面用モデルクラス
// 作成日: 2019/10/03
//
//==================================================================
public class ListModel extends BaseModel {

	/**
	 * コンストラクタ
	 *
	 */
	public ListModel() {}

	/**
	 * 読み込み
	 *
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public List<HouseHoldAccountBook> load(int userCode) throws SQLException {

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

		List<HouseHoldAccountBook> list = new ArrayList<HouseHoldAccountBook>();

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
//				.addEntity(HouseHoldAccountBook.class)
				.setParameter("userCode", userCode);

		for(Object[] obj : query.list()) {

			HouseHoldAccountBook houseHoldAccountBook = new HouseHoldAccountBook();
			houseHoldAccountBook.setUser(new User());
			houseHoldAccountBook.getUser().setUserCode((int) obj[0]);
			houseHoldAccountBook.setHouseHoldAccountBookCode((int) obj[1]);
			houseHoldAccountBook.setName((String) obj[2]);
			houseHoldAccountBook.setExpense(new Expense());
			houseHoldAccountBook.getExpense().setExpenseCode((int) obj[3]);
			houseHoldAccountBook.getExpense().setName((String) obj[4]);
			houseHoldAccountBook.setDate((String) obj[5]);
			houseHoldAccountBook.setIncome((int) obj[6]);
			houseHoldAccountBook.setSpending((int) obj[7]);

			list.add(houseHoldAccountBook);
		}

		session.close();

		return list;
	}

}
