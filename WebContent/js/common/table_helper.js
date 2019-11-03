/*************************************************
 * テーブル生成用ヘルパークラス
 * 作成日: 2019/09/21
 *
 *************************************************/
function TableHelper(){}

/**
 * インスタンスの取得
 *
 * @return インスタンス
 */
TableHelper.getInstance = function(){
	if(!this.tableHelper){
		this.tableHelper = new TableHelper();
	}
	return this.tableHelper;
}

/**
 * 初期設定
 *
 * @param area 表示エリア
 * @param option ヘッダー情報
 * @param data 表示データ
 */
TableHelper.prototype.table = function(area, option, data){

	// テーブルの生成
	area.html("<table></table>");
	// テーブルの取得
	table = area.find("table");
	// 行フラグの生成
	this.rFlg = this.createRowFlg(data);
	// テーブルのcss設定
	if(option.css) table.css(option.css);
	// テーブルのattr設定
	if(option.attr) table.attr(option.attr);
	// ヘッダーの作成
	if(option) this.header(table, option);
	// 行の作成
	if(data) this.addRows(table, data);
	// テーブル選択時処理
	this.select(table);
}

/**
 * ヘッダーの作成
 *
 * @param table テーブル
 * @param option ヘッダー情報
 */
TableHelper.prototype.header = function(table, option){
	// ヘッダー作成
	table.html("<thead><tr></tr></thead>");
	var self = this;
	$.each(option.columns, function(idx, column){
		// ヘッダー列作成
		self.createHeaderCol(table, idx, column);
	});
}

/**
 * ヘッダー列作成
 *
 * @param table テーブル
 * @param idx 行番号
 * @param option カラムのプロパティ
 */
TableHelper.prototype.createHeaderCol = function(table, idx, option){
	// ヘッダー列作成
	this.addHeaderCol(table.find("tr"));
	// ヘッダー列プロパティ作成
	this.setProperty(option, table.find("tr").eq(0).children().eq(idx));
}

/**
 * ボディの作成
 *
 * @param table テーブル
 * @param data 表示データ
 */
TableHelper.prototype.addRows = function(table, data){

	// ボディ要素作成
	table.append("<tbody></tbody>");
	var self = this;
	$.each(data, function(rIdx, obj){
		// 行の追加
		self.addRow(table.find("tbody"));
		// 行の取得
		var tr = self.getRow(table, rIdx + 1);
		$.each(obj, function(cIdx, value){
			// ボディ列の追加
			self.addBodyCol(tr);
			// ヘッダー列の取得
			var hCol = self.getHeaderCol(self.getRow(table, 0), cIdx);
			// ボディ列の取得、テキスト設定
			var col = self.getBodyCol(tr, cIdx).text(value);
			// 非表示処理
			self.isSetTargetHidden(hCol, col);
		});
	});
}

/**
 * 対象のヘッダーが非表示の場合は非表示にする
 *
 * @param hCol ヘッダーカラム
 * @param col カラム
 */
TableHelper.prototype.isSetTargetHidden = function(hCol, col){
	if(hCol.css("display") == "none") col.css("display", "none");
}

/**
 * 行のフラグ作成
 *
 * @param data 表示データ
 * @param rFlg 行フラグ
 */
TableHelper.prototype.createRowFlg = function(data){
	var rFlg = new Array();
	$.each(data, function(){
		rFlg[rFlg.length] = false;
	});
	return rFlg;
}

/**
 * テーブルの選択時処理
 *
 * @param table テーブル
 */
TableHelper.prototype.select = function(table){

	this.rIdx = null;
	var self = this;
	$(table.selector + " td").bind("click", function(){
		var tr = $(this).parent()[0];
		// 選択行の更新
		self.update(tr);
		// 前回選択行の更新
		self.beforeUpdate(table, tr);
		// 前回選択行番号の代入
		self.beforeRowIdx = tr.rowIndex;
	});
}

/**
 * 選択行の更新
 *
 * @param tr tr要素
 */
TableHelper.prototype.update = function(tr){
	// 選択行番号と前回選択行番号が一致していない場合
	if(this.beforeRowIdx !== tr.rowIndex){
		// カラーと行フラグの更新
		this.updateColorWithRowFlg(tr, "#eeffff", tr.rowIndex, true);
	}
}

/**
 * 前回選択行の更新
 *
 * @param table テーブル
 * @param tr tr要素
 */
TableHelper.prototype.beforeUpdate = function(table, tr){
	// 前回選択行番号が存在する場合
	if(this.beforeRowIdx){
		// 前回選択行の取得
		var beforeTr = table.find("tr")[Number(this.beforeRowIdx)];
		// 前回選択行フラグがfalseの場合
		if(!this.rFlg[this.beforeRowIdx]){
			// 前回選択行と選択行が一致する場合
			if(this.beforeRowIdx === tr.rowIndex){
				// カラーと行フラグの更新
				this.updateColorWithRowFlg(beforeTr, "#eeffff", this.beforeRowIdx, true);
			}
		}else{
			// 前回選択行フラグがtrueの場合
			// カラーと行フラグの更新
			this.updateColorWithRowFlg(beforeTr, "white", this.beforeRowIdx, false);
		}
	}
}

/**
 * カラーと行フラグ更新
 *
 * @param tr tr要素
 * @param color カラーデータ
 * @param rIdx 行番号
 * @param bool true(選択) / false(非選択)
 */
TableHelper.prototype.updateColorWithRowFlg = function(tr, color, rIdx, bool){
	$(tr).find("td").css("background-color", color);
	this.rFlg[rIdx] = bool;
}

/**
 * 表の作成(入力フォーム)
 *
 * @param area 表示エリア
 * @param option 入力フォーム情報
 */
TableHelper.prototype.form = function(area, option){

	// フォーム・テーブルの作成
	area.html("<form><table></table></form>");
	// テーブルの取得
	table = area.find("table");
	var self = this;
	$.each(option.rows, function(idx, rows){
		// 行の追加
		self.addRow(table);
		// 行の取得
		var tr = self.getRow(table, idx);

		// ヘッダー列の追加
		self.addHeaderCol(tr);
		// ヘッダー列の取得
		var th = self.getHeaderCol(tr, 0);

		// テキストエリア(左側)のプロパティ設定
		if(rows.textArea) self.setProperty(rows.textArea, th);
		// 入力エリア(右側)の設定
		if(rows.inputArea) self.setInput(rows, tr);

	});
}

/**
 * 入力部分設定
 *
 * @param rows 行データ
 * @param tr tr要素
 */
TableHelper.prototype.setInput = function(rows, tr){

	var self = this;
	$.each(rows.inputArea, function(idx, inputArea){
		if(inputArea.element) {
			// ボディ列の追加
			self.addBodyCol(tr);
			// ボディ列の取得
			var td = self.getBodyCol(tr, idx);
			// ボディ列内入力要素制定
			td.append("<" + inputArea.element + ">" + "</" + inputArea.element + ">");
			// 入力要素のプロパティ設定
			self.setProperty(inputArea, td.find(inputArea.element));
		}
	});
}

/**
 * コンボボックス設定
 *
 * @param parent テーブルの親要素
 * @param rIdx 行番号
 * @param cIdx 列番号
 * @param data 表示データ
 */
TableHelper.prototype.setCombobox = function(parent, rIdx, cIdx, data){
	var select = $(parent.selector + " table").find("tbody").children().eq(rIdx).children().eq(cIdx).find("select");
	this.setSelect(select, data);
}

/**
 * コンボボックス設定
 *
 * @param select select要素
 * @param data 表示データ
 */
TableHelper.prototype.setSelect = function(select, data){

	var self = this;
	self.createOption(select, 0, "", "");
	$.each(data, function(idx, obj){
		self.createOption(select, idx+1, obj[Object.keys(obj)[0]], obj[Object.keys(obj)[1]]);
	});
}

/**
 * オプション(コンボボックス)の作成
 *
 * @param select select要素
 * @param idx 表示データの番号
 * @param val 表示データ(value)
 * @param text 表示データ(text)
 */
TableHelper.prototype.createOption = function(select, idx, val, text){
	select.append("<option></option>").find("option").eq(idx).val(val).text(text);
}

/**
 * 行の追加
 *
 * @param table テーブル
 */
TableHelper.prototype.addRow = function(table){
	table.append("<tr></tr>");
}

/**
 * 行の取得
 *
 * @param table テーブル
 * @param rIdx 行番号
 * @return 行(tr)要素
 */
TableHelper.prototype.getRow = function(table, rIdx){
	return table.find("tr").eq(rIdx);
}

/**
 * 列の追加(ヘッダー)
 *
 * @param tr tr要素
 */
TableHelper.prototype.addHeaderCol = function(tr){
	tr.append("<th></th>");
}

/**
 * 列の取得(ヘッダー)
 *
 * @param tr tr要素
 * @param cIdx 列番号
 * @return 列(th)要素
 */
TableHelper.prototype.getHeaderCol = function(tr, cIdx){
	return tr.find("th").eq(cIdx);
}

/**
 * 列の追加(ボディ)
 *
 * @param tr tr要素
 */
TableHelper.prototype.addBodyCol = function(tr){
	tr.append("<td></td>");
}

/**
 * 列の取得(ボディ)
 *
 * @param tr tr要素
 * @param cIdx カラム番号
 * @return 列(td)要素
 */
TableHelper.prototype.getBodyCol = function(tr, cIdx){
	return tr.find("td").eq(cIdx);
}

/**
 * プロパティの設定
 *
 * @param option プロパティ情報
 * @param element 指定要素
 */
TableHelper.prototype.setProperty = function(option, element){
	if(option.text) element.text(option.text);
	if(option.css) element.css(option.css);
	if(option.attr) element.attr(option.attr);
}
