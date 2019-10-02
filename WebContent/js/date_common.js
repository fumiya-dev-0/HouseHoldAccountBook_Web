// ==================================================================
// 日付用共通クラス
// 作成日: 2019/09/21
//
// ==================================================================
function DateCommon(){
	this.date = new Date();
}

/**
 * 現在の年を取得するメソッド
 */
DateCommon.prototype.getYear = function() {
	return this.date.getFullYear();
}

/**
 * 現在の月を取得するメソッド
 */
DateCommon.prototype.getMonth = function() {
	return this.date.getMonth() + 1;
}

/**
 * 現在の日を取得するメソッド
 */
DateCommon.prototype.getDay = function() {
	return this.date.getDate();
}

/**
 * 日付から年を取得(数値型)
 */
DateCommon.prototype.dateConvertIntYear = function(date) {
	return parseInt(date.substr(0, 4));
}

/**
 * 日付から月を取得(数値型)
 */
DateCommon.prototype.dateConvertIntMonth = function(date) {
	return parseInt(date.substr(4, 2));
}

/**
 * 日付から日を取得(数値型)
 */
DateCommon.prototype.dateConvertIntDay = function(date) {
	return parseInt(date.substr(6, 2));
}

/**
 * 日付から年を取得(文字列型)
 */
DateCommon.prototype.dateConvertStringYear = function(date) {
	return date.substr(0, 4);
}

/**
 * 日付から月を取得(文字列型)
 */
DateCommon.prototype.dateConvertStringMonth = function(date) {
	return date.substr(4, 2);
}

/**
 * 日付から日を取得(文字列型)
 */
DateCommon.prototype.dateConvertStringDay = function(date) {
	return date.substr(6, 2);
}

/**
 * 日付を減算
 */
DateCommon.prototype.prevDate = function(date) {

	if(this.isDate(date)){
		var prevDate = this.prevCalcDate(this.dateConvertStringYear(date), this.dateConvertStringMonth(date), this.toDateDigits((this.dateConvertIntDay(date)), 2));
		return this.convertToHyphenDateFormat(prevDate);
	}

	return null;
}

/**
 * 日付を加算
 */
DateCommon.prototype.nextDate = function(date) {

	if(this.isDate(date)){
		var nextDate = this.nextCalcDate(this.dateConvertStringYear(date), this.dateConvertStringMonth(date), this.toDateDigits((this.dateConvertIntDay(date)), 2));
		return this.convertToHyphenDateFormat(nextDate);
	}

	return null;
}

/**
 * 文字列の日付妥当性チェック
 */
DateCommon.prototype.isDate = function(date) {

	var year = this.dateConvertIntYear(date);
	var month = this.dateConvertIntMonth(date) - 1;
	var day = this.dateConvertIntDay(date);

	var dt = new Date(year, month, day);

	if(year != dt.getFullYear() && month != dt.getMonth() && day != dt.getDate()){
		return false;
	}

	return true;
}

/**
 * 日付減算処理
 */
DateCommon.prototype.prevCalcDate = function(year, month, day) {
	var date = new Date(year, month - 1, day);
	date.setDate(date.getDate() - 1);

	return date;
}

/**
 * 日付加算処理
 */
DateCommon.prototype.nextCalcDate = function(year, month, day) {
	var date = new Date(year, month - 1, day);
	date.setDate(date.getDate() + 1);

	return date;
}

/**
 * 日付フォーマット変更(スラッシュ): 文字列型
 */
DateCommon.prototype.convertToSlashStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "/" + this.dateConvertStringMonth(date) + "/" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(ハイフン): 文字列型
 */
DateCommon.prototype.convertToHyphenStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "-" + this.dateConvertStringMonth(date) + "-" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(スラッシュ): 日付型
 */
DateCommon.prototype.convertToHyphenDateFormat = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	return year + "/" + this.toDateDigits(month, 2) + "/" + this.toDateDigits(day, 2);
}

/**
 * 日付フォーマット変更(ハイフン): 日付型
 */
DateCommon.prototype.convertToHyphenDateFormat = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	return year + "-" + this.toDateDigits(month, 2) + "-" + this.toDateDigits(day, 2);
}

/**
 * 日付の桁数調整 → 0結合
 */
DateCommon.prototype.toDateDigits = function(num, digit) {

	// 日付をString型へ変換
	num += '';

	// 今日の年月日がそれぞれの桁数より小さい場合0を足す
	if(num.length < digit){
		num = '0' + num;
	}

	return num;
}