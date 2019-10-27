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

	var page = this;
	var modalHelper = new ModalHelper();
	modalHelper.dialog({
		width: "50%",
		height: "300px",
		buttons: [
			{
				text: "登録",
				click: function(){
					modalHelper.confirm("確認", "登録しますか?", function(){
						page.insert(modalHelper);
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
					modalHelper.close();
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

		modalHelper.show();
		this.loadDialog();
	}, this));

	/**
	 * 年月コンボボックス処理
	 */
	$("#date_combo").on("change", $.proxy(function(){
		this.search();
	}, this));

}

/**
 * 画面表示
 *
 */
TabbodyListpage.prototype.show = function(){

	this.loadCombo();

	this.load();

}

/**
 * 年月コンボボックス読み込み
 *
 */
TabbodyListpage.prototype.loadCombo = function(){

	var year = DateUtil.getYear();
	var month = DateUtil.getMonth();
	var option = this.createOption(year, month);

	$("#date_combo").html(option);
}

/**
 * オプション要素の生成
 *
 */
TabbodyListpage.prototype.createOption = function(year, month){

	var option = null;
	option = "<option value=''></option>"
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 12; j++){
			option += "<option value='" + year + "/" + month + "'>" + year + "年" + DateUtil.toDateDigits(month, 2) + "月"  + "</option>";
			if(month <= 1){
				break;
			}else{
				month--;
			}
		}
		month = 12;
		year--;
	}
	return option;
}

/**
 * 検索処理
 *
 */
TabbodyListpage.prototype.search = function(){
	var val = $("#date_combo").val();

	if(!val){
		return;
	}


}

/**
 * 読み込み処理
 *
 */
TabbodyListpage.prototype.load = function(){

	AjaxUtil.getCallbackData({
		type: "GET",
		url: "list",
		callback: function(error, data) {
			if(!error){
				return;
			}

			var tableCommon = new TableCommon("tableArea");
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
								DateUtil.convertToSlashStringFormat(data["date"]),
								data["expense"]["name"],
								StringUtil.separate(data["income"]),
								StringUtil.separate(data["spending"])
						)
				);
			}, data);
		}
	});
}

/**
 * 新規モーダルダイアログのテーブル表示
 *
 */
TabbodyListpage.prototype.loadDialog = function(){

	var page = this;
	AjaxUtil.getCallbackData({
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
TabbodyListpage.prototype.insert = function(modalHelper){

	this.clear();
	if(!this.checkData()){
		return;
	}

	var formData = new FormData();
	var json = this.inputData();

	formData.append("data", JSON.stringify(json));

	var page = this;
	AjaxUtil.addCallbackData({
		type: "POST",
		url: "insert",
		progress: true,
		data: formData,
		callback: function(error, data) {
			if(!error){
				modalHelper.alert("失敗", "登録に失敗しました。", null);
				return;
			}

			modalHelper.alert("完了", "登録が完了しました。", function(){
				modalHelper.close();
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
		date: DateUtil.convertToHyphenDeleteStringFormat($("#date").val()),
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
	if(StringUtil.isEmpty($("#name").val())){
		$("#name-error").text(this.NAME_ERROR_MESSAGE);
		$("#name").addClass("error");
		checkFlg = false;
	}

	if(StringUtil.isEmpty($("#date").val())){
		$("#date-error").text(this.DATE_ERROR_MESSAGE);
		$("#date").addClass("error");
		checkFlg = false;
	}

	if(StringUtil.isEmpty($("#expense-name").val())){
		$("#expense-name-error").text(this.EXPENSE_ERROR_MESSAGE);
		$("#expense-name").addClass("error");
		checkFlg = false;
	}

	if(StringUtil.isEmpty($("#income").val())){
		$("#income-error").text(this.INCOME_ERROR_MESSAGE);
		$("#income").addClass("error");
		checkFlg = false;
	}

	if(StringUtil.isEmpty($("#spending").val())){
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