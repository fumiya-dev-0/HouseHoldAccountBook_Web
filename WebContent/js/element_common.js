// ==================================================================
// 要素生成用共通クラス
// 作成日: 2019/09/21
//
// ==================================================================
/**
 * コンストラクタ
 *
 * @returns
 */
function ElementCommon(){}

/**
 * 要素の存在チェック
 */
ElementCommon.prototype.elementExists = function(element){
	return element[0] ? true : false;
}

/**
 * 要素のCSSプロパティ変更
 *
 */
ElementCommon.prototype.elementCssPropertyUpdate = function(element, property, value){
	element.css(property, value);
}

/**
 * 要素のCSSプロパティチェック
 */
ElementCommon.prototype.elementHasCssProperty = function(element, property, value){
	return element.css(property) == value ? true : false;
}

/**
 * 要素内に子要素の追加
 */
ElementCommon.prototype.parentAppendElement = function(parent, child){
	parent.append(child);
}

/**
 * 要素をフェードイン
 *
 */
ElementCommon.prototype.elementSlowFadeIn = function(element){
	element.fadeIn("slow");
}