//=================================================================
// テーブル生成用共通クラス
// 作成日: 2019/09/21
//
//==================================================================
function TableCommon(elementId){
	var table = document.createElement("table");

	this.elementId = elementId;
	var element = document.getElementById(elementId);

	this.updateChild(element, table);
	this.gTable = element.children[0];
}

TableCommon.prototype = new JsonElement();

/**
 * 初期設定
 *
 */
TableCommon.prototype.table = function(options){

	// テーブル設定(id)
	this.setProperty(options, this.gTable);

	this.header(options);
}

/**
 * ヘッダーの作成
 *
 */
TableCommon.prototype.header = function(options){

	var tr = document.createElement("tr");
	options.columns.forEach(function(column){

		var th = document.createElement("th");
		this.setProperty(column, th);
		tr.appendChild(th);
	}, this)

	this.gTable.appendChild(tr);
}

/**
 * 行の追加
 *
 */
TableCommon.prototype.addRows = function(valueArray){

	var tr = document.createElement("tr");
	var idx = 0;
	valueArray.forEach(function(val){

		var td = document.createElement("td");
		td.textContent = val;
		// 非表示対象の場合は、非表示にする
		if(this.isTargetHidden(idx)){
			this.setColumnHidden(td);
		}
		tr.append(td);

		this.gTable.appendChild(tr);
		idx++;
	}, this)
}

/**
 * 非表示対象かチェック
 *
 */
TableCommon.prototype.isTargetHidden = function(idx){
	var th = this.gTable.rows[0].cells[idx];
	return th.style.display == "none" ? true : false;
}

/**
 * カラムを非表示
 *
 */
TableCommon.prototype.setColumnHidden = function(element){
	element.style.display = "none";
}

/**
 * 表の作成(入力フォーム)
 *
 */
TableCommon.prototype.form = function(options){

	var form = document.createElement("form");
	form.appendChild(this.gTable);
	this.updateChild(document.getElementById(this.elementId), form);

	options.rows.forEach(function(rows){
		var tr = document.createElement("tr");
		var th = document.createElement("th");

		this.setProperty(rows.textArea, th);

		tr.appendChild(th);

		if(this.isInputArea(rows)){
			this.setInputArea(rows, tr);
		}

		this.gTable.appendChild(tr);
	}, this)

}

/**
 * 入力部分存在チェック
 *
 */
TableCommon.prototype.isInputArea = function(option){
	return option.inputArea ? true : false;
}

/**
 * 入力部分設定
 *
 */
TableCommon.prototype.setInputArea = function(option, tr){

	var td = document.createElement("td");
	option.inputArea.forEach(function(inputArea){
		if(inputArea.element){
			var element = document.createElement(inputArea.element);

			this.setProperty(inputArea, element);

			td.appendChild(element);
			tr.appendChild(td);
		}
	}, this)
}

/**
 * コンボボックス設定
 *
 */
TableCommon.prototype.setCombobox = function(rowIdx, columnIdx, data){
	var select = this.gTable.rows[rowIdx].cells[columnIdx].children[0];
	this.setSelectToOption(select, data);
}

/**
 * コンボボックスに設定
 *
 */
TableCommon.prototype.setSelectToOption = function(select, data){

	// 初期値の設定
	var defaultOption = this.createOption(new Array("",""));
	select.appendChild(defaultOption);

	data.forEach(function(obj){
		var option = this.createOption(obj);
		select.appendChild(option);
	}, this)
}

/**
 * オプション作成(コンボボックス)
 *
 */
TableCommon.prototype.createOption = function(obj){
	var option = document.createElement("option");
	option.value = obj[Object.keys(obj)[0]];
	option.text = obj[Object.keys(obj)[1]];
	return option;
}

/**
 * プロパティの設定
 *
 */
TableCommon.prototype.setProperty = function(option, element){

	if(this.hasText(option)){
		this.setText(option, element);
	}

	if(this.hasCss(option)){
		this.setCss(option, element);
	}

	if(this.hasAttr(option)){
		this.setAttr(option, element);
	}
}
