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
	 * 読み込み
	 *
	 * @param userCode ユーザーコード
	 * @param start データ取得開始番号
	 * @param max 1ページのデータ最大表示数
	 * @throws SQLException
	 */
	public List<Object[]> load(Integer userCode, Integer start, Integer max) throws SQLException {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append(createSelectPhrase()); // SELECT句
		sql.append(createFromWithWherePhrase(null)); // FROM,WHERE句
		sql.append(" limit ").append(start).append(", ").append(max);

		Query<Object[]> query = createObjQuery(session, sql, userCode, null);
		List<Object[]> list = query.list();

		session.close();

		return list;
	}

	/**
	 * 検索
	 *
	 * @param userCode ユーザーコード
	 * @param start データ取得開始番号
	 * @param max 1ページのデータ最大表示数
	 * @param year 年月
	 * @return 家計簿情報リスト
	 * @throws SQLException
	 */
	public List<Object[]> search(int userCode, Integer start, Integer max, String year) throws SQLException {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();

		sql.append(createSelectPhrase()); // SELECT句
		sql.append(createFromWithWherePhrase(year)); // FROM,WHERE句
		sql.append(" limit ").append(start).append(", ").append(max);

		Query<Object[]> query = createObjQuery(session, sql, userCode, year);
		List<Object[]> list = query.list();

		session.close();

		return list;
	}

	/**
	 * SELECT句の生成
	 *
	 * @param userCode ユーザーコード
	 * @param year 年月
	 * @return SELECT句
	 */
	private String createSelectPhrase() {

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append("  ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE);
		sql.append("  ,").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.EXPENSE_CODE);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.NAME).append(" as HOUSEHOLDACCOUNTBOOK_NAME");
		sql.append("  ,").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.NAME);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.INCOME);
		sql.append("  ,").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.SPENDING);

		return sql.toString();
	}

	/**
	 * FROM, WHERE句の生成
	 *
	 * @param userCode ユーザーコード
	 * @param year 年月
	 * @return WHERE句
	 */
	private String createFromWithWherePhrase(String year) {

		StringBuilder sql = new StringBuilder();
		// 家計簿テーブル
		sql.append(" from ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK);
		// 費目テーブル
		sql.append(" inner join ").append(AppConstants.M_EXPENSE);
		sql.append(" on ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.EXPENSE_CODE).append(" = ").append(AppConstants.M_EXPENSE).append(".").append(AppConstants.EXPENSE_CODE);
		sql.append(" where ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.USER_CODE).append(" = :userCode");
		if(year != null) {
			sql.append(" and concat(substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 1, 4), substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 5, 2)) = :year");
		}

		return sql.toString();
	}


	/**
	 * クエリオブジェクトの生成
	 *
	 * @param session セッション
	 * @param sql SQL
	 * @param userCode ユーザーコード
	 * @param year 年月
	 * @return クエリオブジェクト
	 */
	@SuppressWarnings("unchecked")
	private Query<Object[]> createObjQuery(Session session, StringBuilder sql, Integer userCode, String year){

		Query<Object[]> query = session
				.createSQLQuery(sql.toString())
				.addScalar(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, StandardBasicTypes.INTEGER)
				.addScalar(AppConstants.EXPENSE_CODE, StandardBasicTypes.INTEGER)
				.addScalar("HOUSEHOLDACCOUNTBOOK_NAME", StandardBasicTypes.STRING)
				.addScalar(AppConstants.NAME, StandardBasicTypes.STRING)
				.addScalar(AppConstants.DATE, StandardBasicTypes.STRING)
				.addScalar(AppConstants.INCOME, StandardBasicTypes.INTEGER)
				.addScalar(AppConstants.SPENDING, StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);
		if(year != null) {
			query.setParameter("year", year);
		}

		return query;
	}

}
