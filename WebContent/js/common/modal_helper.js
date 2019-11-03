/*************************************************
 * モーダルダイアログ用ヘルパークラス
 * 作成日: 2019/09/23
 *
 *************************************************/
function ModalHelper(){

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

/**
 * ダイアログ初期設定
 *
 * @param option ダイアログオプション情報
 */
ModalHelper.prototype.dialog = function(option){
	this.create(option, this.modal, this.overlay, this.content, "#modal-header", "#modal-footer");
}

/**
 * モーダルダイアログの表示
 *
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 */
ModalHelper.prototype.show = function(modal, overlay){

	if(!modal){
		modal = this.modal;
	}
	if(!overlay){
		overlay = this.overlay;
	}

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if(overlay[0]){
		return;
	}

	// オーバーレイの追加
	this.addOverlay(overlay);

	// モーダルダイアログのセンタリング
	this.centering(modal);

	// オーバーレイ、モーダルダイアログをフェードインさせる
	$(modal.selector + ", " + overlay.selector).fadeIn("slow");
}

/**
 * オーバーレイを削除し、モーダルダイアログを閉じる
 *
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 * @param bool true(コールバック実行) / false(コールバック未実行)
 */
ModalHelper.prototype.close = function(modal, overlay, bool){

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

	// コールバック
	if(this.callback && bool){
		this.callback();
	}

	// コールバック関数初期化
	if(this.callback){
		this.callback = null;
	}
}

/**
 * アラートダイアログ作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック
 */
ModalHelper.prototype.alert = function(title, text, callback){

	if(!this.callback){
		this.callback = callback;
	}
	var option = {
			title: title,
			text: text,
			close: false,
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
 * 確認ダイアログ作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック
 */
ModalHelper.prototype.confirm = function(title, text, callback){

	if(!this.callback){
		this.callback = callback;
	}
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
 * モーダルダイアログの作成
 *
 * @param option モーダルダイアログオプション情報
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 * @param content モーダルダイアログ コンテンツ要素
 * @param header モーダルダイアログ ヘッダー
 * @param footer モーダルダイアログ フッター
 */
ModalHelper.prototype.create = function(option, modal, overlay, content, header, footer){

	if(header){
		// ヘッダー作成
		this.createHeader(modal, header);

		// ヘッダー内子要素作成
		if(this.header) this.createHeaderChild(option, modal, overlay);
	}

	if(footer){
		// フッター作成
		this.createFooter(modal, footer);

		// フッター内子要素作成
		if(this.footer) this.createFooterChild(option);
	}

	// タイトル作成
	if(option.text) content.html("<span>" + option.text + "</span>");

	// 横幅設定
	if(option.width) modal.css("width", option.width);

	// 高さ設定
	if(option.height) content.css("height", option.height);

}

/**
 * オーバーレイの追加
 *
 * @param overlay オーバーレイ
 */
ModalHelper.prototype.addOverlay = function(overlay){

	var selector = overlay.selector;
	var overlayId = selector.substring(selector.indexOf("#") + 1, selector.length);
	if(!this.callback){
		this.body.append("<div id='" + overlayId + "' class='overlay overlay-translucent'></div>");
	}else{
		this.modal.append("<div id='" + overlayId + "' class='overlay'></div>");
	}
}

/**
 * ヘッダーの作成
 *
 * @param modal モーダルダイアログ
 * @param header ヘッダー
 */
ModalHelper.prototype.createHeader = function(modal, header){

	// ヘッダーが存在しない場合のみ作成する
	if(modal.find(header).length == 0) {
		// id名の#を抜き出す
		var headerId = header.substring(header.indexOf("#") + 1, header.length);
		// ヘッダー要素生成
		var div = $("<div>").attr({"id" : headerId, "class" : "modal-header"});
		// モーダルダイアログの先頭にヘッダー要素追加
		modal.prepend(div);
		this.header = $(header);
	}
}

/**
 * ヘッダー内(子要素)の作成
 *
 * @param option モーダルダイアログオプション情報
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 */
ModalHelper.prototype.createHeaderChild = function(option, modal, overlay){

	// ヘッダー要素初期化
	this.header.empty();
	if(option){
		if(option.close === false) {
			this.header.css("text-align", "left");
			if(option.title) this.header.prepend("<span>" + option.title + "</span>");
			return;
		}else{
			// ヘッダー内タイトル追加
			if(option.title) this.header.prepend("<span style='position: absolute; left: 10px'>" + option.title + "</span>");
		}

		// 閉じるボタン生成
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

		// ヘッダー要素に閉じるボタン追加
		this.header.append(input);
	}
}

/**
 * フッターの作成
 *
 * @param modal モーダルダイアログ
 * @param footer フッター
 */
ModalHelper.prototype.createFooter = function(modal, footer){
	// フッターが存在しない場合のみ作成する
	if(modal.find(footer).length == 0){
		// id名の#を抜き出す
		var footerId = footer.substring(footer.indexOf("#") + 1, footer.length);
		// フッター要素の取得
		var div = $("<div>").attr({"id" : footerId, "class" : "modal-footer"});
		// モーダルダイアログにフッター要素追加
		modal.append(div);
		this.footer = $(footer);
	}
}

/**
 * フッター内(子要素)の作成
 *
 * @param option モーダルダイアログオプション情報
 */
ModalHelper.prototype.createFooterChild = function(option){
	if(option.buttons){
		// フッター要素初期化
		this.footer.empty();
		option.buttons.forEach(function(button){
			// フッター内ボタン作成
			var input = $("<input>")
			.val(button.text)
			.attr("type", "button")
			.on("click", button.click);

			// フッター内ボタンattr設定
			if(button.attr){
				input.attr(button.attr);
			}

			// フッター内ボタンcss設定
			if(button.css){
				input.css(button.css);
			}

			// フッター要素にボタン追加
			this.footer.append(input);
		}, this)
	}
}

/**
 * モーダルダイアログのセンタリングを行う
 *
 * @param modal モーダルダイアログ
 */
ModalHelper.prototype.centering = function(modal){

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