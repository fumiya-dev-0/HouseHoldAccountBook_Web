/*************************************************
 * テーブル生成用ヘルパークラス
 * 作成日: 2019/09/21
 *
 *************************************************/
function TableHelper(){}

/**
 * メソッドチェーン
 *
 */
TableHelper.prototype = {

		// テーブルの作成
		addTable: function(parent){
			parent.html("<table></table>");
			return this;
		},

		// テーブルの取得
		getTable: function(parent){
			return parent.find("table");
		},

		// フォームの作成
		addForm: function(parent){
			parent.html("<form></form>");
			return this;
		},

		// フォームの取得
		getForm: function(parent){
			return parent.find("form");
		},

		// theadの追加
		addTHead: function(){
			return this.mTable.append("<thead></thead>");
		},

		// theadの取得
		getTHead: function(){
			return this.mTable.find("thead");
		},

		// tbodyの追加
		addTBody: function(){
			return this.mTable.append("<tbody></tbody>");
		},

		// tbodyの取得
		getTBody: function(){
			return this.mTable.find("tbody");
		},

		// ヘッダー行の追加
		addHRows: function(){
			this.mTable.find("thead").append("<tr></tr>");
			return this;
		},

		// ヘッダー行の取得
		hRows: function(rIdx){
			this.hRow = this.mTable.find("thead").find("tr").eq(rIdx);
			return this;
		},

		// 行の取得
		rows: function(rIdx){
			this.row = this.mTable.find("tbody").find("tr").eq(rIdx);
			return this;
		},

		// 行の追加
		addRows: function(){
			this.mTable.find("tbody").append("<tr></tr>");
			return this;
		},

		// ヘッダー列の追加
		addHCols: function(rIdx){
			return this.mTable.find("thead").find("tr").eq(rIdx).append("<th></th>");
		},

		// ヘッダー列の取得
		hCols: function(cIdx){
			this.hCol = this.hRow.find("th").eq(cIdx);
			return this;
		},

		// 列の追加
		addCols: function(rIdx){
			return this.mTable.find("tbody").find("tr").eq(rIdx).append("<td></td>");
		},

		// 列の取得
		cols: function(cIdx){
			this.col = this.row.find("td").eq(cIdx);
			return this;
		},

		// ヘッダー列
		getHCol: function(){
			return this.hCol;
		},

		// 列
		getCol: function(){
			return this.col;
		},

		// ヘッダー行
		getHRow: function(){
			return this.hRow;
		},

		// 行
		getRow: function(){
			return this.row;
		},

		// テキスト取得
		getText: function(){
			return this.col.text();
		},

		// テキスト設定
		setText: function(text){
			this.col.text(text);
		},

		// 値取得
		getValue: function(){
			return this.col.children().val();
		},

		// 値設定
		setValue: function(val){
			this.col.children().val(val);
		},

		// エラー表示
		error: function(msg){
			this.col.children().css({"background-color" :"#ffb6c1", "border-color" : "red", "color" : "white"});
			this.col.next().children().text(msg);
		},

		// エラークリア
		clear: function(){
			this.col.children().css({"background-color" :"white", "border-color" : "#D8D8D8", "color" : "black"});
			this.col.next().children().text("");
		}

}

/*************************************************
 * テーブル生成
 *************************************************/
/**
 * テーブル生成
 *
 * @param parent 表示エリア
 * @param option ヘッダー情報
 * @param data 表示データ
 */
TableHelper.prototype.table = function(parent, option, data){

	// テーブルの生成
	this.addTable(parent);
	// テーブルの取得
	this.mTable = this.getTable(parent);
	// 行フラグの生成
	this.rFlg = this.createRowFlg(data);
	// プロパティの設定
	this.addProp(option, this.mTable);
	// ヘッダーの作成
	if(option){
		this.header(option);
	}
	// 行の作成
	if(data){
		this.body(data);
	}
	// テーブル選択時処理
	this.select();
}

/**
 * 行フラグ作成
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
 * ヘッダーの作成
 *
 * @param option ヘッダー情報
 */
TableHelper.prototype.header = function(option){

	// ヘッダー追加
	this.addTHead();
	// ヘッダー行追加
	this.addHRows();

	$.each(option.columns, $.proxy(function(idx, cOption){

		// ヘッダー列追加
		this.addHCols(0);
		// ヘッダー列取得
		var hCol = this.hRows(0).hCols(idx).getHCol();
		// ヘッダー列プロパティ追加
		this.addProp(cOption, hCol);
	}, this));
}

/**
 * 行の追加
 *
 * @param data 表示データ
 */
TableHelper.prototype.body = function(data){

	// ボディ要素作成
	this.addTBody();

	$.each(data, $.proxy(function(rIdx, obj){

		// 行の追加
		this.addRows();
		// 列の追加
		this.addBodyCols(obj, rIdx);
	}, this));
}

/**
 * 列の追加
 *
 * @param obj オブジェクト
 * @param rIdx 行番号
 */
TableHelper.prototype.addBodyCols = function(obj, rIdx){

	$.each(obj, $.proxy(function(cIdx, val){

		// ボディ列の追加
		this.addCols(rIdx);
		// ヘッダー列の取得
		var hCol = this.hRows(0).hCols(cIdx).getHCol();
		// ボディ列の取得
		var col = this.rows(rIdx).cols(cIdx).getCol();
		// ボディ列のテキスト設定
		this.rows(rIdx).cols(cIdx).setText(val);
		// 非表示処理
		if(hCol.css("display") == "none"){
			col.css("display", "none");
		}
	}, this));

}

/**
 * テーブルの選択時処理
 *
 * @param table テーブル
 */
TableHelper.prototype.select = function(){

	this.rIdx = null;
	var self = this;
	$(this.mTable.selector + " td").bind("click", function(){
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
		var beforeTr = this.mTable.find("tr")[Number(this.beforeRowIdx)];
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
 * @param tr 行要素
 * @param color カラーデータ
 * @param rIdx 行番号
 * @param bool true(選択) / false(非選択)
 */
TableHelper.prototype.updateColorWithRowFlg = function(tr, color, rIdx, bool){
	$(tr).find("td").css("background-color", color);
	this.rFlg[rIdx] = bool;
}

/**
 * 行選択チェック
 *
 */
TableHelper.prototype.isRow = function(){
	var bool = false;
	if(this.rFlg){
		bool = this.isRowBool(bool);
	}
	return bool;
}

/**
 * 行選択チェック処理
 *
 * @param bool true(選択) / false(未選択)
 * @return true(選択) / false(未選択)
 */
TableHelper.prototype.isRowBool = function(bool){
	$.each(this.rFlg, function(idx, isBool){
		if(isBool){
			bool = true;
		}
	});
	return bool;
}

/**
 * 選択行番号取得
 *
 * @return 選択行番号
 */
TableHelper.prototype.getRowIdx = function(){
	var rIdx = null;
	$.each(this.rFlg, function(idx, isBool){
		if(isBool){
			rIdx = idx;
		}
	});
	return rIdx;
}

/*************************************************
 * 入力フォーム生成
 *************************************************/
/**
 * 表の作成(入力フォーム)
 *
 * @param parent 表示エリア
 * @param option 入力フォーム情報
 */
TableHelper.prototype.form = function(parent, option){

	// フォームの追加
	this.addForm(parent);
	// フォームの取得
	var form = this.getForm(parent);
	// テーブルの追加
	this.addTable(form);
	// テーブルの取得
	this.mTable = this.getTable(form);
	// tbody要素追加
	this.addTBody();

	$.each(option.rows, $.proxy(function(rIdx, rows){

		// 行の追加
		this.addRows();
		// ヘッダー列の追加
		this.addCols(rIdx);
		// ヘッダー列の取得
		var th = this.rows(rIdx).cols(0).getCol();

		// テキストエリア(左側)のプロパティ追加
		if(rows.textArea){
			this.addProp(rows.textArea, th);
		}

		// 入力エリア(右側)の設定
		if(rows.inputArea){
			this.setInput(rows, rIdx);
		}

	}, this));
}

/**
 * 入力部分設定
 *
 * @param rows 行データ
 * @param tr tr要素
 */
TableHelper.prototype.setInput = function(rows, rIdx){

	$.each(rows.inputArea, $.proxy(function(cIdx, inputArea){
		if(inputArea.element) {
			// 列の追加
			this.addCols(rIdx);
			// 列の取得
			var td = this.rows(rIdx).cols(cIdx + 1).getCol();
			// ボディ列内入力要素制定
			td.append("<" + inputArea.element + ">" + "</" + inputArea.element + ">");
			// 入力要素のプロパティ設定
			this.addProp(inputArea, td.find(inputArea.element));
		}
	}, this));
}

/**
 * コンボボックス設定
 *
 * @param parent テーブルの親要素
 * @param rIdx 行番号
 * @param cIdx 列番号
 * @param data 表示データ
 */
TableHelper.prototype.setCombobox = function(rIdx, cIdx, data){
	var select = this.rows(rIdx).cols(cIdx).getCol().find("select");
	this.addOption(select, data);
}

/**
 * option要素の追加
 *
 * @param select select要素
 * @param data 表示データ
 */
TableHelper.prototype.addOption = function(select, data){

	var self = this;
	select.append("<option></option>").find("option").eq(0).val("").text("");
	$.each(data, function(idx, obj){
		var val = obj[Object.keys(obj)[0]];
		var text = obj[Object.keys(obj)[1]];
		// option要素の追加
		select.append("<option></option>");
		// option要素に値設定
		select.find("option").eq(idx + 1).val(val).text(text);
	});
}

/**
 * プロパティの設定
 *
 * @param option プロパティ情報
 * @param element 指定要素
 */
TableHelper.prototype.addProp = function(option, element){
	if(option.text){
		element.text(option.text);
	}
	if(option.css){
		element.css(option.css);
	}
	if(option.attr){
		element.attr(option.attr);
	}
}
