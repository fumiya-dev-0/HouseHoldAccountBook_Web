/*************************************************
 * ベースダイアログクラス
 * 作成日: 2019/11/09
 *
 *************************************************/
function BaseDialog(){}

/**
 * モーダルダイアログの表示
 *
 */
BaseDialog.prototype.show = function(){

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if(this.overlay[0]){
		return;
	}

	// オーバーレイの追加
	this.addOverlay();

	// モーダルダイアログのセンタリング
	this.centering();

	// オーバーレイ、モーダルダイアログをフェードインさせる
	$(this.modal.selector + ", " + this.overlay.selector).fadeIn("normal");
}

/**
 * オーバーレイを削除し、モーダルダイアログを閉じる
 *
 * @param callback コールバック関数
 */
BaseDialog.prototype.close = function(callback){

	var cnt = 0;
	var self = this;
	// モーダルダイアログとオーバーレイをフェードアウト
	$(this.modal.selector + ", " + this.overlay.selector).fadeOut("normal", function(){
		if(cnt < 1){
			$(self.overlay.selector).remove();
			if(callback){
				callback();
			}
			cnt++;
		}
	});

}

/**
 * オーバーレイの追加
 *
 */
BaseDialog.prototype.addOverlay = function(){
	// オーバーレイidの取得
	var selector = this.overlay.selector;
	var overlayId = selector.substring(selector.indexOf("#") + 1, selector.length);
	// オーバーレイの追加
	this.overlayTarget.append("<div id='" + overlayId + "' class='overlay overlay-translucent'></div>");
}

/**
 * ダイアログのセンタリングを行う
 *
 */
BaseDialog.prototype.centering = function(){

	// ウィンドウの幅を取得
	var width = $(window).width();
	// ウィンドウの高さを取得
	var height = $(window).height();

	// モーダルダイアログの幅を取得
	var modalWidth = this.modal.outerWidth();
	// モーダルダイアログの高さを取得
	var modalHeight = this.modal.outerHeight();

	// モーダルダイアログの左端ピクセルを計算
	var pxLeft = ( ( width - modalWidth ) / 2 );
	// モーダルダイアログの上部ピクセルを計算
	var pxTop = ( ( height - modalHeight ) / 2 ) - 48;

	// CSSの追加: left, top
	this.modal.css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});
}

/**
 * 前処理
 *
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 * @param content モーダルダイアログ コンテンツ要素
 * @param header モーダルダイアログ ヘッダーId
 * @param footer モーダルダイアログ フッターId
 * @param overlayTarget オーバーレイ追加対象要素のId
 */
BaseDialog.prototype.init = function(modal, overlay, content, header, footer, overlayTarget){

	// モーダルダイアログの追加
	this.modal = modal;
	// オーバーレイの追加
	this.overlay = overlay;
	// ダイアログコンテンツの追加
	this.content = content;
	// ダイアログヘッダーの追加
	this.header = header;
	// ダイアログフッター配列の追加
	this.footer = footer;
	// オーバーレイ対象の設定
	this.overlayTarget = overlayTarget;
}