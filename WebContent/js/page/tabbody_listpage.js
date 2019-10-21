//==================================================================
// 一覧画面
// 作成日: 2019/09/21
//
//==================================================================
// 費目コンボボックス定数
TabbodyListpage.prototype.ROW_EXPENSE_NAME = 2;
TabbodyListpage.prototype.COL_EXPENSE_NAME = 1;

// エラーメッセージ
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
					modalCommon.confirm("確認", "登録しますか?", function(){
						page.insert(modalCommon);
					});
				},
				attr: {
					id: "add_button",
					class: "button-border button-info"
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
					modalCommon.close();
				},
				attr: {
					id: "close_button",
					class: "button-border button-warning"
				},
				css: {
					width: "60px",
					height: "30px"
				}
			}
		]
	});

	/**
	 * 新規ボタン処理
	 *
	 */
	$("#new_button").on("click", $.proxy(function(){

		modalCommon.show();
		this.loadDialog();
	}, this));

	/**
	 * 日付ボタン処理
	 *
	 */
	$("#prev_button, #next_button").on("click", $.proxy(function(){
		this.dateChangeWithSearch(this);
	}, this));

}
7
/**
 * 画面表示
 *
 */
TabbodyListpage.prototype.show = function(){

	this.loadCurrentDate();

	this.load();

}

/**
 * 現在日時を表示
 7*
 */
TabbodyListpage.prototype.loadCurrentDate = function(){

	var dateCommon = new DateCommon();

	var year = dateCommon.toDateDigits(dateCommon.getYear(), 4);
	var month = dateCommon.toDateDigits(dateCommon.getMonth(), 2);
	var day = dateCommon.toDateDigits(dateCommon.getDay(), 2);

	$("#date").val(dateCommon.convertToHyphenStringFormat(year + month + day));

}

/**
 * 読み込み処理
 *
 */
TabbodyListpage.prototype.load = function(){

	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData({
		type: "GET",
		url: "list",
		callback: function(error, data) {
			if(!error){
				return;
			}

			var tableCommon = new TableCommon("tableArea");
			var stringCommon = new StringCommon();
			var dateCommon = new DateCommon();

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
		}
	});
}

/**
 * 日付変更ボタン処理
 *
 */
TabbodyListpage.prototype.dateChangeWithSearch = function(_this){

	// 日付変更処理
	this.dateChange(_this);

	// 検索処理
	this.search();
}

/**
 * 日付変更処理
 *
 */
TabbodyListpage.prototype.dateChange = function(_this){

	var dValue = $("#date").val().replace(/-/g, "");
	var dateCommon = new DateCommon();

	if($(_this).attr("id") == "prev_button"){
		$("#date").val(dateCommon.prevDate(dValue));
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
 */
TabbodyListpage.prototype.loadDialog = function(){

	var page = TabbodyListpage.prototype;
	var ajaxCommon = new AjaxCommon();
	ajaxCommon.getCallbackData({
		type: "GET",
		url: "list_combo",
		callback: function(error, data) {
			if(!error){
				return;
			}

			var tableCommon = new TableCommon("modal-content");
			tableCommon.form(TABBODY_LISTPAGE_PARAM_FORM);
			tableCommon.setCombobox(page.ROW_EXPENSE_NAME, page.COL_EXPENSE_NAME, data);
		}
	});

}

/**
 * 登録処理
 *
 */
TabbodyListpage.prototype.insert = function(modalCommon){

	this.clear();
	if(!this.checkData()){
		return;
	}

	var formData = new FormData();
	var json = this.inputData();
	formData.append("data", JSON.stringify(json));

	var page = this;
	var ajaxCommon = new AjaxCommon();
	ajaxCommon.addCallbackData({
		type: "POST",
		url: "insert",
		data: formData,
		callback: function(error, data) {
			if(!error){
				modalCommon.alert("失敗", "登録に失敗しました。", null);
				return;
			}

			modalCommon.alert("完了", "登録が完了しました。", function(){
				modalCommon.close();
				page.load();
			});

		}
	});

}

/**
 * 入力データ取得
 *
 */
TabbodyListpage.prototype.inputData = function(){
	return {
		name: $("#name").val(),
		date: $("#date").val().replace(/-/g,""),
		expense: {
			expenseCode: $("#expense-name").val()
		},
		income: $("#income").val(),
		spending: $("#spending").val()
	};
}

/**
 * 入力チェック
 *
 */
TabbodyListpage.prototype.checkData = function(){

	var checkFlg = true;
	var stringCommon = new StringCommon();
	if(stringCommon.isEmpty($("#name").val())){
		$("#name-error").text(this.NAME_ERROR_MESSAGE);
		$("#name").addClass("error");
		checkFlg = false;
	}

	if(stringCommon.isEmpty($("#date").val())){
		$("#date-error").text(this.DATE_ERROR_MESSAGE);
		$("#date").addClass("error");
		checkFlg = false;
	}

	if(stringCommon.isEmpty($("#expense-name").val())){
		$("#expense-name-error").text(this.EXPENSE_ERROR_MESSAGE);
		$("#expense-name").addClass("error");
		checkFlg = false;
	}

	if(stringCommon.isEmpty($("#income").val())){
		$("#income-error").text(this.INCOME_ERROR_MESSAGE);
		$("#income").addClass("error");
		checkFlg = false;
	}

	if(stringCommon.isEmpty($("#spending").val())){
		$("#spending-error").text(this.SPENDING_ERROR_MESSAGE);
		$("#spending").addClass("error");
		checkFlg = false;
	}

	return checkFlg;
}

/**
 * 入力チェックエリアのクリア
 *
 */
TabbodyListpage.prototype.clear = function(){

	$("#name-error").text("");
	$("#name").removeClass("error");
	$("#date-error").text("");
	$("#date").removeClass("error");
	$("#expense-name-error").text("");
	$("#expense-name").removeClass("error");
	$("#income-error").text("");
	$("#income").removeClass("error");
	$("#spending-error").text("");
	$("#spending").removeClass("error");
}