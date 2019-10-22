// ==================================================================
// 日付用共通クラス
// 作成日: 2019/09/21
//
// ==================================================================
function DateCommon(){}

/**
 * インスタンスの生成
 *
 */
DateCommon.newInstance = function() {
	this.date = new Date();
}

/**
 * 現在の年を取得するメソッド
 *
 */
DateCommon.getYear = function() {
	return this.date.getFullYear();
}

/**
 * 現在の月を取得するメソッド
 *
 */
DateCommon.getMonth = function() {
	return this.toDateDigits(this.date.getMonth() + 1, 2);
}

/**
 * 現在の日を取得するメソッド
 *
 */
DateCommon.getDay = function() {
	return this.toDateDigits(this.date.getDate(), 2);
}

/**
 * 日付から年を取得(数値型)
 *
 */
DateCommon.dateConvertIntYear = function(date) {
	return parseInt(date.substr(0, 4));
}

/**
 * 日付から月を取得(数値型)
 *
 */
DateCommon.dateConvertIntMonth = function(date) {
	return parseInt(date.substr(4, 2));
}

/**
 * 日付から日を取得(数値型)
 *
 */
DateCommon.dateConvertIntDay = function(date) {
	return parseInt(date.substr(6, 2));
}

/**
 * 日付から年を取得(文字列型)
 *
 */
DateCommon.dateConvertStringYear = function(date) {
	return date.substr(0, 4);
}

/**
 * 日付から月を取得(文字列型)
 *
 */
DateCommon.dateConvertStringMonth = function(date) {
	return date.substr(4, 2);
}

/**
 * 日付から日を取得(文字列型)
 *
 */
DateCommon.dateConvertStringDay = function(date) {
	return date.substr(6, 2);
}

/**
 * 日付フォーマット変更(スラッシュ): 文字列型
 *
 */
DateCommon.convertToSlashStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "/" + this.dateConvertStringMonth(date) + "/" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(ハイフン): 文字列型
 *
 */
DateCommon.convertToHyphenStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "-" + this.dateConvertStringMonth(date) + "-" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(スラッシュ削除): 文字列型
 *
 */
DateCommon.convertToSlashDeleteStringFormat = function(date) {
	return date.replace(/\//g, "");
}

/**
 * 日付フォーマット変更(ハイフン削除): 文字列型
 *
 */
DateCommon.convertToHyphenDeleteStringFormat = function(date) {
	return date.replace(/-/g, "");
}

/**
 * 日付フォーマット変更(スラッシュ): 日付型
 *
 */
DateCommon.convertToSlashDateFormat = function(date) {
	return date.getFullYear() + "/" + this.toDateDigits(date.getMonth() + 1, 2) + "/" + this.toDateDigits(date.getDate(), 2);
}

/**
 * 日付フォーマット変更(ハイフン): 日付型
 *
 */
DateCommon.convertToHyphenDateFormat = function(date) {
	return date.getFullYear() + "-" + this.toDateDigits(date.getMonth() + 1, 2) + "-" + this.toDateDigits(date.getDate(), 2);
}

/**
 * 日付の桁数調整 → 0結合
 *
 */
DateCommon.toDateDigits = function(num, digit) {

	// 日付をString型へ変換
	num += '';

	// 今日の年月日がそれぞれの桁数より小さい場合0を足す
	if(num.length < digit){
		num = '0' + num;
	}

	return num;
}

/**
 * 文字列の日付妥当性チェック
 *
 */
DateCommon.isDate = function(date) {

	var year = this.dateConvertIntYear(date);
	var month = this.dateConvertIntMonth(date) - 1;
	var day = this.dateConvertIntDay(date);

	var dt = new Date(year, month, day);

	if(year != dt.getFullYear() && month != dt.getMonth() && day != dt.getDate()){
		return false;
	}

	return true;
}