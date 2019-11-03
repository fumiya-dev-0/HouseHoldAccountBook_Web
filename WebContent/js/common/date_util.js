/*************************************************
 * 日付用共通クラス
 * 作成日: 2019/09/21
 *
 *************************************************/
function DateUtil(){}

/**
 * 現在の年を取得するメソッド
 *
 */
DateUtil.getYear = function() {
	return (new Date()).getFullYear();
}

/**
 * 現在の月を取得するメソッド
 *
 */
DateUtil.getMonth = function() {
	return (new Date()).getMonth() + 1;
}

/**
 * 現在の日を取得するメソッド
 *
 */
DateUtil.getDay = function() {
	return (new Date()).getDate();
}

/**
 * 日付から年を取得(数値型)
 *
 */
DateUtil.dateConvertIntYear = function(date) {
	return parseInt(date.substr(0, 4));
}

/**
 * 日付から月を取得(数値型)
 *
 */
DateUtil.dateConvertIntMonth = function(date) {
	return parseInt(date.substr(4, 2));
}

/**
 * 日付から日を取得(数値型)
 *
 */
DateUtil.dateConvertIntDay = function(date) {
	return parseInt(date.substr(6, 2));
}

/**
 * 日付から年を取得(文字列型)
 *
 */
DateUtil.dateConvertStringYear = function(date) {
	return date.substr(0, 4);
}

/**
 * 日付から月を取得(文字列型)
 *
 */
DateUtil.dateConvertStringMonth = function(date) {
	return date.substr(4, 2);
}

/**
 * 日付から日を取得(文字列型)
 *
 */
DateUtil.dateConvertStringDay = function(date) {
	return date.substr(6, 2);
}

/**
 * 日付フォーマット変更(スラッシュ): 文字列型
 *
 */
DateUtil.convertToSlashStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "/" + this.dateConvertStringMonth(date) + "/" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(ハイフン): 文字列型
 *
 */
DateUtil.convertToHyphenStringFormat = function(date) {
	return this.dateConvertStringYear(date) + "-" + this.dateConvertStringMonth(date) + "-" + this.dateConvertStringDay(date);
}

/**
 * 日付フォーマット変更(スラッシュ削除): 文字列型
 *
 */
DateUtil.convertToSlashDeleteStringFormat = function(date) {
	return date.replace(/\//g, "");
}

/**
 * 日付フォーマット変更(ハイフン削除): 文字列型
 *
 */
DateUtil.convertToHyphenDeleteStringFormat = function(date) {
	return date.replace(/-/g, "");
}

/**
 * 日付フォーマット変更(スラッシュ): 日付型
 *
 */
DateUtil.convertToSlashDateFormat = function(date) {
	return date.getFullYear() + "/" + this.toDateDigits(date.getMonth() + 1, 2) + "/" + this.toDateDigits(date.getDate(), 2);
}

/**
 * 日付フォーマット変更(ハイフン): 日付型
 *
 */
DateUtil.convertToHyphenDateFormat = function(date) {
	return date.getFullYear() + "-" + this.toDateDigits(date.getMonth() + 1, 2) + "-" + this.toDateDigits(date.getDate(), 2);
}

/**
 * 日付の桁数調整 → 0結合
 *
 */
DateUtil.toDateDigits = function(num, digit) {

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
DateUtil.isDate = function(date) {

	var year = this.dateConvertIntYear(date);
	var month = this.dateConvertIntMonth(date) - 1;
	var day = this.dateConvertIntDay(date);

	var dt = new Date(year, month, day);

	if(year != dt.getFullYear() && month != dt.getMonth() && day != dt.getDate()){
		return false;
	}

	return true;
}