package householdaccountbook.model.list;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

import householdaccountbook.base.BaseModel;
import householdaccountbook.util.AppConstants;

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
		sql.append("  ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_HOUSE_HOLD_ACCOUNT_BOOK_CODE);
		sql.append("  ,").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.C_EXPENSE_CODE);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.NAME_SNAKE).append(" as HOUSEHOLDACCOUNTBOOK_NAME");
		sql.append("  ,").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.NAME_SNAKE);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_DATE);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_INCOME);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_SPENDING);

		// 家計簿テーブル
		sql.append(" from ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK);
		// 費目テーブル
		sql.append(" inner join ").append(AppConstants.M_EXPENSE);
		sql.append(" on ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_EXPENSE_CODE).append(" = ").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.C_EXPENSE_CODE);
		sql.append(" where ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_USER_CODE).append(" = :userCode");
		if(year != null) {
			sql.append(" and concat(substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_DATE).append(", 1, 4), substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.C_DATE).append(", 5, 2)) = :year");
		}

		Query<Object[]> query = session
				.createSQLQuery(sql.toString())
				.addScalar(AppConstants.C_HOUSE_HOLD_ACCOUNT_BOOK_CODE, StandardBasicTypes.INTEGER)
				.addScalar(AppConstants.C_EXPENSE_CODE, StandardBasicTypes.INTEGER)
				.addScalar("HOUSEHOLDACCOUNTBOOK_NAME", StandardBasicTypes.STRING)
				.addScalar(AppConstants.NAME_SNAKE, StandardBasicTypes.STRING)
				.addScalar(AppConstants.C_DATE, StandardBasicTypes.STRING)
				.addScalar(AppConstants.C_INCOME, StandardBasicTypes.INTEGER)
				.addScalar(AppConstants.C_SPENDING, StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);
		if(year != null) {
			query.setParameter("year", year);
		}

		List<Object[]> list = query.list();

		session.close();

		return list;
	}

}
