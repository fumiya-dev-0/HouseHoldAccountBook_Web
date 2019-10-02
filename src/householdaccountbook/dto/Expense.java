package householdaccountbook.dto;

public class Expense {

	/**
	 * メンバ変数
	 *
	 */
	private int expenseCode;
	private String name;
	private int displayOrder;

	public Expense() {
		expenseCode = -1;
		name = null;
		displayOrder = -1;
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
	public int getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}



}
