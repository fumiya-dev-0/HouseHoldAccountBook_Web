package householdaccountbook.dto;

public class Expense {

	/**
	 * メンバ変数
	 *
	 */
	private int expenseCode;
	private String name;
	private int displayOrder;

	/**
	 * コンストラクタ
	 *
	 */
	public Expense() {
		expenseCode = -1;
		name = null;
		displayOrder = -1;
	}

	/**
	 * 費目コード getter
	 *
	 * @return
	 */
	public int getExpenseCode() {
		return expenseCode;
	}

	/**
	 * 費目コード setter
	 *
	 * @return
	 */
	public void setExpenseCode(int expenseCode) {
		this.expenseCode = expenseCode;
	}

	/**
	 * 費目名 getter
	 *
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * 費目名 setter
	 *
	 * @return
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 表示順 getter
	 *
	 * @return
	 */
	public int getDisplayOrder() {
		return displayOrder;
	}

	/**
	 * 表示順 setter
	 *
	 * @return
	 */
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}

}
