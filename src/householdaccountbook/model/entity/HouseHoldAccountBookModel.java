package householdaccountbook.model.entity;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projections;

import householdaccountbook.base.BaseModel;
import householdaccountbook.dto.HouseHoldAccountBook;

/*************************************************
 * 家計簿モデルクラス
 * 作成日: 2019/09/21
 *
 *************************************************/
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
		int houseHoldAccountBookCode = ((Long) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue() + 1;
		session.close();

		return houseHoldAccountBookCode;
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

}
