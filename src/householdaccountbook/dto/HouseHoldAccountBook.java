package householdaccountbook.dto;

/*************************************************
 * 家計簿DTOクラス
 * 作成日: 2019/08/11
 *
 *************************************************/
public class HouseHoldAccountBook {

	// 家計簿コード
	private Integer HouseHoldAccountBookCode;
	// 費目クラス
	private Expense expense;
	// ユーザークラス
	private User user;
	// 日付
	private String date;
	// 品名
	private String name;
	// 収入
	private Integer income;
	// 支出
	private Integer spending;

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
	public Integer getHouseHoldAccountBookCode() {
		return HouseHoldAccountBookCode;
	}

	/**
	 * 家計簿コード setter
	 *
	 * @param houseHoldAccountBookCode 家計簿コード
	 */
	public void setHouseHoldAccountBookCode(Integer houseHoldAccountBookCode) {
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
	public Integer getIncome() {
		return income;
	}

	/**
	 * 収入 setter
	 *
	 * @param income 収入
	 */
	public void setIncome(Integer income) {
		this.income = income;
	}

	/**
	 * 支出 getter
	 *
	 * @return 支出
	 */
	public Integer getSpending() {
		return spending;
	}

	/**
	 * 支出 setter
	 *
	 * @param spending 支出
	 */
	public void setSpending(Integer spending) {
		this.spending = spending;
	}

}
