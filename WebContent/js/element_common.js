//==================================================================
// 要素用共通クラス
// 作成日: 2019/10/05
//
//==================================================================
function ElementCommon(){}

/**
 * テキスト存在チェック
 *
 */
ElementCommon.prototype.hasText = function(option){
	return option.text ? true : false;
}

/**
 * 要素のテキストを設定
 *
 */
ElementCommon.prototype.setText = function(option, element){
	element.textContent = option.text;
}

/**
 * CSS存在チェック
 *
 */
ElementCommon.prototype.hasCss = function(option){
	return option.css ? true : false;
}

/**
 * CSS設定
 *
 */
ElementCommon.prototype.setCss = function(option, element){
	Object.keys(option.css).forEach(function(prop, val){
		element.style[prop] = option.css[prop];
	})
}

/**
* 属性存在チェック
*
*/
ElementCommon.prototype.hasAttr = function(option){
	return option.attr ? true : false;
}

/**
* 属性設定
*
*/
ElementCommon.prototype.setAttr = function(option, element){
	Object.keys(option.attr).forEach(function(prop, val){
		element.setAttribute(prop, option.attr[prop]);
	})
}

/**
* 要素存在チェック
*
*/
ElementCommon.prototype.hasElement = function(option){
	return option.element ? true : false;
}


/**
 * 要素内の更新
 *
 */
ElementCommon.prototype.updateChild = function(element, child){

	if(element.hasChildNodes()){
		element.removeChild(element.children[0]);
	}
	element.appendChild(child);

}
