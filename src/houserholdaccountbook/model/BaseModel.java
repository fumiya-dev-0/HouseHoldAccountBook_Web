package houserholdaccountbook.model;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import houserholdaccountbook.util.Util;

public class BaseModel implements Util {

	public BaseModel() {
		// TODO 自動生成されたコンストラクター・スタブ
	}

	/**
	 * セッションの取得
	 *
	 * @return
	 */
	protected Session getSession() {
		Configuration configuration = new Configuration().configure(HIBERNATE_CONFIG_PATH);
		SessionFactory factory = configuration.buildSessionFactory();
		return factory.openSession();
	}
}
