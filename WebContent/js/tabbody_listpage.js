//==================================================================
// 一覧画面
// 作成日: 2019/09/21
//
//==================================================================
// 費目コンボボックス定数
TabbodyListpage.prototype.EXPENSE_NAME_ROW = 2;
TabbodyListpage.prototype.EXPENSE_NAME_COLUMN = 1;

function TabbodyListpage(){

	var page = TabbodyListpage.prototype;

	// 初期処理
	page.init();

	// 画面表示
	page.show();

}

/**
 * 初期処理
 *
 */
TabbodyListpage.prototype.init = function(){

	var modalCommon = new ModalCommon();
	modalCommon.dialog({
		width: "50%",
		height: "300px",
		buttons: [
			{
				text: "登録",
				click: function(){
					page.insert();
				},
				attr: {
					id: "add_button"
				},
				css: {
					width: "60px",
					height: "30px"
				}
			},
			{
				text: "閉じる",
				click: function(){
					modalCommon.hide();
				},
				attr: {
					id: "close_button"
				},
				css: {
					width: "60px",
					height: "30px"
				}
			},
		]
	});

	/**
	 * 新規ボタン処理
	 *
	 */
	$("#new_button").on("click", $.proxy(function(){

		modalCommon.show(this);
		this.load();
	}, this));

	/**
	 * 日付ボタン処理
	 *
	 */
	$("#prev_button, #next_button").on("click", $.proxy(function(){
		this.dateChangeWithSearch(this);
	}, this));

}

/**
 * 画面表示
 *
 */
TabbodyListpage.prototype.show = function(){

	this.loadCurrentDate();

	var page = TabbodyListpage.prototype;
	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData("GET", "list", function(error, data) {
		if(!error){
			return;
		}

		var tableCommon = new TableCommon("tableArea");
		var stringCommon = new StringCommon();
		var dateCommon = new DateCommon();;

		tableCommon.table({
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
		});

		// [ 家計簿コード, 費用コード, 名前, 表示順, 日付, 費目, 取得, 出費 ]
		data.forEach(function(data){

			// 行の追加
			tableCommon.addRows(
					new Array(
							data["HouseHoldAccountBookCode"],
							data["expense"]["expenseCode"],
							data["name"],
							data["expense"]["displayOrder"],
							dateCommon.convertToSlashStringFormat(data["date"]),
							data["expense"]["name"],
							stringCommon.separate(data["income"]),
							stringCommon.separate(data["spending"])
					)
			);
		}, data);
	});
}

/**
 * 現在日時を表示
 *
 */
TabbodyListpage.prototype.loadCurrentDate = function(){

	var dateCommon = new DateCommon();

	var year = dateCommon.toDateDigits(dateCommon.getYear(), 4);
	var month = dateCommon.toDateDigits(dateCommon.getMonth(), 2);
	var day = dateCommon.toDateDigits(dateCommon.getDay(), 2);

	$("#date").val(dateCommon.convertToHyphenStringFormat(year + month + day));

}

/**
 * 日付変更ボタン処理
 *
 */
TabbodyListpage.prototype.dateChangeWithSearch = function(_this){

	// 日付変更処理
	dateChange(_this);

	// 検索処理
	search();
}

/**
 * 日付変更処理
 *
 */
TabbodyListpage.prototype.dateChange = function(_this){

	var dValue = $("#date").val().replace(/-/g, "");
	var dateCommon = new DateCommon();

	if($(_this).attr("id") == "prev_button"){
		$("#date").val(dateCommon.prevDate(dValue));;
	}else{
		$("#date").val(dateCommon.nextDate(dValue));
	}

}

/**
 * 検索処理
 *
 */
TabbodyListpage.prototype.search = function(){

}

/**
 * 新規モーダルダイアログのテーブル表示
 *
 * @param modalCommon
 */
TabbodyListpage.prototype.load = function(){

	var page = TabbodyListpage.prototype;
	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData("GET", "list_combo", function(error, data) {
		if(!error){
			return;
		}

		var tableCommon = new TableCommon("modal-main");
		tableCommon.form({
			rows: [
				{
					text: "名前",
					css: {
						padding: "8px"
					},
					next: {
						element: "input",
						attr: {
							type: "text"
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
							type: "number"
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
							type: "number"
						},
						css: {
							width: "200px",
							padding : "4px"
						}
					}
				}
			]
		});
		tableCommon.setCombobox(page.EXPENSE_NAME_ROW, page.EXPENSE_NAME_COLUMN, data);
	});
}

/**
 * 登録処理
 *
 */
TabbodyListpage.prototype.insert = function(){

	var formData = {"data" : "テスト"}
	var ajaxCommon = new AjaxCommon();
	ajaxCommon.addCallbackData("POST", "insert", formData, function(error, data) {
		if(!error){
			return;
		}

		console.log(data);
	});

}
