package houserholdaccountbook.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

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

}
