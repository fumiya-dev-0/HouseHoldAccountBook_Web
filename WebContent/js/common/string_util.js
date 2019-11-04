/*************************************************
 * 文字列用ユーティリティクラス
 * 作成日: 2019/09/21
 *
 *************************************************/
function StringUtil(){}

/**
 * 数値をカンマ区切りにする
 *
 * @param num
 * @return カンマ区切り文字列
 */
StringUtil.separate = function(num){

    // 文字列にする
    num = String(num);

    var len = num.length;

    // 再帰処理
    if(len > 3){
        // 前半を引数に再帰呼び出し + 後半3桁
        return this.separate(num.substring(0,len-3)) + ',' + num.substring(len-3);
    } else {
        return num;
    }
}

/**
 * 文字列入力チェック
 *
 * @param str 入力文字列
 * @return true(未入力) / false(入力)
 */
StringUtil.isEmpty = function(str){
	return str.trim() == "" ? true : false;
}
