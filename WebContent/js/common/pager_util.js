/*************************************************
 * ページャ用共通クラス
 * 作成日: 2019/09/21
 *
 *************************************************/
function PagerUtil(){}

/**
 * 初期設定
 *
 * @param array 表示データ
 * @param max 1ページのデータ最大表示数
 * @param nowPage 現在ページ
 */
PagerUtil.pager = function(array, max, nowPage){

	this.array = array;
	this.max = max;

	// 表示ページ件数(データ件数 / 1ページのデータ最大表示数)
	this.maxPage = Math.ceil(this.array.length / this.max);

	// 現在ページ
	this.now = nowPage ? nowPage : 1;

	// 配列の何番目から取得するか
	this.startNo = (this.now - 1) * this.max;

}

/**
 * 表示するデータの取得(切り取り)
 *
 * @return 表示データ(切り取り後)
 */
PagerUtil.getDispData = function(){
	return this.array.slice(this.startNo, (this.max * this.now));
}

/**
 * 全リンクの取得
 *
 * @return 全リンク
 */
PagerUtil.getRefAll = function(){
	var ref = this.getPrevRef();
	ref += this.getPageRef();
	ref += this.getNextRef();
	return ref;
}

/**
 * 最大ページ数分のリンクを取得
 *
 * @param 最大ページ数分のリンク
 */
PagerUtil.getPageRef = function(){
	var ref = "";
	for(var i = 1; i <= this.maxPage; i++){
		ref += (i == this.now) ? "<span class='pager-none " + this.isCurrent(i) + "'>" + this.now + "</span>" : "<a class='pager " + this.isCurrent(i) + "' href='#page" + i + "'>" + i + "</a>";
	}
	return ref;
}

/**
 * 現在ページ数確認
 *
 * @param idx リンクの番号
 */
PagerUtil.isCurrent = function(idx){
	if(idx == 1){
		return "pager-left";
	}else if(idx == this.maxPage){
		return "pager-right";
	}else{
		return "pager-page";
	}
}

/**
 * リンクの取得(前へ)
 *
 * @param リンク(前へ)
 */
PagerUtil.getPrevRef = function(){
	return this.now > 1 ? "<a class='pager' href='#page" + (Number(this.now) - 1) + "'>«前へ</a>" : "<span class='pager-none'>«前へ</span>";
}

/**
 * リンクの取得(次へ)
 *
 * @param リンク(次へ)
 */
PagerUtil.getNextRef = function(){
	return this.now < this.maxPage ? "<a class='pager' href='#page" + (Number(this.now) + 1) + "'>次へ»</a>" : "<span class='pager-none'>次へ»</span>";
}

/**
 * リンクのクリックイベント
 *
 * @param callback コールバック関数
 */
PagerUtil.onClick = function(callback){

	$(".pager").on("click", function(){

		// href属性値から対象の現在ページを抜き出す
		var nowPage = this.href.substring(this.href.indexOf("#") + 5, this.href.length);
		callback(nowPage);
		return false;
	});
}