//==================================================================
// 一覧画面
// 作成日: 2019/09/21
//
//==================================================================
// 費目コンボボックス定数
TabbodyListpage.prototype.EXPENSE_NAME_ROW = 2;
TabbodyListpage.prototype.EXPENSE_NAME_COLUMN = 1;

TabbodyListpage.prototype.NAME_ERROR_MESSAGE = "名前を入力してください。";
TabbodyListpage.prototype.DATE_ERROR_MESSAGE = "日付を入力してください。";
TabbodyListpage.prototype.EXPENSE_ERROR_MESSAGE = "費目を選択してください。";
TabbodyListpage.prototype.INCOME_ERROR_MESSAGE = "所得を入力してください。";
TabbodyListpage.prototype.SPENDING_ERROR_MESSAGE = "出費を入力してください。";

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

	var page = TabbodyListpage.prototype;
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
					height: "30px",
					margin: "0 5px 0 0"
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

		tableCommon.table(TABBODY_LISTPAGE_PARAM_TABLE);

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
		tableCommon.form(TABBODY_LISTPAGE_PARAM_FORM);
		tableCommon.setCombobox(page.EXPENSE_NAME_ROW, page.EXPENSE_NAME_COLUMN, data);
	});
}

/**
 * 登録処理
 *
 */
TabbodyListpage.prototype.insert = function(){

	var formData = new FormData();
	var json = this.inputData();
	formData.append("data", json);

	var msg = this.checkData();
	if(msg){
		alert(msg);
		return;
	}

	var ajaxCommon = new AjaxCommon();
	ajaxCommon.addCallbackData("POST", "insert", formData, function(error, data) {
		if(!error){
			return;
		}

		console.log(data);
	});
}

/**
 * 入力データ取得
 *
 */
TabbodyListpage.prototype.inputData = function(){
	return {
		name: $("#name").val(),
		date: $("#date").val(),
		expenseName: $("#expenseName").val(),
		income: $("#income").val(),
		spending: $("#spending").val()
	};
}

/**
 * 入力チェック
 *
 */
TabbodyListpage.prototype.checkData = function(){
	var stringCommon = new StringCommon();

	if(stringCommon.isEmpty($("#name").val())){
		return this.NAME_ERROR_MESSAGE;
	}

	if(stringCommon.isEmpty($("#date").val())){
		return this.DATE_ERROR_MESSAGE;
	}

	if(stringCommon.isEmpty($("#expenseName").val())){
		return this.EXPENSE_ERROR_MESSAGE;
	}

	if(stringCommon.isEmpty($("#income").val())){
		return this.INCOME_ERROR_MESSAGE;
	}

	if(stringCommon.isEmpty($("#spending").val())){
		return this.SPENDING_ERROR_MESSAGE;
	}

	return "";
}