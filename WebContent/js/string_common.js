// ==================================================================
// 文字列用共通クラス
// 作成日: 2019/09/21
//
// ==================================================================
function StringCommon(){}

/**
 * 数値をカンマ区切りにする
 * @param num
 */
StringCommon.prototype.separate = function(num){

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