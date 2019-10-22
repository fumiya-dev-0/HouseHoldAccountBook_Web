// ==================================================================
// Ajax用共通クラス
// 作成日: 2019/10/02
//
// ==================================================================
function AjaxCommon(){}

/**
 * コールバック(SELECT)
 *
 */
AjaxCommon.getCallbackData = function(option) {
	$.ajax({
		type: option.type,
		url: option.url,
		dataType: "json",
		async: true,
		success : function(data) {
			option.callback(true, data);
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			option.callback(false, null);
		}
	});
}

/**
 * コールバック(INSERT)
 *
 */
AjaxCommon.addCallbackData = function(option) {
	$.ajax({
		type: option.type,
		url: option.url,
		data: option.data,
		contentType: false,
		processData: false,
		dataType : "json",
		async: true,
		success: function(data) {
			option.callback(true, data);
		},
		error: function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			option.callback(false, null);
		}
	});
}