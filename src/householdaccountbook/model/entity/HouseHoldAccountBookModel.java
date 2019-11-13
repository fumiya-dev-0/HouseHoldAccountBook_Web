package householdaccountbook.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Projections;

import householdaccountbook.base.BaseModel;
import householdaccountbook.dto.HouseHoldAccountBook;
import householdaccountbook.util.AppConstants;

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
	public HouseHoldAccountBook findHouseHoldAccountBookCode(Integer houseHoldAccountBookCode) {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		List<HouseHoldAccountBook> houseHoldAccountBook = (List<HouseHoldAccountBook>) criteria.add(Expression.eq(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, houseHoldAccountBookCode)).list();
		session.close();

		return houseHoldAccountBook.get(0);
	}

	/**
	 * 家計簿コードの連番取得
	 *
	 * @return 家計簿コード
	 */
	@SuppressWarnings("deprecation")
	public Integer findHouseHoldAccountBookCodeMax() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		Integer houseHoldAccountBookCode = ((Integer) criteria.setProjection(Projections.max(AppConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE)).uniqueResult()).intValue() + 1;
		session.close();

		return houseHoldAccountBookCode;
	}

	/**
	 * 収入合計値取得
	 *
	 * @return 収入合計値
	 */
	@SuppressWarnings("deprecation")
	public Integer findIncomeSum() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		Integer incomeSum = ((Long) criteria.setProjection(Projections.sum("income")).uniqueResult()).intValue();
		session.close();

		return incomeSum;
	}

	/**
	 * 支出合計値取得
	 *
	 * @return 支出合計値
	 */
	@SuppressWarnings("deprecation")
	public int findSpendingSum() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		int spendingSum = ((Long) criteria.setProjection(Projections.sum("spending")).uniqueResult()).intValue();
		session.close();

		return spendingSum;
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
			}else {
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
