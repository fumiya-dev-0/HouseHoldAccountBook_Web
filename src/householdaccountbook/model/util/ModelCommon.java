package householdaccountbook.model.util;

/*************************************************
 * モデル用共通クラス
 * 作成日: 2019/10/26
 *
 *************************************************/
public interface ModelCommon {

	/** Hibernate設定ファイルパス */
	public static final String HIBERNATE_CONFIG_PATH = "householdaccountbook/hibernate.cfg.xml";

	/** データベース設定定数(H2) */
	public static final String H2_DATABASE_DRIVER = "org.h2.Driver";
	public static final String H2_DATABASE_CONNECTION_URL = "jdbc:h2:tcp://localhost/~/mydb";
	public static final String H2_DATABASE_CONNECTION_USERID = "sa";
	public static final String H2_DATABASE_CONNECTION_PASSWORD = "";

	/** データベース設定定数(MySQL) */
	public static final String MYSQL_DATABASE_DRIVER = "com.mysql.jdbc.Driver";
	public static final String MYSQL_DATABASE_CONNECTION_URL = "";
	public static final String MYSQL_DATABASE_CONNECTION_USERID = "root";
	public static final String MYSQL_DATABASE_CONNECTION_PASSWORD = "";
}
