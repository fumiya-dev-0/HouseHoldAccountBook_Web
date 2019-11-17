package householdaccountbook.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Projections;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

import householdaccountbook.base.BaseModel;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.util.AppConstants;
import householdaccountbook.util.HtmlConstants;

/*************************************************
 * 家計簿モデルクラス
 * 作成日: 2019/09/21
 *
 *************************************************/
public class HouseHoldAccountBookModel extends BaseModel {

	/**
	 * 家計簿情報の取得
	 *
	 * @return 家計簿情報
	 */
	@SuppressWarnings({ "deprecation", "unchecked" })
	public HouseHoldAccountBook findCode(Integer houseHoldAccountBookCode) {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		List<HouseHoldAccountBook> houseHoldAccountBook = (List<HouseHoldAccountBook>) criteria.add(Expression.eq(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, houseHoldAccountBookCode)).list();
		session.close();

		return houseHoldAccountBook.get(0);
	}

	/**
	 * 家計簿コードの連番取得
	 *
	 * @return 家計簿コード
	 */
	@SuppressWarnings("deprecation")
	public Integer maxCode() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		Integer houseHoldAccountBookCode = ((Integer) criteria.setProjection(Projections.max(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)).uniqueResult()).intValue() + 1;
		session.close();

		return houseHoldAccountBookCode;
	}

	/**
	 * 件数取得
	 *
	 * @return 件数
	 */
	@SuppressWarnings("unchecked")
	public Integer count(Integer userCode, String year) {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append(" count(*) as ").append(AppConstants.COUNT);
		// 家計簿テーブル
		sql.append(" from ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK);
		sql.append(" where ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.USER_CODE).append(" = :userCode");
		if(year != null) {
			sql.append(" and concat(substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 1, 4), substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 5, 2)) = :year");
		}

		Query<Integer> query = session
				.createSQLQuery(sql.toString())
				.addScalar(AppConstants.COUNT, StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);
		if(year != null) {
			query.setParameter("year", year);
		}

		Integer count = (Integer) query.list().get(0);

		session.close();

		return count;
	}

	/**
	 * 合計取得
	 *
	 * @return 合計値
	 */
	@SuppressWarnings("unchecked")
	public Integer sum(String col, Integer userCode, String year) {

		Session session = getSession();

		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append(" sum(").append(col).append(") as ").append(col);
		// 家計簿テーブル
		sql.append(" from ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK);
		sql.append(" where ").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.USER_CODE).append(" = :userCode");
		if(year != null) {
			sql.append(" and concat(substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 1, 4), substr(").append(AppConstants.T_HOUSE_HOLD_ACCOUNT_BOOK).append(".").append(AppConstants.DATE).append(", 5, 2)) = :year");
		}

		Query<Integer> query = session
				.createSQLQuery(sql.toString())
				.addScalar(col, StandardBasicTypes.INTEGER)
				.setParameter("userCode", userCode);
		if(year != null) {
			query.setParameter("year", year);
		}

		Integer sum = (Integer) query.list().get(0);
		session.close();

		return sum;
	}


	/**
	 * 登録更新処理
	 *
	 * @param houseHoldAccountBook 家計簿クラス
	 * @param insertFlg 追加フラグ
	 * @return 処理成功フラグ
	 */
	public boolean upsert(HouseHoldAccountBook houseHoldAccountBook, Boolean insertFlg) {

		boolean isSuccess = true;

		Session session = getSession();
		Transaction transaction = session.beginTransaction();
		try {
			if(insertFlg) {
				session.save(houseHoldAccountBook);
			}else{
				session.update(houseHoldAccountBook);
			}
			session.flush();
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			isSuccess = false;
		} finally {
			if(session != null) {
				session.close();
			}
		}
		return isSuccess;
	}

	/**
	 * 削除処理
	 *
	 * @param houseHoldAccountBook 家計簿クラス
	 * @param insertFlg 追加フラグ
	 * @return 処理成功フラグ
	 */
	public boolean delete(HouseHoldAccountBook houseHoldAccountBook) {

		boolean isSuccess = true;

		Session session = getSession();
		Transaction transaction = session.beginTransaction();
		try {
			session.delete(houseHoldAccountBook);
			session.flush();
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			isSuccess = false;
		} finally {
			if(session != null) {
				session.close();
			}
		}
		return isSuccess;
	}

}
