package houserholdaccountbook.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import houserholdaccountbook.util.Util;

public class BaseModel implements Util {

	public BaseModel() {
		// TODO 自動生成されたコンストラクター・スタブ
	}

	/**
	 * データベースコネクション取得
	 *
	 * @return
	 * @throws SQLException
	 * @throws ClassNotFoundException
	 */
	protected Connection getConnection() throws SQLException, ClassNotFoundException {

		Class.forName(H2_DATABASE_DRIVER);
		return DriverManager.getConnection(H2_DATABASE_CONNECTION_URL, H2_DATABASE_CONNECTION_USERID, H2_DATABASE_CONNECTION_PASSWORD);

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
