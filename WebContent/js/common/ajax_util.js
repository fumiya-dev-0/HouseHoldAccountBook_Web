/*************************************************
 * Ajax用ユーティリティクラス
 * 作成日: 2019/10/02
 *
 *************************************************/
function AjaxUtil(){}

/**
 * ajax処理
 *
 * @param option オプションパラメータ
 */
AjaxUtil.process = function(option) {

	this.messageHelper = MessageHelper.getInstance();
	this.option = option;

	this.beforeExecute($.proxy(function(){
		this.execute();
	}, this));
}

/**
 * ajax実行前処理
 *
 * @param callback コールバック関数
 */
AjaxUtil.beforeExecute = function(callback){

	var title = this.option.confirm ? this.option.confirm.title : null;
	var text = this.option.confirm ? this.option.confirm.text : null;

	if(title && text){
		this.messageHelper.confirm(title, text, function(){
			if(callback){
				callback();
			}
		}).show();
	}else{
		if(callback){
			callback();
		}
	}
}

/**
 * ajax実行
 *
 */
AjaxUtil.execute = function(){
	$.ajax({
		type: this.option.type,
		url: this.option.url,
		dataType : "json",
		beforeSend: $.proxy(function(jqXHR, settings){
			if(this.option.progress === true){
				this.progressHelper = ProgressHelper.getInstance();
				this.progressHelper.progress().show();
			}
		}, this),
		data: this.option.data ? this.option.data : null,
		contentType: false,
		processData: false,
		async: true
	}).done(function(data) {
		// 成功時
		AjaxUtil.done(data);
	}).fail(function(xmlHttpRequest, textStatus, errorThrown) {
		// 失敗時
		AjaxUtil.fail(xmlHttpRequest, textStatus, errorThrown);
	}).always(function(data, textStatus, errorThrown) {
		AjaxUtil.always();
	});
}

/**
 * ajax実行後処理
 *
 * @param callback コールバック関数
 */
AjaxUtil.afterExecute = function(callback) {

	var title = this.option.alert ? this.option.alert.title : null;
	var text = this.option.alert ? this.option.alert.text : null;

	if(title && text){
		this.messageHelper.alert(title, text, function(){
			if(callback){
				callback();
			}
		}).show();
	}else{
		if(callback){
			callback();
		}
	}
}

/**
 * 処理成功時に実行
 *
 * @param data 取得データ
 */
AjaxUtil.done = function(data) {
	if(this.progressHelper){
		this.progressHelper.setWidthMax();
		this.progressHelper.end($.proxy(function(){
			this.afterExecute($.proxy(function(){
				if(this.option.callback){
					this.option.callback(data);
				}
			}, this));
		}, this));
	}else{
		this.option.callback(data);
	}
}

/**
 * 処理失敗時に実行
 *
 * @param xmlHttpRequest xmlHttpRequestオブジェクト
 * @param textStatus ステータス情報
 * @param errorThrown エラー情報
 */
AjaxUtil.fail = function(xmlHttpRequest, textStatus, errorThrown) {
	console.log( textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest);
	if(this.progressHelper){
		this.progressHelper.end(function(){
			this.messageHelper.alert("エラー", "サーバー側の処理でエラーが発生しました。", null).show();
		});
	}else{
		this.messageHelper.alert("エラー", "サーバー側の処理でエラーが発生しました。", null).show();
	}
}

/**
 * 成功・失敗関係なく実行
 *
 */
AjaxUtil.always = function() {
	this.progressHelper = null;
}