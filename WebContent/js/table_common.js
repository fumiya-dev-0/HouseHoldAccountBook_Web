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
	if(element.hasChildNodes()){
		element.removeChild(element.children[0]);
	}
	element.appendChild(table);
	this.table = element.children[0];
}

/**
 * ヘッダー部分制御
 *
 */
TableCommon.prototype.setColumns = function(options){

	var tr = document.createElement("tr");
	options.forEach(function(option){

		if(this.isId(option)){
			this.setId(option);
			return;
		}
		var th = document.createElement("th");

		if(this.isTitle(option)){
			this.setTitle(option, th);
		}

		if(this.isCss(option)){
			this.setCss(option, th);
		}

		if(this.isAttr(option)){
			this.setAttr(option, th);
		}

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

		if(this.isId(option)){
			this.setId(option);
			return;
		}
		var th = document.createElement("th");

		if(this.isTitle(option)){
			this.setTitle(option, th);
		}

		if(this.isCss(option)){
			this.setCss(option, th);
		}

		if(this.isAttr(option)){
			this.setAttr(option, th);
		}

		tr.appendChild(th);

		if(this.isNext(option)){
			this.setNext(option, tr);
		}

		this.table.appendChild(tr);
	}, this)

}

/**
 * セレクタ(Id)存在チェック
 *
 */
TableCommon.prototype.isId = function(option){
	return option.id ? true : false;
}

/**
 * セレクタ(Id)設定
 *
 */
TableCommon.prototype.setId = function(option){
	this.table.setAttribute("id", option.id);
}

/**
 * タイトル存在チェック
 *
 */
TableCommon.prototype.isTitle = function(option){
	return option.title ? true : false;
}

/**
 * タイトル設定
 *
 */
TableCommon.prototype.setTitle = function(option, column){
	column.textContent = option.title;
}

/**
 * CSS存在チェック
 *
 */
TableCommon.prototype.isCss = function(option){
	return option.css ? true : false;
}

/**
 * CSS設定
 *
 */
TableCommon.prototype.setCss = function(option, column){
	Object.keys(option.css).forEach(function(prop, val){
		column.style[prop] = option.css[prop];
	})
}

/**
 * 属性存在チェック
 *
 */
TableCommon.prototype.isAttr = function(option){
	return option.attr ? true : false;
}

/**
 * 属性設定
 *
 */
TableCommon.prototype.setAttr = function(option, column){
	Object.keys(option.attr).forEach(function(prop, val){
		column.setAttribute(prop, option.attr[prop]);
	})
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

		if(this.isAttr(option.next)){
			this.setAttr(option.next, element);
		}

		if(this.isCss(option.next)){
			this.setCss(option.next, element);
		}

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
 * オプション作成
 *
 */
TableCommon.prototype.createOption = function(obj){
	var option = document.createElement("option");
	option.value = obj[Object.keys(obj)[0]];
	option.text = obj[Object.keys(obj)[1]];
	return option;
}

