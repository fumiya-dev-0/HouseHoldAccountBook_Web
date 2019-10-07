// ==================================================================
// Ajax用共通クラス
// 作成日: 2019/10/02
//
// ==================================================================

/**
 * コンストラクタ
 *
 * @returns
 */
function AjaxCommon(){}

/**
 * コールバック(SELECT)
 *
 */
AjaxCommon.prototype.getCallbackData = function(type, url, callback) {
	$.ajax({
		type: type,
		url : url,
		dataType : "json",
		async: true,
		success : function(data) {
			callback(true, data);
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			callback(false, null);
		}
	});
}

/**
 * コールバック(INSERT)
 *
 */
AjaxCommon.prototype.addCallbackData = function(type, url, formData, callback) {
	$.ajax({
		type: type,
		url : url,
		data : formData,
		dataType : "json",
		async: true,
		success : function(data) {
			callback(true, data);
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			console.log(error);
			callback(false, null);
		}
	});
}