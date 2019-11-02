//=================================================================
// テーブル生成用共通クラス
// 作成日: 2019/09/21
//
//=================================================================
function TableUtil(){}

/**
 * 初期設定
 *
 */
TableUtil.table = function(area, option, data){

	area.html("<table></table>");
	table = area.find("table");

	// テーブル設定
	if(option.css) table.css(option.css);
	if(option.attr) table.attr(option.attr);

	if(option) this.header(option, table);

	if(data) this.addRows(data, table);
}

/**
 * ヘッダーの作成
 *
 */
TableUtil.header = function(options, table){

	table.html("<thead><tr></tr></thead>");
	var self = this;
	$.each(options.columns, function(idx, option){
		self.createHeaderCol(table, idx, option);
	});
}

/**
 * ヘッダー列作成
 *
 */
TableUtil.createHeaderCol = function(table, idx, option){

	var tr = table.find("tr");
	this.addHeaderCol(tr);
	this.setProperty(option, tr.children().eq(idx));
}

/**
 * ボディの作成
 *
 */
TableUtil.addRows = function(data, table){

	table.append("<tbody></tbody>");
	var self = this;
	$.each(data, function(rIdx, obj){

		self.addRow(table.find("tbody"));
		var tr = self.getRow(table, rIdx + 1);

		$.each(obj, function(cIdx, value){
			self.addBodyCol(tr);

			var col = self.getBodyCol(tr, cIdx).text(value);
			var hCol = self.getHeaderCol(self.getRow(table, 0), cIdx);
			// 非表示処理
			self.isSetTargetHidden(hCol, col);

		});
	});
}

/**
 * 対象のヘッダーが非表示の場合は非表示にする
 *
 */
TableUtil.isSetTargetHidden = function(hCol, col){
	if(hCol.css("display") == "none") col.css("display", "none");
}

/**
 * 表の作成(入力フォーム)
 *
 */
TableUtil.form = function(area, options){

	area.html("<form><table></table></form>");
	table = area.find("table");
	var self = this;
	$.each(options.rows, function(idx, rows){

		self.addRow(table);
		var tr = self.getRow(table, idx);

		self.addHeaderCol(tr);
		var th = self.getHeaderCol(tr, 0);

		if(rows.textArea) self.setProperty(rows.textArea, th);
		if(rows.inputArea) self.setInput(rows, tr);

	});
}

/**
 * 入力部分設定
 *
 */
TableUtil.setInput = function(rows, tr){

	var self = this;
	$.each(rows.inputArea, function(idx, inputArea){
		if(inputArea.element) {

			self.addBodyCol(tr);
			var td = self.getBodyCol(tr, idx);
			td.append("<" + inputArea.element + ">" + "</" + inputArea.element + ">");
			self.setProperty(inputArea, td.find(inputArea.element));
		}
	});
}

/**
 * 行の追加
 *
 */
TableUtil.addRow = function(table){
	table.append("<tr></tr>");
}

/**
 * 行の取得
 *
 */
TableUtil.getRow = function(table, idx){
	return table.find("tr").eq(idx);
}

/**
 * 列の追加(ヘッダー)
 *
 */
TableUtil.addHeaderCol = function(tr){
	tr.append("<th></th>");
}

/**
 * 列の取得(ヘッダー)
 *
 */
TableUtil.getHeaderCol = function(tr, cIdx){
	return tr.find("th").eq(cIdx);
}

/**
 * 列の追加(ボディ)
 *
 */
TableUtil.addBodyCol = function(tr){
	tr.append("<td></td>");
}

/**
 * 列の取得(ボディ)
 *
 */
TableUtil.getBodyCol = function(tr, cIdx){
	return tr.find("td").eq(cIdx);
}

/**
 * コンボボックス設定
 *
 */
TableUtil.setCombobox = function(parent, rIdx, cIdx, data){
	var select = $(parent.selector + " table").find("tbody").children().eq(rIdx).children().eq(cIdx).find("select");
	this.setSelect(select, data);
}

/**
 * コンボボックス設定
 *
 */
TableUtil.setSelect = function(select, data){

	var self = this;
	self.createOption(select, 0, "", "");
	$.each(data, function(idx, obj){
		self.createOption(select, idx+1, obj[Object.keys(obj)[0]], obj[Object.keys(obj)[1]]);
	});
}

/**
 * オプション(コンボボックス)の作成
 *
 */
TableUtil.createOption = function(select, idx, val, text){
	select.append("<option></option>").find("option").eq(idx).val(val).text(text);
}

/**
 * プロパティの設定
 *
 */
TableUtil.setProperty = function(option, element){
	if(option.text) element.text(option.text);
	if(option.css) element.css(option.css);
	if(option.attr) element.attr(option.attr);
}
