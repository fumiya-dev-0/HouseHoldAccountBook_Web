package householdaccountbook.model;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projections;

import householdaccountbook.dto.HouseHoldAccountBook;

//==================================================================
// 家計簿モデルクラス
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
	 * 家計簿コードの連番取得
	 *
	 * @return 家計簿コード
	 */
	@SuppressWarnings("deprecation")
	public int findHouseHoldAccountBookCode() {

		Session session = getSession();

		Criteria criteria = session.createCriteria(HouseHoldAccountBook.class);
		int houseHoldAccountBookCode = ((Long) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
		session.close();

		return houseHoldAccountBookCode;
	}

	/**
	 * 追加処理
	 *
	 * @return isSuccess 処理成功フラグ
	 */
	public boolean insert(HouseHoldAccountBook houseHoldAccountBook) {

		boolean isSuccess = true;

		Session session = getSession();
		Transaction transaction = session.beginTransaction();
		try {
			session.saveOrUpdate(houseHoldAccountBook);
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
			isSuccess = false;
			transaction.rollback();
		} finally {
			session.flush();
			session.close();
		}
		return isSuccess;
	}
}
