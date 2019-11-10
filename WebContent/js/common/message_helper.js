/*************************************************
 * メッセージダイアログヘルパークラス
 * 作成日: 2019/11/04
 *
 *************************************************/
function MessageHelper(){}

/**
 * メソッドチェーン
 *
 */
MessageHelper.prototype = {

		alert: function(){
			this.alert();
		},

		confirm: function(){
			this.confirm();
		},

		show: function(){
			this.show();
		}
}

MessageHelper.prototype = new BaseDialog();

/**
 * インスタンスの取得
 *
 * @return インスタンス
 */
MessageHelper.getInstance = function(){
	if(!this.messageHelper){
		this.messageHelper = new MessageHelper();
	}
	return this.messageHelper;
}

/**
 * アラートダイアログ作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック関数
 * @return this インスタンス
 */
MessageHelper.prototype.alert = function(title, text, callback){

	if($("#modal").css("display") == "block"){
		this.init($("#alert-modal"), $("#alert-overlay"), $("#alert-content"), $("#alert-header"), $("#alert-footer"), $("#modal"));
	}else{
		this.init($("#alert-modal"), $("#alert-overlay"), $("#alert-content"), $("#alert-header"), $("#alert-footer"), $("#body"));
	}

	// タイトル作成
	if(title){
		this.header.css("text-align", "left");
		this.header.find("#alert-header-title").text(title);
	}

	// テキスト作成
	if(text){
		this.content.html("<span>" + text + "</span>");
	}

	// ボタン処理
	$("#alert-send-btn").off("click");
	$("#alert-send-btn").on("click", $.proxy(function(){
		this.close(function(){
			if(callback){
				callback();
			}
		});
	}, this));

	return this;

}

/**
 * 確認ダイアログ作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック関数
 * @return this インスタンス
 */
MessageHelper.prototype.confirm = function(title, text, callback){

	if($("#modal").css("display") == "block"){
		this.init($("#confirm-modal"), $("#confirm-overlay"), $("#confirm-content"), $("#confirm-header"), $("#confirm-footer"), $("#modal"));
	}else{
		this.init($("#confirm-modal"), $("#confirm-overlay"), $("#confirm-content"), $("#confirm-header"), $("#confirm-footer"), $("#body"));
	}

	// タイトル作成
	if(title){
		this.header.find("#confirm-header-title").text(title);
	}

	// テキスト作成
	if(text){
		this.content.html("<span>" + text + "</span>");
	}

	// ボタン処理
	$("#confirm-send-btn").off("click");
	$("#confirm-send-btn").on("click", $.proxy(function(){
		this.close(function(){
			if(callback){
				callback();
			}
		});
	}, this));

	$("#confirm-close-btn, #confirm-close").off("click");
	$("#confirm-close-btn, #confirm-close").on("click", $.proxy(function(){
		this.close();
	}, this));

	return this;
}