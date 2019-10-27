// ==================================================================
// Ajax用ユーティリティクラス
// 作成日: 2019/10/02
//
// ==================================================================
function AjaxUtil(){}

/**
 * コールバック(SELECT)
 *
 */
AjaxUtil.getCallbackData = function(option) {

	$.ajax({
		type: option.type,
		url: option.url,
		dataType: "json",
		beforeSend: $.proxy(function(jqXHR, settings){ this.progress(option) }, this),
		async: true,
		success : function(data) {
			ProgressUtil.isSetWidthMax();
			ProgressUtil.close();
			option.callback(true, data);
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			ProgressUtil.close();
			option.callback(false, null);
		}
	});
}

/**
 * コールバック(INSERT)
 *
 */
AjaxUtil.addCallbackData = function(option) {

	$.ajax({
		type: option.type,
		url: option.url,
		dataType : "json",
		beforeSend: $.proxy(function(jqXHR, settings){ this.progress(option) }, this),
		data: option.data,
		contentType: false,
		processData: false,
		async: true,
		success: function(data) {
			ProgressUtil.isSetWidthMax();
			ProgressUtil.close();
			option.callback(true, data);
		},
		error: function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			ProgressUtil.close();
			option.callback(false, null);
		}
	});
}

AjaxUtil.progress = function(option) {
	if(option.progress === true) ProgressUtil.progress();
}