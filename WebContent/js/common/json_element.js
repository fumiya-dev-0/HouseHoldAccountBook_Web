//==================================================================
// 要素用共通クラス
// 作成日: 2019/10/05
//
//==================================================================
function JsonElement(){}

/**
 * テキスト存在チェック
 *
 */
JsonElement.prototype.hasText = function(option){
	return option.text ? true : false;
}

/**
 * 要素のテキストを設定
 *
 */
JsonElement.prototype.setText = function(option, element){
	element.textContent = option.text;
}

/**
 * CSS存在チェック
 *
 */
JsonElement.prototype.hasCss = function(option){
	return option.css ? true : false;
}

/**
 * CSS設定
 *
 */
JsonElement.prototype.setCss = function(option, element){
	Object.keys(option.css).forEach(function(prop, val){
		element.style[prop] = option.css[prop];
	})
}

/**
* 属性存在チェック
*
*/
JsonElement.prototype.hasAttr = function(option){
	return option.attr ? true : false;
}

/**
* 属性設定
*
*/
JsonElement.prototype.setAttr = function(option, element){
	Object.keys(option.attr).forEach(function(prop, val){
		element.setAttribute(prop, option.attr[prop]);
	})
}

/**
* 要素存在チェック
*
*/
JsonElement.prototype.hasElement = function(option){
	return option.element ? true : false;
}


/**
 * 要素内の更新
 *
 */
JsonElement.prototype.updateChild = function(element, child){

	if(element.hasChildNodes()){
		element.removeChild(element.children[0]);
	}
	element.appendChild(child);

}
