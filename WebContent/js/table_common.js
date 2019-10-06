//=================================================================
// テーブル生成用共通クラス
// 作成日: 2019/09/21
//
//==================================================================
TableCommon.prototype.table = null;

/**
 * コンストラクタ
 *
 */
function TableCommon(elementId){
	var table = document.createElement("table");

	var element = document.getElementById(elementId);

	this.updateChild(element, table);
	this.table = element.children[0];
}

TableCommon.prototype = new ElementCommon();

TableCommon.prototype.setTableId = function(option){
	this.setAttr(option, this.table);
}
/**
 * ヘッダー部分制御
 *
 */
TableCommon.prototype.setColumns = function(options){

	var tr = document.createElement("tr");
	options.forEach(function(option){

		var th = document.createElement("th");

		if(this.setTableProperty(option, this.table)){
			return;
		}

		this.setColumnProperty(option, th);

		tr.appendChild(th);
	}, this)

	this.table.appendChild(tr);
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

		this.table.appendChild(tr);
		idx++;
	}, this)
}

/**
 * 非表示対象かチェック
 *
 */
TableCommon.prototype.isTargetHidden = function(idx){

	var th = this.table.rows[0].cells[idx];

	if(th.style.display == "none"){
		return true;
	}
	return false;
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
TableCommon.prototype.addFormVertical = function(options){

	options.forEach(function(option){
		var tr = document.createElement("tr");
		var th = document.createElement("th");

		if(this.setTableProperty(option, this.table)){
			return;
		}

		this.setColumnProperty(option, th);

		tr.appendChild(th);

		if(this.isNext(option)){
			this.setNext(option, tr);
		}

		this.table.appendChild(tr);
	}, this)

}

/**
 * 次表示存在チェック
 *
 */
TableCommon.prototype.isNext = function(option){
	return option.next ? true : false;
}

/**
 * 次要素設定
 *
 */
TableCommon.prototype.setNext = function(option, tr){
	if(option.next.element){
		var element = document.createElement(option.next.element);
		var td = document.createElement("td");

		this.setColumnProperty(option.next, element);

		td.appendChild(element);
		tr.appendChild(td);
	}
}

/**
 * コンボボックス設定
 *
 */
TableCommon.prototype.setCombobox = function(rowIdx, columnIdx, data){
	var select = this.table.rows[rowIdx].cells[columnIdx].children[0];
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
 * テーブルプロパティの設定
 *
 */
TableCommon.prototype.setTableProperty = function(option, table){

	if(this.hasAttr(option)){
		this.setAttr(option, table);
		return true;
	}

	return false;
}

/**
 * カラムプロパティの設定
 *
 */
TableCommon.prototype.setColumnProperty = function(option, column){

	if(this.hasText(option)){
		this.setText(option, column);
	}

	if(this.hasCss(option)){
		this.setCss(option, column);
	}

	if(this.hasAttr(option)){
		this.setAttr(option, column);
	}
}
