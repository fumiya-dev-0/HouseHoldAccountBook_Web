//==================================================================
// モーダルダイアログ用共通クラス
// 作成日: 2019/09/23
//
//==================================================================
/**
 * コンストラクタ
 *
 */
function ModalCommon(){

	$("#modal_close_button")
	.off("click")
	.on("click", $.proxy(function(){
		// モーダルダイアログを閉じる
		this.hide();
	}, this))
	.hover(function(){
		$(this).css("opacity", "1");
	})
	.mouseout(function(){
		$(this).css("opacity", "0.5");
	});
}

ModalCommon.prototype = new ElementCommon();

/**
 * モーダルダイアログの表示
 */
ModalCommon.prototype.show = function(_this){

	// ボタンからフォーカスを外す
	$(_this).blur();

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if($("#modal-overlay")[0]){
		return;
	}

	// オーバーレイの追加
	$("body").append("<div id='modal-overlay'></div>");

	// モーダルダイアログのセンタリング
	this.centeringModalSyncer();

	// オーバーレイ、モーダルダイアログをフェードインさせる
	$("#modal-overlay, #modal-content").fadeIn("slow");
}

/**
 * モーダルダイアログを閉じる
 */
ModalCommon.prototype.hide = function(){

	// モーダルダイアログとオーバーレイをフェードアウト
	$("#modal-content, #modal-overlay").fadeOut("slow", function(){

		$("#modal-overlay").remove();

	});
}

/**
 * モーダルダイアログのセンタリングを行う
 *
 */
ModalCommon.prototype.centeringModalSyncer = function(){

	// ウィンドウの幅を取得
	var width = $(window).width();
	// ウィンドウの高さを取得
	var height = $(window).height();

	// モーダルダイアログの幅を取得
	var contentWidth = $("#modal-content").outerWidth();

	// モーダルダイアログの高さを取得
	var contentHeight = $("#modal-content").outerHeight();

	// モーダルダイアログの左端ピクセルを計算
	var pxLeft = ( ( width - contentWidth ) / 2 );

	// モーダルダイアログの上部ピクセルを計算
	var pxTop = ( ( height - contentHeight ) / 2 ) - 48;

	// CSSの追加: left, top
	$("#modal-content").css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});

}

/**
 * 横幅の設定
 *
 */
ModalCommon.prototype.setWidth = function(width){
	$("#modal-content").css("width", width);
}

/**
 * 縦幅の設定
 *
 */
ModalCommon.prototype.setHeight = function(height){
	$("#modal-main").css("height", height);
}

/**
 * フッダーの設定
 *
 */
ModalCommon.prototype.setFooter = function(option){
	var element = null;
	if(this.hasElement(option)){
		element = $("<" + option.element + ">");
	}
	this.setProperty(option, element);
	$("#modal-footer").html(element);
}

/**
 * プロパティの設定
 *
 */
ModalCommon.prototype.setProperty = function(option, element){

	if(this.hasText(option)){
		element.text(option.text);
	}

	if(this.hasCss(option)){
		element.css(option.css);
	}

	if(this.hasAttr(option)){
		element.attr(option.attr);
	}
}

