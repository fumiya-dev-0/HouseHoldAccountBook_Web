package householdaccountbook.base;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import householdaccountbook.model.util.ModelCommon;

/*************************************************
 * ベースモデルクラス
 * 作成日: 2019/08/04
 *
 *************************************************/
public class BaseModel implements ModelCommon {

	/**
	 * セッションの取得
	 *
	 * @return セッション情報
	 */
	protected Session getSession() {
		Configuration configuration = new Configuration().configure(HIBERNATE_CONFIG_PATH);
		SessionFactory factory = configuration.buildSessionFactory();
		return factory.openSession();
	}
}
