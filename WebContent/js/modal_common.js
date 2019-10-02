//==================================================================
// モーダルダイアログ用共通クラス
// 作成日: 2019/09/23
//
//==================================================================
/**
 * コンストラクタ
 *
 */
function ModalCommon(){}

/**
 * モーダルダイアログの表示
 */
ModalCommon.prototype.show = function(){

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if($("#modal-overlay")[0]){
		return;
	}

	// オーバーレイの追加
	$("body").append("<div id='modal-overlay'></div>");

	// モーダルダイアログのセンタリング
	centeringModalSyncer();

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
function centeringModalSyncer(){

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
	var pxTop = ( ( height - contentHeight ) / 2 );

	// CSSの追加: left, top
	$("#modal-content").css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});

}