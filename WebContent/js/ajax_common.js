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
 * コールバック
 */
AjaxCommon.prototype.getCallbackData = function(type, url, callback) {
	$.ajax({
		type: type,
		url : url,
		dataType : "json",
		async: true,
		success : function(data) {
			callback(null, data);
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			var error = textStatus + "\n" + errorThrown + "\n" + xmlHttpRequest;
			callback(error, data);
		}
	});
}