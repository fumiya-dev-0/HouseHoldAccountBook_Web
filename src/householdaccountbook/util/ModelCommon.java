package householdaccountbook.util;

public interface ModelCommon {

	// Hibernate設定ファイルパス
	public static final String HIBERNATE_CONFIG_PATH = "householdaccountbook/hibernate.cfg.xml";

	public static final String LOGIN_ERROR_MESSAGE = "入力されたユーザID又はパスワードが正しくありません。";
	public static final String HASH_ERROR_MESSAGE = "ハッシュの生成に失敗しました。";

}
