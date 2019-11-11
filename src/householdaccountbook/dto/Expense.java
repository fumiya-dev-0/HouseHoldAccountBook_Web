package householdaccountbook.dto;

/*************************************************
 * 費目DTOクラス
 * 作成日: 2019/08/11
 *
 *************************************************/
public class Expense {

	// 費目コード
	private Integer expenseCode;
	// 費目名
	private String name;
	// 表示順
	private Integer displayOrder;

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
	 * @return 費目コード
	 */
	public Integer getExpenseCode() {
		return expenseCode;
	}

	/**
	 * 費目コード setter
	 *
	 * @param expenseCode 費目コード
	 */
	public void setExpenseCode(Integer expenseCode) {
		this.expenseCode = expenseCode;
	}

	/**
	 * 費目名 getter
	 *
	 * @return 費目名
	 */
	public String getName() {
		return name;
	}

	/**
	 * 費目名 setter
	 *
	 * @param name 費目名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 表示順 getter
	 *
	 * @return 表示順
	 */
	public Integer getDisplayOrder() {
		return displayOrder;
	}

	/**
	 * 表示順 setter
	 *
	 * @param displayOrder 表示順
	 */
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

}
