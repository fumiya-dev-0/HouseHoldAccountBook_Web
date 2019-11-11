/*************************************************
 * 定数用クラス
 * 作成日: 2019/11/03
 *
 *************************************************/
/** タブメニューのインスタンス生成 */
Constants.TAB_INSTANCE_FUNC = {
		["LIST_PAGE"]: () => {
			new TabbodyListpage();
		}
}

/*************************************************
 * タブ画面
 *************************************************/
/** 一覧画面 */
/** 初期表示テーブル(ヘッダー) */
Constants.TABBODY_LISTPAGE_PARAM_TABLE = {
		attr: {
			id: "table"
		},
		columns: [
			{
				text: "家計簿コード",
				css: {
					width: "0px",
					display: "none"
				}
			},
			{
				text: "費用コード",
				css: {
					width: "0px",
					display: "none"
				}
			},
			{
				text: "品名",
				css: {
					width: "200px"
				}
			},
			{
				text: "費目",
				css: {
					width: "100px"
				}
			},
			{
				text: "日付",
				css: {
					width: "150px"
				}
			},
			{
				text: "収入",
				css: {
					width: "100px"
				}
			},
			{
				text: "支出",
				css: {
					width: "100px"
				}
			}
			]
};

/** ダイアログのフォーム */
Constants.TABBODY_LISTPAGE_PARAM_FORM = {
		rows: [
			{
				textArea: {
					text: "家計簿コード",
					css: {
						display: "none"
					}
				},
				inputArea: [
					{
						element: "input",
						attr: {
							type: "hidden",
							id: "householdaccountbook-code"
						},
						css: {
							display: "none"
						}
					}
					]
			},
			{
				textArea: {
					text: "名前",
					css: {
						padding: "8px"
					}
				},
				inputArea: [
					{
						element: "input",
						attr: {
							type: "text",
							id: "name"
						},
						css: {
							width : "200px",
							padding : "4px"
						}
					},
					{
						element: "span",
						attr: {
							id: "name-error"
						},
						css: {
							width : "300px",
							color: "red",
							"font-size": "12px",
							"margin-left": "10px"
						}
					}
					]
			},
			{
				textArea: {
					text: "日付",
					css: {
						padding: "8px"
					}
				},
				inputArea: [
					{
						element: "input",
						attr: {
							type: "date",
							id: "date"
						},
						css: {
							width: "200px",
							padding : "4px"
						}
					},
					{
						element: "span",
						attr: {
							id: "date-error"
						},
						css: {
							width : "300px",
							color: "red",
							"font-size": "12px",
							"margin-left": "10px"
						}
					}
					]
			},
			{
				textArea: {
					text: "費目",
					css: {
						padding: "8px"
					}
				},
				inputArea: [
					{
						element: "select",
						attr: {
							id: "expense-name"
						},
						css: {
							width: "210px",
							padding: "4px"
						}
					},
					{
						element: "span",
						attr: {
							id: "expense-name-error"
						},
						css: {
							width : "300px",
							color: "red",
							"font-size": "12px",
							"margin-left": "10px"
						}
					}
					]
			},
			{
				textArea: {
					text: "所得",
					css: {
						padding: "8px"
					}
				},
				inputArea: [
					{
						element: "input",
						attr: {
							type: "number",
							id: "income"
						},
						css: {
							width: "200px",
							padding: "4px"
						}
					},
					{
						element: "span",
						attr: {
							id: "income-error"
						},
						css: {
							width : "300px",
							color: "red",
							"font-size": "12px",
							"margin-left": "10px"
						}
					}
					]
			},
			{
				textArea: {
					text: "出費",
					css: {
						padding: "8px"
					}
				},
				inputArea: [
					{
						element: "input",
						attr: {
							type: "number",
							id: "spending"
						},
						css: {
							width: "200px",
							padding : "4px"
						}
					},
					{
						element: "span",
						attr: {
							id: "spending-error"
						},
						css: {
							width : "300px",
							color: "red",
							"font-size": "12px",
							"margin-left": "10px"
						}
					}
					]
			}
			]
};

/**
 * コンストラクタ
 *
 */
function Constants(){}