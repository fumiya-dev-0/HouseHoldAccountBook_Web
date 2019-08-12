package houserholdaccountbook;

public class HouseHoldAccountBook {

	/**
	 * メンバ変数
	 *
	 */
	private int HouseHoldAccountBookCode;
	private Expense expense;
	private User user;
	private String date;
	private String name;
	private int income;
	private int spending;

	/**
	 * コンストラクタ
	 *
	 */
	public HouseHoldAccountBook() {
		this.HouseHoldAccountBookCode = -1;
		this.expense = null;
		this.user = null;
		this.date = null;
		this.name = null;
		this.income = -1;
		this.spending = -1;
	}

	/**
	 * 家計簿コードの設定
	 *
	 * @return
	 */
	public int getHouseHoldAccountBookCode() {
		return HouseHoldAccountBookCode;
	}

	/**
	 * 家計簿コードの取得
	 *
	 * @return
	 */
	public void setHouseHoldAccountBookCode(int houseHoldAccountBookCode) {
		this.HouseHoldAccountBookCode = houseHoldAccountBookCode;
	}

	/**
	 * 費目テーブルの設定
	 *
	 * @return
	 */
	public Expense getExpense() {
		return expense;
	}

	/**
	 * 費目テーブルの取得
	 * @param expense
	 */
	public void setExpense(Expense expense) {
		this.expense = expense;
	}

	/**
	 * ユーザーテーブルの取得
	 *
	 * @return
	 */
	public User getUser() {
		return user;
	}

	/**
	 * ユーザーテーブルの設定
	 * @param user
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * 日付の取得
	 *
	 * @return
	 */
	public String getDate() {
		return date;
	}

	/**
	 * 日付の設定
	 *
	 * @param date
	 */
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * 品名の取得
	 *
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * 日付の設定
	 *
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 収入の取得
	 *
	 * @return
	 */
	public int getIncome() {
		return income;
	}

	/**
	 * 収入の設定
	 * @param income
	 */
	public void setIncome(int income) {
		this.income = income;
	}

	/**
	 * 支出の取得
	 * @return
	 */
	public int getSpending() {
		return spending;
	}

	/**
	 * 支出の設定
	 * @param spending
	 */
	public void setSpending(int spending) {
		this.spending = spending;
	}

}
