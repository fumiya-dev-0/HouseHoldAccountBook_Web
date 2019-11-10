/*************************************************
 * 一覧画面
 * 作成日: 2019/09/21
 *
 *************************************************/
/** 入力フォーム行番号 */
TabbodyListpage.prototype.FORM_ROW_IDX_HOUSEHOLDACCOUNTBOOK_CODE = 0;
TabbodyListpage.prototype.FORM_ROW_IDX_NAME = 1;
TabbodyListpage.prototype.FORM_ROW_IDX_DATE = 2;
TabbodyListpage.prototype.FORM_ROW_IDX_EXPENSE = 3;
TabbodyListpage.prototype.FORM_ROW_IDX_INCOME = 4;
TabbodyListpage.prototype.FORM_ROW_IDX_SPENDING = 5;
/** 入力フォーム列番号 */
TabbodyListpage.prototype.FORM_COL_IDX = 1;

/** テーブル列番号 */
TabbodyListpage.prototype.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_CODE = 0;
TabbodyListpage.prototype.TBL_COL_IDX_EXPENSE_CODE = 1;
TabbodyListpage.prototype.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_NAME = 2;
TabbodyListpage.prototype.TBL_COL_IDX_NAME = 3;
TabbodyListpage.prototype.TBL_COL_IDX_DATE = 4;
TabbodyListpage.prototype.TBL_COL_IDX_INCOME = 5;
TabbodyListpage.prototype.TBL_COL_IDX_SPENDING = 6;

/** エラーメッセージ */
TabbodyListpage.prototype.NAME_ERROR_MESSAGE = "名前を入力してください。";
TabbodyListpage.prototype.DATE_ERROR_MESSAGE = "日付を入力してください。";
TabbodyListpage.prototype.EXPENSE_ERROR_MESSAGE = "費目を選択してください。";
TabbodyListpage.prototype.INCOME_ERROR_MESSAGE = "所得を入力してください。";
TabbodyListpage.prototype.SPENDING_ERROR_MESSAGE = "出費を入力してください。";

/** ページャ用 */
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
	this.modalHelper = ModalHelper.getInstance();
	var self = this;

	// イベントoff
	this.offEvent();

	/**
	 * 新規ボタン処理
	 *
	 */
	$("#new-button").on("click", $.proxy(function(){
		this.modalHelper.dialog({
			width: "50%",
			height: "300px",
			buttons: [
				{
					text: "登録",
					click: function(){
						self.insert();
					},
					attr: {
						id: "add-button",
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
						self.modalHelper.close();
					},
					attr: {
						id: "close-button",
						class: "button-border button-warning"
					},
					css: {
						width: "60px",
						height: "30px"
					}
				}
				]
		}).show();
		this.loadDialog();
	}, this));

	/**
	 * 更新ボタン処理
	 *
	 */
	$("#upd-button").on("click", $.proxy(function(){
		if(this.tableHelper.isRow()){
			var rIdx = this.tableHelper.getRowIdx();
			var code = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_CODE).getText();
			this.modalHelper.dialog({
				width: "50%",
				height: "300px",
				buttons: [
					{
						text: "更新",
						click: function(){
							self.insert(code);
						},
						attr: {
							id: "add-button",
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
							self.modalHelper.close();
						},
						attr: {
							id: "close-button",
							class: "button-border button-warning"
						},
						css: {
							width: "60px",
							height: "30px"
						}
					}
					]
			}).show();
			this.loadDialog(rIdx - 1);
		}
	}, this));

	/**
	 * 年月コンボボックス処理
	 */
	$("#date-combo").on("change", $.proxy(function(){
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

	$("#date-combo").html(option);
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
					self.accountBookData = data.resultList;
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
	this.tableHelper = new TableHelper;

	this.tableHelper.table($("#tableArea"), Constants.TABBODY_LISTPAGE_PARAM_TABLE, PagerUtil.getDispData());

	$("#pagerArea").html(PagerUtil.getRefAll());
	PagerUtil.onClick($.proxy(function(nowPage){
		// テーブルとページャの作成
		this.createTableWithPager(nowPage, this.accountBookData);
	}, this));
}

/**
 * 新規・更新モーダルダイアログのテーブル表示
 *
 */
TabbodyListpage.prototype.loadDialog = function(rIdx){

	var self = this;
	AjaxUtil.process({
		type: "GET",
		url: "list_combo",
		callback: function(data) {
			self.formHelper = new TableHelper();
			self.formHelper.form($("#modal-content"), Constants.TABBODY_LISTPAGE_PARAM_FORM);
			self.formHelper.setCombobox(self.FORM_ROW_IDX_EXPENSE, self.FORM_COL_IDX, data.expenses);
			if(rIdx || rIdx === 0){
				self.setForm(rIdx);
			}
		}
	});
}

/**
 * 入力フォーム値設定
 *
 * @param rIdx 列番号
 */
TabbodyListpage.prototype.setForm = function(rIdx){

	// 家計簿コード
	var code = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_CODE).getText();
	// 品名
	var name = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_NAME).getText();
	// 日付
	var date = DateUtil.convertToSlashDeleteStringFormat(this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_DATE).getText());
	// 費目
	var expense = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_EXPENSE_CODE).getText();
	// 収入
	var income = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_INCOME).getText().slice(0, -1);
	// 支出
	var spending = this.tableHelper.rows(rIdx).cols(this.TBL_COL_IDX_SPENDING).getText().slice(0, -1);
	// 家計簿コード
	this.formHelper.rows(this.FORM_ROW_IDX_HOUSEHOLDACCOUNTBOOK_CODE).cols(this.FORM_COL_IDX).setValue(code);
	// 品名
	this.formHelper.rows(this.FORM_ROW_IDX_NAME).cols(this.FORM_COL_IDX).setValue(name);
	// 日付
	this.formHelper.rows(this.FORM_ROW_IDX_DATE).cols(this.FORM_COL_IDX).setValue(DateUtil.convertToHyphenStringFormat(date));
	// 費目
	this.formHelper.rows(this.FORM_ROW_IDX_EXPENSE).cols(this.FORM_COL_IDX).setValue(expense);
	// 収入
	this.formHelper.rows(this.FORM_ROW_IDX_INCOME).cols(this.FORM_COL_IDX).setValue(StringUtil.commaDelFormat(income));
	// 支出
	this.formHelper.rows(this.FORM_ROW_IDX_SPENDING).cols(this.FORM_COL_IDX).setValue(StringUtil.commaDelFormat(spending));
}

/**
 * 検索処理
 *
 */
TabbodyListpage.prototype.search = function(){
	var val = $("#date-combo").val();
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
 * 登録更新処理
 *
 */
TabbodyListpage.prototype.insert = function(code){

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
		confirm: {
			title: "確認",
			text: code ? "更新しますか？" : "登録しますか？"
		},
		alert: {
			title: "完了",
			text: code ? "登録が完了しました。" : "更新が完了しました。"
		},
		data: formData,
		callback: function(data){
			self.modalHelper.close();
			self.load();
			self.loadCombo();
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

/**
 * イベントoff
 *
 */
TabbodyListpage.prototype.offEvent = function(){
	$("#new-button, #upd-button, #add-button, #close-button").off("click");
	$("#date-combo").off("change");
}