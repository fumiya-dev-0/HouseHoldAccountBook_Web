//==================================================================
//一覧画面
//作成日: 2019/09/21
//
//==================================================================
window.onload = function() {

	// 初期処理
	init();

	// 画面表示
	show();
}

/**
 * 開始処理
 *
 * @returns
 */
function init(){

	var modalCommon = new ModalCommon();

	/**
	 * 追加ボタン処理
	 *
	 * @returns
	 */
	$("#add_button").on("click", function(){
		createAddModal(this, modalCommon);
	});

	/**
	 * 閉じるボタン処理(モーダルダイアログ)
	 *
	 * @returns
	 */
	$("#close_button").on("click", function(){
		// モーダルダイアログを閉じる
		modalCommon.hide();
	});

	/**
	 * 日付ボタン処理
	 *
	 * @returns
	 */
	$("#prev_button, #next_button").on("click", function(){
		dateChangeWithSearch(this);
	});

}

/**
 * 画面表示
 *
 * @returns
 */
function show(){

	loadCurrentDate();

	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData("GET", "list_action", function(error, data) {
		if(error){
			return;
		}

		var tableCommon = new TableCommon("tableArea");
		var stringCommon = new StringCommon();
		var dateCommon = new DateCommon();

		var options = [
			{ id : "table" },
			{ title : "家計簿コード", css : { width : "0px", display : "none" } },
			{ title : "費用コード", css : { width : "0px", display : "none" } },
			{ title : "名前", css : { width : "200px" } },
			{ title : "表示順", css : { width : "0px", display : "none" } },
			{ title : "日付", css : { width : "150px" } },
			{ title : "費目", css : { width : "100px" } },
			{ title : "所得", css : { width : "100px" } },
			{ title : "出費", css : { width : "100px" } }
			];
		tableCommon.setColumns(options);

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
function loadCurrentDate(){

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
function dateChangeWithSearch(_this){

	// 日付変更処理
	dateChange(_this);

	// 検索処理
	search();
}

/**
 * 日付変更処理
 *
 */
function dateChange(_this){

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
function search(){

}

/**
 * モーダルダイアログ追加
 *
 * @param _this
 * @returns
 */
function createAddModal(_this, modalCommon){

	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData("GET", "list_action", function(error, data) {
		if(error){
			return;
		}

		// ボタンからフォーカスを外す
		$(_this).blur();

		modalCommon.show();

		var tableCommon = new TableCommon("modal-main");

		var _padding = "8px";
		var _width = "200px";
		var _height = "25px";

		var options = [
//			{ id : "table" },
			{ title : "名前", css : { padding : _padding }, next : { element : "input", attr : { type : "text" }, css : { width : _width, height : _height } } },
			{ title : "日付", css : { padding : _padding }, next : { element : "input", attr : { type : "date", id : "date" }, css : { width : _width, height : _height } } },
			{ title : "費目", css : { padding : _padding }, next : { element : "select", css : { width : _width, height : _height } } },
			{ title : "所得", css : { padding : _padding }, next : { element : "input", attr : { type : "number" }, css : { width : _width, height : _height } } },
			{ title : "出費", css : { padding : _padding }, next : { element : "input", attr : { type : "number" }, css : { width : _width, height : _height } } }
			];

		let expenseNameRow = 2;
		let expenseNameColumn = 1;
		tableCommon.addFormVertical(options);
//		tableCommon.setCombobox(expenseNameRow, expenseNameColumn, data);
	});
}
