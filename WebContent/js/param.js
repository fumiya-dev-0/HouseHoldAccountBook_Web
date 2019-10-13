//==================================================================
// パラメーター用共通クラス
// 作成日: 2019/10/13
//
//==================================================================
var TABBODY_LISTPAGE_PARAM_TABLE = {
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
				text: "名前",
				css: {
					width: "200px"
				}
			},
			{
				text: "表示順",
				css: {
					width: "0px",
					display: "none"
				}
			},
			{
				text: "日付",
				css: {
					width: "150px"
				}
			},
			{
				text: "費目",
				css: {
					width: "100px"
				}
			},
			{
				text: "所得",
				css: {
					width: "100px"
				}
			},
			{
				text: "出費",
				css: {
					width: "100px"
				}
			}
		]
};

var TABBODY_LISTPAGE_PARAM_FORM = {
		rows: [
			{
				text: "名前",
				css: {
					padding: "8px"
				},
				next: {
					element: "input",
					attr: {
						type: "text",
						id: "name"
					},
					css: {
						width : "200px",
						padding : "4px"
					}
				}
			},
			{
				text: "日付",
				css: {
					padding: "8px"
				},
				next: {
					element: "input",
					attr: {
						type: "date",
						id: "date"
					},
					css: {
						width: "200px",
						padding : "4px"
					}
				}
			},
			{
				text: "費目",
				css: {
					padding: "8px"
				},
				next: {
					element: "select",
					attr: {
						id: "expenseName"
					},
					css: {
						width: "200px",
						padding: "4px"
					}
				}
			},
			{
				text: "所得",
				css: {
					padding: "8px"
				},
				next: {
					element: "input",
					attr: {
						type: "number",
						id: "income"
					},
					css: {
						width: "200px",
						padding: "4px"
					}
				}
			},
			{
				text: "出費",
				css: {
					padding: "8px"
				},
				next: {
					element: "input",
					attr: {
						type: "number",
						id: "spending"
					},
					css: {
						width: "200px",
						padding : "4px"
					}
				}
			}
		]
};