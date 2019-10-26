package householdaccountbook.model;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import householdaccountbook.util.ModelCommon;

public class BaseModel implements ModelCommon {

	public BaseModel() {}

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
