/*************************************************
 * モーダルダイアログヘルパークラス
 * 作成日: 2019/09/23
 *
 *************************************************/
function ModalHelper(){}

/**
 * インスタンスの取得
 *
 * @return インスタンス
 */
ModalHelper.getInstance = function(){
	if(!this.modalHelper){
		this.modalHelper = new ModalHelper();
	}
	return this.modalHelper;
}

/**
 * ダイアログ初期設定
 *
 * @param option ダイアログオプション情報
 */
ModalHelper.prototype.dialog = function(option){

	this.addTarget($("#modal"), $("#modal-overlay"), $("#modal-content"), $("#modal-header"), $("#modal-footer"), $("body"));
	this.create(option);
	this.show();
}

/**
 * モーダルダイアログの作成
 *
 * @param option モーダルダイアログオプション情報
 */
ModalHelper.prototype.create = function(option){

	if(this.header[this.header.length - 1]){
		// ヘッダー作成
		var header = this.addHeader();
		// ヘッダー子要素作成
		if(header){
			this.addHeaderChild(option, header);
		}
	}

	if(this.footer[this.footer.length - 1]){
		// フッター作成
		var footer = this.addFooter();
		// フッター子要素作成
		if(footer){
			this.addFooterChild(option, footer);
		}
	}

	// タイトル作成
	if(option.text){
		this.content[this.content.length - 1].html("<span>" + option.text + "</span>");
	}

	// 横幅設定
	if(option.width){
		this.modal[this.modal.length - 1].css("width", option.width);
	}

	// 高さ設定
	if(option.height){
		this.content[this.content.length - 1].css("height", option.height);
	}

}

/**
 * モーダルダイアログの表示
 *
 */
ModalHelper.prototype.show = function(){

	// オーバーレイが存在する場合は、新しくモーダルウィンドウを起動しない
	if(this.overlay[this.overlay.length - 1][0]){
		return;
	}

	// オーバーレイの追加
	this.addOverlay();

	// モーダルダイアログのセンタリング
	this.centering();

	// オーバーレイ、モーダルダイアログをフェードインさせる
	$(this.modal[this.modal.length - 1].selector + ", " + this.overlay[this.overlay.length - 1].selector).fadeIn("slow");
}

/**
 * オーバーレイを削除し、モーダルダイアログを閉じる
 *
 * @param modal モーダルダイアログ
 */
ModalHelper.prototype.close = function(callback){

	// フェードアウトのイベント重複対策
	var cnt = 0;
	var self = this;
	// モーダルダイアログとオーバーレイをフェードアウト
	$(this.modal[this.modal.length - 1].selector + ", " + this.overlay[this.overlay.length - 1].selector)
	.fadeOut("slow", function(){
		if(cnt <= 0){
			// 対象要素削除
			self.targetRemove();
			// 対象配列削除
			self.targetPop();

			if(callback){
				callback();
			}
			cnt++;
		}
	});


}

/**
 * ヘッダーの作成
 *
 */
ModalHelper.prototype.addHeader = function(){

	var header = null;
	// ヘッダーが存在しない場合のみ作成する
	var modal = this.modal[this.modal.length - 1];
	if(modal.find(this.header[this.header.length - 1]).length == 0) {
		var selector = this.header[this.header.length - 1].selector;
		// id名の#を抜き出す
		var targetId = selector.substring(selector.indexOf("#") + 1, selector.length);
		// ヘッダー要素生成
		var div = $("<div>").attr({"id" : targetId, "class" : "modal-header"});
		// モーダルダイアログの先頭にヘッダー要素追加
		modal.prepend(div);
		header = $(this.header[this.header.length - 1].selector);
	}
	return header;
}

/**
 * ヘッダー内(子要素)の作成
 *
 * @param option モーダルダイアログオプション情報
 * @param header ヘッダー要素
 */
ModalHelper.prototype.addHeaderChild = function(option, header){

	// ヘッダー要素内初期化
	header.empty();
	if(option.close === false) {
		// ヘッダー内タイトル追加(閉じるボタンを未作成)
		header.css("text-align", "left");
		// タイトル生成
		if(option.title){
			header.prepend("<span>" + option.title + "</span>");
		}
	}else{
		// ヘッダー内タイトル追加(閉じるボタンを作成)
		// タイトル生成
		if(option.title){
			header.prepend("<span style='position: absolute; left: 10px'>" + option.title + "</span>");
		}
		// 閉じるボタン生成
		var input =
			$("<input>")
			.attr({"type" : "button", "id" : "modal-close"})
			.val("×")
			.off("click")
			.on("click", $.proxy(function(){
				this.close();
			}, this))
			.hover(function(){
				$(this).css("opacity", "1");
			})
			.mouseout(function(){
				$(this).css("opacity", "0.5");
			});

		// ヘッダー要素に閉じるボタン追加
		header.append(input);
	}
}

/**
 * フッターの作成
 *
 */
ModalHelper.prototype.addFooter = function(){

	var footer = null;
	// フッターが存在しない場合のみ作成する
	var modal = this.modal[this.modal.length - 1];
	if(modal.find(this.footer[this.footer.length - 1]).length == 0){
		var selector = this.footer[this.footer.length - 1].selector;
		// id名の#を抜き出す
		var targetId = selector.substring(selector.indexOf("#") + 1, selector.length);
		// フッター要素の取得
		var div = $("<div>").attr({"id" : targetId, "class" : "modal-footer"});
		// モーダルダイアログにフッター要素追加
		modal.append(div);
		footer = $(this.footer[this.footer.length - 1].selector);
	}
	return footer;
}

/**
 * フッター内(子要素)の作成
 *
 * @param option モーダルダイアログオプション情報
 * @param footer フッター要素
 */
ModalHelper.prototype.addFooterChild = function(option, footer){
	if(option.buttons){
		// フッター要素初期化
		footer.empty();
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
			footer.append(input);
		}, this)
	}
}

/**
 * オーバーレイの追加
 *
 */
ModalHelper.prototype.addOverlay = function(){
	// 半透過クラス文字列の取得
	var translucent = this.overlayTarget.selector == "body" ? "overlay-translucent" : "";
	// オーバーレイidの取得
	var selector = this.overlay[this.overlay.length - 1].selector;
	var overlayId = selector.substring(selector.indexOf("#") + 1, selector.length);
	// オーバーレイの追加
	this.overlayTarget.append("<div id='" + overlayId + "' class='overlay " + translucent + "'></div>");
}

/**
 * モーダルダイアログのセンタリングを行う
 *
 */
ModalHelper.prototype.centering = function(){

	// ウィンドウの幅を取得
	var width = $(window).width();
	// ウィンドウの高さを取得
	var height = $(window).height();

	// モーダルダイアログの幅を取得
	var modalWidth = this.modal[this.modal.length - 1].outerWidth();
	// モーダルダイアログの高さを取得
	var modalHeight = this.modal[this.modal.length - 1].outerHeight();

	// モーダルダイアログの左端ピクセルを計算
	var pxLeft = ( ( width - modalWidth ) / 2 );
	// モーダルダイアログの上部ピクセルを計算
	var pxTop = ( ( height - modalHeight ) / 2 ) - 48;

	// CSSの追加: left, top
	this.modal[this.modal.length - 1].css({
		"left" : pxLeft + "px",
		"top" : pxTop + "px"
	});
}

/**
 * 対象の要素追加
 *
 * @param modal モーダルダイアログ
 * @param overlay オーバーレイ
 * @param content モーダルダイアログ コンテンツ要素
 * @param header モーダルダイアログ ヘッダーId
 * @param footer モーダルダイアログ フッターId
 * @param overlayTarget オーバーレイ対象のId
 */
ModalHelper.prototype.addTarget = function(modal, overlay, content, header, footer, overlayTarget){
	// モーダルダイアログ配列の初期化
	if(!this.modal){
		this.modal = new Array();
	}
	// モーダルダイアログ配列の追加
	this.modal[this.modal.length] = modal;
	// オーバーレイ配列の初期化
	if(!this.overlay){
		this.overlay = new Array();
	}
	// オーバーレイ配列の追加
	this.overlay[this.overlay.length] = overlay;
	// ダイアログコンテンツ配列の初期化
	if(!this.content){
		this.content = new Array();
	}
	// ダイアログコンテンツ配列の追加
	this.content[this.content.length] = content;
	// ダイアログヘッダー配列の初期化
	if(!this.header){
		this.header = new Array();
	}
	// ダイアログヘッダー配列の追加
	this.header[this.header.length] = header;
	// ダイアログフッター配列の初期化
	if(!this.footer){
		this.footer = new Array();
	}
	// ダイアログフッター配列の追加
	this.footer[this.footer.length] = footer;
	// オーバーレイ対象の設定
	this.overlayTarget = overlayTarget;
}

/**
 * 対象要素の削除
 *
 */
ModalHelper.prototype.targetRemove = function(){
	// オーバーレイ要素の削除
	$(this.overlay[this.overlay.length - 1].selector).remove();
	// ダイアログコンテンツ子要素の削除
	this.content[this.content.length - 1].empty();
	// ダイアログヘッダー要素の削除
	if(this.header[this.header.length - 1]){
		$(this.header[this.header.length - 1].selector).remove();
	}
	// ダイアログフッター要素の削除
	if(this.footer[this.footer.length - 1]){
		$(this.footer[this.footer.length - 1].selector).remove();
	}
}

/**
 * 対象配列の削除
 *
 */
ModalHelper.prototype.targetPop = function(){
	// モーダルダイアログ配列の削除
	this.modal.pop();
	// オーバーレイ配列の削除
	this.overlay.pop();
	// ダイアログコンテンツ配列の削除
	this.content.pop();
	// ダイアログヘッダー配列の削除
	this.header.pop();
	// ダイアログフッター配列の削除
	this.footer.pop();
}