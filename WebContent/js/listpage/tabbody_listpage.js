/*************************************************
 * 一覧画面
 * 作成日: 2019/09/21
 *
 *************************************************/
/** 費目コンボボックス定数 **/
TabbodyListpage.prototype.ROW_EXPENSE_NAME = 2;
TabbodyListpage.prototype.COL_EXPENSE_NAME = 1;

/** エラーメッセージ **/
TabbodyListpage.prototype.NAME_ERROR_MESSAGE = "名前を入力してください。";
TabbodyListpage.prototype.DATE_ERROR_MESSAGE = "日付を入力してください。";
TabbodyListpage.prototype.EXPENSE_ERROR_MESSAGE = "費目を選択してください。";
TabbodyListpage.prototype.INCOME_ERROR_MESSAGE = "所得を入力してください。";
TabbodyListpage.prototype.SPENDING_ERROR_MESSAGE = "出費を入力してください。";

/** ページャ用 **/
TabbodyListpage.prototype.PAGER_MAX = 15;
TabbodyListpage.prototype.DEFAULT_NOW_PAGE = 1;

function TabbodyListpage(){

	var self = TabbodyListpage.prototype;
	self.accountBookData = null;

	// 初期処理
	self.init();

	// 画面表示
	self.show();

}

/**
 * 初期処理
 *
 */
TabbodyListpage.prototype.init = function(){

	// モーダル設定
	var modalHelper = this.modal();

	// イベントoff
	this.offEvent();

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
 * モーダル設定
 *
 */
TabbodyListpage.prototype.modal = function(){

	var self = this;
	var modalHelper = new ModalHelper();
	modalHelper.dialog({
		width: "50%",
		height: "300px",
		buttons: [
			{
				text: "登録",
				click: function(){
					modalHelper.confirm("確認", "登録しますか?", function(){
						self.insert(modalHelper);
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
	return modalHelper;
}

/**
 * イベントoff
 *
 */
TabbodyListpage.prototype.offEvent = function(){
	$("#new_button").off("click");
	$("#date_combo").off("change");
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
 * @param year 年
 * @param month 月
 * @return option要素
 */
TabbodyListpage.prototype.createOption = function(year, month){

	var option = null;
	option = "<option value=''></option>"
		for(var i = 0; i < 10; i++){
			for(var j = 0; j < 12; j++){
				option += "<option value='" + year + "/" + DateUtil.toDateDigits(month, 2) + "'>" + year + "年" + DateUtil.toDateDigits(month, 2) + "月"  + "</option>";
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

	var formData = new FormData();
	var json = {
			year: DateUtil.convertToSlashDeleteStringFormat(val)
	};
	formData.append("data", DateUtil.convertToSlashDeleteStringFormat(val));
	this.load(formData);
}

/**
 * 読み込み処理
 *
 * @param formData 入力データ
 */
TabbodyListpage.prototype.load = function(formData){
	var self = this;
	AjaxUtil.process({
		type: formData ? "POST" : "GET",
				url: "list",
				data: formData,
				callback: function(data) {
					self.accountBookData = data;
					// テーブルとページャの作成
					self.createTableWithPager(this.DEFAULT_NOW_PAGE, self.accountBookData);
				}
	});
}

/**
 * テーブルとページャの作成
 *
 * @param nowPage 現在ページ
 * @param data 表示データ
 */
TabbodyListpage.prototype.createTableWithPager = function(nowPage, data){
	PagerUtil.pager(data, this.PAGER_MAX, nowPage);

	this.tableHelper = TableHelper.getInstance();
	this.tableHelper.table($("#tableArea"), Constants.TABBODY_LISTPAGE_PARAM_TABLE, PagerUtil.getDispData());

	$("#pagerArea").html(PagerUtil.getRefAll());
	PagerUtil.onClick($.proxy(function(nowPage){
		// テーブルとページャの作成
		this.createTableWithPager(nowPage, this.accountBookData);
	}, this));
}

/**
 * 新規モーダルダイアログのテーブル表示
 *
 */
TabbodyListpage.prototype.loadDialog = function(){

	var self = this;
	AjaxUtil.process({
		type: "GET",
		url: "list_combo",
		callback: function(data) {
			var tableHelper = TableHelper.getInstance();
			tableHelper.form($("#modal-content"), Constants.TABBODY_LISTPAGE_PARAM_FORM);
			tableHelper.setCombobox($("#modal-content"), self.ROW_EXPENSE_NAME, self.COL_EXPENSE_NAME, data);
		}
	});
}

/**
 * 登録処理
 *
 * @param modalHelper モーダルダイアログクラス
 */
TabbodyListpage.prototype.insert = function(modalHelper){

	this.clear();
	if(!this.checkData()){
		return;
	}

	var formData = new FormData();
	var json = this.inputData();
	formData.append("data", JSON.stringify(json));

	var self = this;
	AjaxUtil.process({
		type: "POST",
		url: "insert",
		progress: true,
		data: formData,
		callback: function(data){
			modalHelper.alert("完了", "登録が完了しました。", function(){
				modalHelper.close();
				self.load();
				self.loadCombo();
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