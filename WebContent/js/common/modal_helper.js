/*************************************************
 * モーダルダイアログヘルパークラス
 * 作成日: 2019/09/23
 *
 *************************************************/
function ModalHelper(){}

/**
 * メソッドチェーン
 *
 */
ModalHelper.prototype = {

		dialog: function(){
			this.dialog();
		},

		show: function(){
			this.show();
		}
}

ModalHelper.prototype = new BaseDialog();

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
 * @param option オプションパラメータ
 * @return this インスタンス
 */
ModalHelper.prototype.dialog = function(option){

	// 前処理
	this.init($("#modal"), $("#modal-overlay"), $("#modal-content"), $("#modal-header"), $("#modal-footer"), $("body"));
	// モーダルダイアログの作成
	this.create(option);

	return this;
}

/**
 * モーダルダイアログの作成
 *
 * @param option モーダルダイアログオプション情報
 */
ModalHelper.prototype.create = function(option){

	if(this.header){
		// ヘッダー作成
		var header = this.addHeader();
		// ヘッダー子要素作成
		if(header){
			this.addHeaderChild(option, header);
		}else{
			this.addHeaderChild(option, this.header);
		}
	}

	if(this.footer){
		// フッター作成
		var footer = this.addFooter();
		// フッター子要素作成
		if(footer){
			this.addFooterChild(option, footer);
		}else{
			this.addFooterChild(option, this.footer);
		}
	}

	// テキスト作成
	if(option.text){
		this.content.html("<span>" + option.text + "</span>");
	}

	// 横幅設定
	if(option.width){
		this.modal.css("width", option.width);
	}

	// 高さ設定
	if(option.height){
		this.content.css("height", option.height);
	}

}

/**
 * ヘッダーの作成
 *
 * @return header ヘッダー要素
 */
ModalHelper.prototype.addHeader = function(){

	var header = null;
	// ヘッダーが存在しない場合のみ作成する
	var modal = this.modal;
	if(modal.find(this.header).length == 0) {
		var selector = this.header.selector;
		// id名の#を抜き出す
		var targetId = selector.substring(selector.indexOf("#") + 1, selector.length);
		// ヘッダー要素生成
		var div = $("<div>").attr({"id" : targetId, "class" : "base-dialog-header"});
		// モーダルダイアログの先頭にヘッダー要素追加
		modal.prepend(div);
		header = $(this.header.selector);
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

	// タイトル生成
	if(option.title){
		header.prepend("<span style='position: absolute; left: 10px'>" + option.title + "</span>");
	}

	// 閉じるボタン生成
	var input =
		$("<input>")
		.attr({"type" : "button", "id" : "modal-close", "class" : "base-dialog-close"})
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

/**
 * フッターの作成
 *
 * @return footer フッター要素
 */
ModalHelper.prototype.addFooter = function(){

	var footer = null;
	// フッターが存在しない場合のみ作成する
	var modal = this.modal;
	if(modal.find(this.footer).length == 0){
		var selector = this.footer.selector;
		// id名の#を抜き出す
		var targetId = selector.substring(selector.indexOf("#") + 1, selector.length);
		// フッター要素の取得
		var div = $("<div>").attr({"id" : targetId, "class" : "base-dialog-footer"});
		// モーダルダイアログにフッター要素追加
		modal.append(div);
		footer = $(this.footer.selector);
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
	// オーバーレイidの取得
	var selector = this.overlay.selector;
	var overlayId = selector.substring(selector.indexOf("#") + 1, selector.length);
	// オーバーレイの追加
	this.overlayTarget.append("<div id='" + overlayId + "' class='overlay overlay-translucent'></div>");
}