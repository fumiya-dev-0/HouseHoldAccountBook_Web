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
DateCommon.prototype.stringConvertIntYear = function(date) {
	return parseInt(date.substr(0, 4));
}

/**
 * 日付から月を取得(数値型)
 */
DateCommon.prototype.stringConvertIntMonth = function(date) {
	return parseInt(date.substr(5, 2));
}

/**
 * 日付から日を取得(数値型)
 */
DateCommon.prototype.stringConvertIntDay = function(date) {
	return parseInt(date.substr(8, 2));
}

/**
 * 日付から年を取得(文字列型)
 */
DateCommon.prototype.stringConvertStringYear = function(date) {
	return date.substr(0, 4);
}

/**
 * 日付から月を取得(文字列型)
 */
DateCommon.prototype.stringConvertStringMonth = function(date) {
	return date.substr(5, 2);
}

/**
 * 日付から日を取得(文字列型)
 */
DateCommon.prototype.stringConvertStringDay = function(date) {
	return date.substr(6, 2);
}

/**
 * 日付を減算
 */
DateCommon.prototype.prevDate = function(date) {

	if(this.isDate(date)){
		return this.stringConvertStringYear(date) + "-" + this.stringConvertStringMonth(date) + "-" + this.toDateDigits((this.stringConvertIntDay(date) - 1), 2);
	}

	return null;
}

/**
 * 日付を加算
 */
DateCommon.prototype.nextDate = function(date) {

	if(this.isDate(date)){
		return this.stringConvertStringYear(date) + "-" + this.stringConvertStringMonth(date) + "-" + this.toDateDigits((this.stringConvertIntDay(date) + 1), 2);
	}

	return null;
}

/**
 * 文字列の日付妥当性チェック
 */
DateCommon.prototype.isDate = function(date) {

	var year = this.stringConvertIntYear(date);
	var month = this.stringConvertIntMonth(date) - 1;
	var day = this.stringConvertIntDay(date);

	var dt = new Date(year, month, day);

	if(year != dt.getFullYear() && month != dt.getMonth() && day != dt.getDate()){
		return false;
	}

	return true;
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

/**
 * 日付の桁数調整 → 0削除(作成予定?)
 */

