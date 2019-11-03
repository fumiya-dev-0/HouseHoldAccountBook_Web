package householdaccountbook.dto;

/*************************************************
 * 家計簿DTOクラス
 * 作成日: 2019/08/11
 *
 *************************************************/
public class HouseHoldAccountBook {

	// 家計簿コード
	private int HouseHoldAccountBookCode;
	// 費目クラス
	private Expense expense;
	// ユーザークラス
	private User user;
	// 日付
	private String date;
	// 品名
	private String name;
	// 収入
	private int income;
	// 支出
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
	 * 家計簿コード getter
	 *
	 * @return 家計簿コード
	 */
	public int getHouseHoldAccountBookCode() {
		return HouseHoldAccountBookCode;
	}

	/**
	 * 家計簿コード setter
	 *
	 * @param houseHoldAccountBookCode 家計簿コード
	 */
	public void setHouseHoldAccountBookCode(int houseHoldAccountBookCode) {
		this.HouseHoldAccountBookCode = houseHoldAccountBookCode;
	}

	/**
	 * 費目クラス getter
	 *
	 * @return 費目クラス
	 */
	public Expense getExpense() {
		return expense;
	}

	/**
	 * 費目クラス setter
	 *
	 * @param expense 費目クラス
	 */
	public void setExpense(Expense expense) {
		this.expense = expense;
	}

	/**
	 * ユーザークラス getter
	 *
	 * @return ユーザークラス
	 */
	public User getUser() {
		return user;
	}

	/**
	 * ユーザークラス setter
	 *
	 * @param user ユーザークラス
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * 日付 getter
	 *
	 * @return 日付
	 */
	public String getDate() {
		return date;
	}

	/**
	 * 日付 setter
	 *
	 * @param date 日付
	 */
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * 品名 getter
	 *
	 * @return 品名
	 */
	public String getName() {
		return name;
	}

	/**
	 * 品名 setter
	 *
	 * @param name 品名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 収入 getter
	 *
	 * @return 収入
	 */
	public int getIncome() {
		return income;
	}

	/**
	 * 収入 setter
	 *
	 * @param income 収入
	 */
	public void setIncome(int income) {
		this.income = income;
	}

	/**
	 * 支出 getter
	 *
	 * @return 支出
	 */
	public int getSpending() {
		return spending;
	}

	/**
	 * 支出 setter
	 *
	 * @param spending 支出
	 */
	public void setSpending(int spending) {
		this.spending = spending;
	}

}
