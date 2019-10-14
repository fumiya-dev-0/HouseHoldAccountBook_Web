//==================================================================
// モーダルダイアログ用共通クラス
// 作成日: 2019/09/23
//
//==================================================================
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

ModalCommon.prototype = new JsonElement();

/**
 * ダイアログ初期設定
 *
 */
ModalCommon.prototype.dialog = function(option){

	if(option.buttons){

		$("#modal-footer").empty();
		option.buttons.forEach(function(button){
			var input = $("<input>")
						.val(button.text)
						.attr("type", "button")
						.on("click", button.click);

			if(this.hasAttr(button)){
				input.attr(button.attr);
			}

			if(this.hasCss(button)){
				input.css(button.css);
			}

			$("#modal-footer").append(input);
		}, this)
	}

	if(option.width){
		$("#modal-content").css("width", option.width);
	}

	if(option.height){
		$("#modal-main").css("height", option.height);
	}

}
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
 * エラーメッセージの表示
 *
 */
ModalCommon.prototype.error = function(text){

}
