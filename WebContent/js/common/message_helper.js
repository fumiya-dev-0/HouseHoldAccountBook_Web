/*************************************************
 * メッセージダイアログヘルパークラス
 * 作成日: 2019/11/04
 *
 *************************************************/
function MessageHelper(){}

MessageHelper.prototype = ModalHelper.getInstance();

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
 */
MessageHelper.prototype.alert = function(title, text, callback){

	this.addTarget($("#alert-modal"), $("#alert-overlay"), $("#alert-content"), $("#alert-header"), $("#alert-footer"), $("#modal"));
	var option = this.alertOption(title, text, callback);
	this.create(option);
	this.show();
}

/**
 * 確認ダイアログ作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック関数
 */
MessageHelper.prototype.confirm = function(title, text, callback){

	this.addTarget($("#confirm-modal"), $("#confirm-overlay"), $("#confirm-content"), $("#confirm-header"), $("#confirm-footer"), $("#modal"));
	var option = this.confirmOption(title, text, callback);
	this.create(option);
	this.show();
}

/**
 * アラートダイアログオプション作成
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック関数
 */
MessageHelper.prototype.alertOption = function(title, text, callback){
	return {
		title: title,
		text: text,
		close: false,
		width: "10%",
		height: "100px",
		buttons: [
			{
				text: "ＯＫ",
				click: $.proxy(function(){
					this.close(function(){
						if(callback){
							callback();
						}
					});
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
}

/**
 * 確認ダイアログオプション
 *
 * @param title タイトル
 * @param text テキスト
 * @param callback コールバック関数
 */
MessageHelper.prototype.confirmOption = function(title, text, callback){
	return {
		title: title,
		text: text,
		width: "10%",
		height: "100px",
		buttons: [
			{
				text: "ＯＫ",
				click: $.proxy(function(){
					this.close(function(){
						if(callback){
							callback();
						}
					});
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
					this.close();
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
}