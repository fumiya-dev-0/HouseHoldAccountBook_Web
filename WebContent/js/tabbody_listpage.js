/**
 * 今日の日時を表示
 */
window.addEventListener("load", function(){

	var dateCommon = new DateCommon();

	var year = dateCommon.toDateDigits(dateCommon.getYear(), 4);
	var month = dateCommon.toDateDigits(dateCommon.getMonth(), 2);
	var day = dateCommon.toDateDigits(dateCommon.getDay(), 2);

	document.getElementById("date").value = year + "-" + month + "-" + day;

})

/**
 * 日付変更ボタン
 *
 * @returns
 */
function dateChange(_this){

	var date = document.getElementById("date");
	var dateCommon = new DateCommon();

	if(_this.getAttribute("id") == "prev_button"){
		date.value = dateCommon.prevDate(date.value);
	}else{
		date.value = dateCommon.nextDate(date.value);
	}

}

/**
 * 行選択時背景色変更
 *
 * @returns
 */
function rowSelectBackgroundColor(){

}

/**
 * モーダルダイアログの表示(YES,NO)
 *
 * @returns
 */
function showDialog(){

}

/**
 * データの追加(1行)
 *
 * @returns
 */
function addRow(){

}