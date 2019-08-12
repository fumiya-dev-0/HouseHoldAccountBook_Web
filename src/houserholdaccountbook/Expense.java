package houserholdaccountbook;

public class Expense {

	/**
	 * メンバ変数
	 *
	 */
	private int expenseCode;
	private String name;
	private String displayOrder;

	public Expense() {
		expenseCode = -1;
		name = null;
		displayOrder = null;
	}
	/**
	 * アクセサ
	 *
	 * @return
	 */
	public int getExpenseCode() {
		return expenseCode;
	}
	public void setExpenseCode(int expenseCode) {
		this.expenseCode = expenseCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(String displayOrder) {
		this.displayOrder = displayOrder;
	}



}
