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

	// モーダルダイアログインスタンス
	this.modalHelper = ModalHelper.getInstance();
	// メッセージダイアログインスタンス
	var messageHelper = MessageHelper.getInstance();
	var self = this;

	// イベントoff
	this.offEvent();

	var option = {
			width: "50%",
			height: "300px",
			buttons: [
				{
					text: "",
					click: function(){
						self.upsert();
					},
					attr: {
						id: "add-btn",
						class: "btn-info"
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
						id: "close-btn",
						class: "btn-warning"
					},
					css: {
						width: "60px",
						height: "30px"
					}
				}
				]
	};

	/**
	 * 新規ボタン処理
	 *
	 */
	$("#new-btn").on("click", $.proxy(function(){
		option.buttons[0].text = "登録";
		this.modalHelper.dialog(option).show();
		this.loadDialog();
	}, this));

	/**
	 * 更新ボタン処理
	 *
	 */
	$("#upd-btn").on("click", $.proxy(function(){
		if(this.tableHelper.isRow()){
			var rIdx = this.tableHelper.getRowIdx() - 1;
			option.buttons[0].text = "更新";
			this.modalHelper.dialog(option).show();
			this.loadDialog(rIdx);
		}else{
			messageHelper.alert("未選択", "表を選択してください。", null).show();
		}
	}, this));

	$("#del-btn").on("click", $.proxy(function(){
		if(this.tableHelper.isRow()){
			var rIdx = this.tableHelper.getRowIdx() - 1;
			var code = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_CODE).getText();
			this.delete(code);
		}else{
			messageHelper.alert("未選択", "表を選択してください。", null).show();
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

	// 年月コンボボックス読み込み
	this.loadCombo();
	// 読み込み処理
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
	option = "<option value=''>全件選択</option>"
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
				progress: true,
				data: formData,
				callback: function(data) {
					self.accountBookData = data.resultList;
					self.nowPage = data.nowPage;
					self.startPage = data.startPage;
					self.endPage = data.endPage;
					self.maxPage = data.maxPage;
					// 合計値エリア要素に値を設定
					self.addSumArea(data.incomeSum, data.spendingSum);
					// テーブルとページャの作成
					self.createTableWithPager();
				}
	});
}

/**
 * 合計値エリア要素に値を設定
 *
 * @param incomeSum 収入合計値
 * @param spendingSum 支出合計値
 */
TabbodyListpage.prototype.addSumArea = function(incomeSum, spendingSum){

	$("#income-sum").text(incomeSum);
	$("#spending-sum").text(spendingSum);

	// 収入合計値(数字に変換)
	var iSum = Number(StringUtil.commaDelFormat(incomeSum.slice(0, -1)));
	// 支出合計値(数字に変換)
	var sSum = Number(StringUtil.commaDelFormat(spendingSum.slice(0, -1)));

	// 支出が収入より大きい場合は赤文字にする
	if(iSum < sSum){
		$("#spending-sum").css("color", "red");
	}

	// 残額合計値
	var balanceSum = iSum - sSum;
	// 残額が0未満の場合は赤文字にする
	if(balanceSum < 0){
		$("#balance-sum").css("color", "red");
	}
	$("#balance-sum").text(StringUtil.separate(balanceSum) + "円");
}

/**
 * テーブルとページャの作成
 *
 */
TabbodyListpage.prototype.createTableWithPager = function(){

	this.tableHelper = new TableHelper;
	this.tableHelper.table($("#table-area"), Constants.TABBODY_LISTPAGE_PARAM_TABLE, this.accountBookData);

	var pagerHelper = new PagerHelper();
	pagerHelper.pager(this.nowPage, this.startPage, this.endPage, this.maxPage);
	$("#pager-area").html(pagerHelper.getRefAll());
	pagerHelper.onClick($.proxy(function(nowPage){

		this.nowPage = nowPage;
		var formData = this.searchData($("#date-combo").val());
		// テーブルとページャの作成
		this.load(formData);
	}, this));
}

/**
 * 新規・更新モーダルダイアログのテーブル表示
 *
 * @param rIdx 行番号
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
	var code = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_CODE).getText();
	// 品名
	var name = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_HOUSEHOLDACCOUNTBOOK_NAME).getText();
	// 日付
	var date = DateUtil.convertToSlashDeleteStringFormat(this.tableHelper.cells(rIdx, this.TBL_COL_IDX_DATE).getText());
	// 費目
	var expense = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_EXPENSE_CODE).getText();
	// 収入
	var income = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_INCOME).getText().slice(0, -1);
	// 支出
	var spending = this.tableHelper.cells(rIdx, this.TBL_COL_IDX_SPENDING).getText().slice(0, -1);
	// 家計簿コード
	this.formHelper.cells(this.FORM_ROW_IDX_HOUSEHOLDACCOUNTBOOK_CODE, this.FORM_COL_IDX).setValue(code);

	// 品名
	this.formHelper.cells(this.FORM_ROW_IDX_NAME, this.FORM_COL_IDX).setValue(name);
	// 日付
	this.formHelper.cells(this.FORM_ROW_IDX_DATE, this.FORM_COL_IDX).setValue(DateUtil.convertToHyphenStringFormat(date));
	// 費目
	this.formHelper.cells(this.FORM_ROW_IDX_EXPENSE, this.FORM_COL_IDX).setValue(expense);
	// 収入
	this.formHelper.cells(this.FORM_ROW_IDX_INCOME, this.FORM_COL_IDX).setValue(StringUtil.commaDelFormat(income));
	// 支出
	this.formHelper.cells(this.FORM_ROW_IDX_SPENDING, this.FORM_COL_IDX).setValue(StringUtil.commaDelFormat(spending));
}

/**
 * 検索処理
 *
 */
TabbodyListpage.prototype.search = function(){

	var val = $("#date-combo").val();

	this.nowPage = 0;
	var formData = this.searchData(val);
	this.load(formData);
}
/**
 * 検索用パラメータ取得
 *
 */
TabbodyListpage.prototype.searchData = function(val){

	var formData = new FormData();
	if(val){
		formData.append(HtmlConstants.YEAR, DateUtil.convertToSlashDeleteStringFormat(val));
	}

	formData.append(HtmlConstants.NOW_PAGE, this.nowPage);
	return formData;
}

/**
 * 登録更新処理
 *
 */
TabbodyListpage.prototype.upsert = function(){

	this.clear();
	if(!this.checkData()){
		return;
	}

	var formData = this.inputData();
	var code = formData.get(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE);

	var self = this;
	AjaxUtil.process({
		type: "POST",
		url: "upsert",
		progress: true,
		confirm: {
			title: "確認",
			text: !StringUtil.isEmpty(code) ? "更新しますか？" : "登録しますか？"
		},
		alert: {
			title: "完了",
			text: !StringUtil.isEmpty(code) ? "更新が完了しました。" : "登録が完了しました。"
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

	var formData = new FormData();

	// 家計簿コード
	var code = this.formHelper.cells(this.FORM_ROW_IDX_HOUSEHOLDACCOUNTBOOK_CODE, this.FORM_COL_IDX).getValue();
	// 品名
	var name = this.formHelper.cells(this.FORM_ROW_IDX_NAME, this.FORM_COL_IDX).getValue();
	// 日付
	var date = this.formHelper.cells(this.FORM_ROW_IDX_DATE, this.FORM_COL_IDX).getValue();
	// 費目
	var expenseCode = this.formHelper.cells(this.FORM_ROW_IDX_EXPENSE, this.FORM_COL_IDX).getValue();
	// 収入
	var income = this.formHelper.cells(this.FORM_ROW_IDX_INCOME, this.FORM_COL_IDX).getValue();
	// 支出
	var spending = this.formHelper.cells(this.FORM_ROW_IDX_SPENDING, this.FORM_COL_IDX).getValue();

	StringUtil.isEmpty(code) ? formData.append(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, "") : formData.append(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, code);
	formData.append(HtmlConstants.NAME, name);
	formData.append(HtmlConstants.DATE, DateUtil.convertToHyphenDeleteStringFormat(date));
	formData.append(HtmlConstants.EXPENSE_CODE, expenseCode);
	formData.append(HtmlConstants.INCOME, income);
	formData.append(HtmlConstants.SPENDING, spending);

	return formData;
}

/**
 * 入力チェック
 *
 */
TabbodyListpage.prototype.checkData = function(){

	var checkFlg = true;

	// 品名
	var name = this.formHelper.cells(this.FORM_ROW_IDX_NAME, this.FORM_COL_IDX);
	if(StringUtil.isEmpty(name.getValue())){
		name.error(this.NAME_ERROR_MESSAGE);
		checkFlg = false;
	}

	// 日付
	var date = this.formHelper.cells(this.FORM_ROW_IDX_DATE, this.FORM_COL_IDX);
	if(StringUtil.isEmpty(date.getValue())){
		date.error(this.DATE_ERROR_MESSAGE);
		checkFlg = false;
	}

	// 費目
	var expenseCode = this.formHelper.cells(this.FORM_ROW_IDX_EXPENSE, this.FORM_COL_IDX);
	if(StringUtil.isEmpty(expenseCode.getValue())){
		expenseCode.error(this.EXPENSE_ERROR_MESSAGE);
		checkFlg = false;
	}

	// 収入
	var income = this.formHelper.cells(this.FORM_ROW_IDX_INCOME, this.FORM_COL_IDX);
	if(StringUtil.isEmpty(income.getValue())){
		income.error(this.INCOME_ERROR_MESSAGE);
		checkFlg = false;
	}

	// 支出
	var spending = this.formHelper.cells(this.FORM_ROW_IDX_SPENDING, this.FORM_COL_IDX);
	if(StringUtil.isEmpty(spending.getValue())){
		spending.error(this.SPENDING_ERROR_MESSAGE);
		checkFlg = false;
	}

	return checkFlg;
}

/**
 * 入力チェックエリアのクリア
 *
 */
TabbodyListpage.prototype.clear = function(){

	// 品名
	this.formHelper.cells(this.FORM_ROW_IDX_NAME, this.FORM_COL_IDX).clear();
	// 日付
	this.formHelper.cells(this.FORM_ROW_IDX_DATE, this.FORM_COL_IDX).clear();
	// 費目
	this.formHelper.cells(this.FORM_ROW_IDX_EXPENSE, this.FORM_COL_IDX).clear();
	// 収入
	this.formHelper.cells(this.FORM_ROW_IDX_INCOME, this.FORM_COL_IDX).clear();
	// 支出
	this.formHelper.cells(this.FORM_ROW_IDX_SPENDING, this.FORM_COL_IDX).clear();
}

/**
 * 削除処理
 *
 */
TabbodyListpage.prototype.delete = function(code){

	var formData = new FormData();
	formData.append(HtmlConstants.HOUSE_HOLD_ACCOUNT_BOOK_CODE, code);

	var self = this;
	AjaxUtil.process({
		type: "POST",
		url: "delete",
		progress: true,
		confirm: {
			title: "確認",
			text: "削除しますか？"
		},
		alert: {
			title: "完了",
			text: "削除が完了しました。"
		},
		data: formData,
		callback: function(data){
			self.load();
			self.loadCombo();
		}
	});

}

/**
 * イベントoff
 *
 */
TabbodyListpage.prototype.offEvent = function(){
	$("#new-btn, #upd-btn, #add-btn, #close-btn").off("click");
	$("#date-combo").off("change");
}