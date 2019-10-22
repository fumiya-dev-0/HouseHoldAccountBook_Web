//==================================================================
// モーダルダイアログ用共通クラス
// 作成日: 2019/09/23
//
//==================================================================
function ModalCommon(){

	this.body = $("body");
	this.modal = $("#modal");
	this.content = $("#modal-content");
	this.header = null;
	this.footer = null;

	this.confirmModal = $("#confirm-modal");
	this.confirmContent = $("#confirm-content");

	this.alertModal = $("#alert-modal");
	this.alertContent = $("#alert-content");

	this.overlay = $("#modal-overlay");
	this.confirmOverlay = $("#confirm-overlay");
	this.alertOverlay = $("#alert-overlay");

	this.callback = null;
}

ModalCommon.prototype = new JsonElement();

/**
 * ダイアログ初期設定
 *
 */
ModalCommon.prototype.dialog = function(option){
	this.create(option, this.modal, this.overlay, this.content, "#modal-header", "#modal-footer");
}

/**
 * 確認ダイアログ作成
 *
 */
ModalCommon.prototype.confirm = function(title, text, callback){

	if(!this.callback) this.callback = callback;
	var option = {
			title: title,
			text: text,
			width: "10%",
			height: "100px",
			buttons: [
				{
					text: "ＯＫ",
					click: $.proxy(function(){
						this.close(this.confirmModal, this.confirmOverlay, true);
					}, this),
					attr: {
						class: "button-border button-info"
					},
					css: {
						width: "60px",
						height: "30px",
						margin: "0 5px 0 0"
					}
				},
				{
					text: "閉じる",
					click: $.proxy(function(){
						this.close(this.confirmModal, this.confirmOverlay);
					}, this),
					attr: {
						id: "close_button",
						class: "button-border button-warning"
					},
					css: {
						width: "60px",
						height: "30px"
					}
				}
			]
	};
	this.create(option, this.confirmModal, this.confirmOverlay, this.confirmContent, "#confirm-header", "#confirm-footer");

	this.show(this.confirmModal, this.confirmOverlay);
}

/**
 * ダイアログ作成
 *
 */
ModalCommon.prototype.alert = function(title, text, callback){

	if(!this.callback) this.callback = callback;
	var option = {
			title: title,
			text: text,
			width: "10%",
			height: "100px",
			buttons: [
				{
					text: "ＯＫ",
					click: $.proxy(function(){
						this.close(this.alertModal, this.alertOverlay, true);
					}, this),
					attr: {
						class: "button-border button-info"
					},
					css: {
						width: "60px",
						height: "30px",
						margin: "0 5px 0 0"
					}
				}
			]
	};
	this.create(option, this.alertModal, this.alertOverlay, this.alertContent, "#alert-header", "#alert-footer");

	this.show(this.alertModal, this.alertOverlay);
}

/**
 * ダイアログの作成
 *
 */
ModalCommon.prototype.create = function(option, modal, overlay, content, header, footer){

	// ヘッダー作成
	this.createHeader(modal, header);

	// ヘッダー内子要素作成
	if(this.header) this.createHeaderChild(option, modal, overlay);

	// フッター作成
	this.createFooter(modal, footer);

	// フッター内子要素作成
	if(this.footer) this.createFooterChild(option.buttons);

	// タイトル作成
	if(option.text) content.html("<span>" + option.text + "</span>");

	// 横幅設定
	if(option.width) modal.css("width", option.width);

	// 高さ設定
	if(option.height) content.css("height", option.height);

}

/**
 * ヘッダーの作成
 *
 */
ModalCommon.prototype.createHeader = function(modal, header){
	// ヘッダーが存在しない場合のみ作成する
	if(modal.find(header).length == 0) {
		// id名の#を抜き出す
		var headerId = header.substring(header.indexOf("#") + 1, header.length);
		var div = $("<div>").attr({"id" : headerId, "class" : "modal-header"});
		modal.prepend(div);
		this.header = $(header);
	}
}

/**
 * ヘッダー内(子要素)の作成
 *
 */
ModalCommon.prototype.createHeaderChild = function(option, modal, overlay){

	this.header.empty();
	if(option){
		if(option.title) this.header.prepend("<span style='position: absolute; left: 10px'>" + option.title + "</span>");
	}
	var input =
		$("<input>")
		.attr({"type" : "button", "id" : "modal-close"})
		.val("×")
		.off("click")
		.on("click", $.proxy(function(){
			this.close(modal, overlay);
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
ModalCommon.prototype.createFooter = function(modal, footer){
	// フッターが存在しない場合のみ作成する
	if(modal.find(footer).length == 0){
		var footerId = footer.substring(footer.indexOf("#") + 1, footer.length);
		var div = $("<div>").attr({"id" : footerId, "class" : "modal-footer"});
		modal.append(div);
		this.footer = $(footer);
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
ModalCommon.prototype.show = function(modal, overlay){

	if(!modal){
		modal = this.modal;
	}

	if(!overlay){
		overlay = this.overlay;
	}

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if(overlay[0]) return;

	// オーバーレイの追加
	var selector = overlay.selector;
	var overlayId = selector.substring(selector.indexOf("#") + 1, selector.length);
	if(!this.callback){
		this.body.append("<div id='" + overlayId + "'></div>");
	}else{
		this.modal.append("<div id='" + overlayId + "'></div>");
	}

	// モーダルダイアログのセンタリング
	this.centering(modal);

	// オーバーレイ、モーダルダイアログをフェードインさせる
	$(modal.selector + ", " + overlay.selector).fadeIn("slow");
}

/**
 * オーバーレイを削除し、モーダルダイアログを閉じる
 *
 */
ModalCommon.prototype.close = function(modal, overlay, bool){

	if(!modal){
		modal = this.modal;
	}

	if(!overlay){
		overlay = this.overlay;
	}

	// モーダルダイアログとオーバーレイをフェードアウト
	$(modal.selector + ", " + overlay.selector).fadeOut("slow", function(){
		$(overlay.selector).remove();
	});

	if((this.callback && bool) || this.isAlert(modal, overlay)){
		this.callback();
	}

	if(this.callback) this.callback = null;
}

/**
 * モーダルダイアログのセンタリングを行う
 *
 */
ModalCommon.prototype.centering = function(modal){

	// ウィンドウの幅を取得
	var width = $(window).width();
	// ウィンドウの高さを取得
	var height = $(window).height();

	// モーダルダイアログの幅を取得
	var modalWidth = modal.outerWidth();

	// モーダルダイアログの高さを取得
	var modalHeight = modal.outerHeight();

	// モーダルダイアログの左端ピクセルを計算
	var pxLeft = ( ( width - modalWidth ) / 2 );

	// モーダルダイアログの上部ピクセルを計算
	var pxTop = ( ( height - modalHeight ) / 2 ) - 48;

	// CSSの追加: left, top
	modal.css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});
}

/**
 * アラートダイアログであるかチェック
 *
 */
ModalCommon.prototype.isAlert = function(modal, overlay){
	return (modal == this.alertModal && overlay == this.alertOverlay && this.callback) ? true : false;
}