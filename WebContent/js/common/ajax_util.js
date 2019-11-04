/*************************************************
 * Ajax用ユーティリティクラス
 * 作成日: 2019/10/02
 *
 *************************************************/
function AjaxUtil(){}

/**
 * ajax処理
 *
 * @param option ajaxオプション情報
 */
AjaxUtil.process = function(option) {
	$.ajax({
		type: option.type,
		url: option.url,
		dataType : "json",
		beforeSend: $.proxy(function(jqXHR, settings){
			if(option.progress === true){
				this.progressHelper = ProgressHelper.getInstance();
				this.progressHelper.progress();
			}
		}, this),
		data: option.data ? option.data : null,
		contentType: false,
		processData: false,
		async: true
	}).done(function(data) {
		// 成功時
		AjaxUtil.done(data, option);
	}).fail(function(xmlHttpRequest, textStatus, errorThrown) {
		// 失敗時
		AjaxUtil.fail(xmlHttpRequest, textStatus, errorThrown);
	}).always(function(data, textStatus, errorThrown) {
		AjaxUtil.always();
	});
}

/**
 * 処理成功時に実行
 *
 * @param data 取得データ
 * @param option ajaxオプション情報
 */
AjaxUtil.done = function(data, option) {
	if(this.progressHelper){
		this.execute(data, option);
		return;
	}
	option.callback(data);
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
			(MessageHelper.getInstance()).alert("エラー", "サーバー側の処理でエラーが発生しました。", null);
		})
		return;
	}
	(MessageHelper.getInstance()).alert("エラー", "サーバー側の処理でエラーが発生しました。", null);

}

/**
 * 成功・失敗関係なく実行
 *
 */
AjaxUtil.always = function() {

}

/**
 * コールバック実行・プログレスバー最大化
 *
 * @param data 取得データ
 * @param option ajaxオプション情報
 */
AjaxUtil.execute = function(data, option){
	this.progressHelper.setWidthMax();
	this.progressHelper.end($.proxy(function(){
		if(option.callback){
			option.callback(data);
		}
	}, this));
	this.progressHelper = null;
}