//==================================================================
// モーダルダイアログ用共通クラス
// 作成日: 2019/09/23
//
//==================================================================
function ModalCommon(){
	this.content = $("#modal-content");
	this.header = null;
	this.footer = null;
}

ModalCommon.prototype = new JsonElement();

/**
 * ダイアログ初期設定
 *
 */
ModalCommon.prototype.dialog = function(option){

	// ヘッダー作成
	this.createHeader();

	// ヘッダー内子要素作成
	if(this.header) this.createHeaderChild();

	// フッター作成
	this.createFooter();

	// フッター内子要素作成
	if(this.footer) this.createFooterChild(option.buttons);

	if(option.width) this.content.css("width", option.width);

	if(option.height) $("#modal-main").css("height", option.height);

}

/**
 * ヘッダーの作成
 *
 */
ModalCommon.prototype.createHeader = function(){
	// ヘッダーが存在しない場合のみ作成する
	if(this.content.find("#modal-header").length == 0) {
		var div = $("<div>").attr("id","modal-header");
		this.content.prepend(div);
		this.header = $("#modal-header");
	}
}

/**
 * ヘッダー内(子要素)の作成
 *
 */
ModalCommon.prototype.createHeaderChild = function(){
	this.header.empty();
	var input =
		$("<input>")
		.attr({"type" : "button", "id" : "modal-close"})
		.val("×")
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
	this.header.append(input);
}

/**
 * フッターの作成
 *
 */
ModalCommon.prototype.createFooter = function(){
	// フッターが存在しない場合のみ作成する
	if(this.content.find("#modal-footer").length == 0){
		var div = $("<div>").attr("id","modal-footer");
		this.content.append(div);
		this.footer = $("#modal-footer");
	}
}

/**
 * フッター内(子要素)の作成
 *
 */
ModalCommon.prototype.createFooterChild = function(buttons){
	if(buttons){

		this.footer.empty();
		buttons.forEach(function(button){
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

			this.footer.append(input);
		}, this)
	}
}

/**
 * モーダルダイアログの表示
 *
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
 *
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
	var contentWidth = this.content.outerWidth();

	// モーダルダイアログの高さを取得
	var contentHeight = this.content.outerHeight();

	// モーダルダイアログの左端ピクセルを計算
	var pxLeft = ( ( width - contentWidth ) / 2 );

	// モーダルダイアログの上部ピクセルを計算
	var pxTop = ( ( height - contentHeight ) / 2 ) - 48;

	// CSSの追加: left, top
	this.content.css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});
}
