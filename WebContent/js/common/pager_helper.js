/*************************************************
 * ページャ用共通クラス
 * 作成日: 2019/09/21
 *
 *************************************************/
PagerHelper.CURRENT_PAGE = 4;
PagerHelper.END_PAGE = 5;
function PagerHelper(){}

/**
 * 初期設定
 *
 * @param max 1ページのデータ最大表示数
 * @param nowPage 現在ページ
 */
PagerHelper.prototype.pager = function(nowPage, startPage, endPage, maxPage){

	// 現在ページ
	this.now = nowPage ? nowPage : 1;

	// 表次ページ件数(開始)
	this.startPage = startPage;

	// 表示ページ件数(終了)
	this.endPage = endPage;

	// 表示ページ件数(最大)
	this.maxPage = maxPage;

}

/**
 * 全リンクの取得
 *
 * @return 全リンク
 */
PagerHelper.prototype.getRefAll = function(){
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
PagerHelper.prototype.getPageRef = function(){
	var ref = "";
	for(var i = this.startPage; i <= this.endPage; i++){
		ref += i == this.now ? "<span class='pager-none " + this.isCurrent(i) + "'>" + this.now + "</span>" : "<a class='pager " + this.isCurrent(i) + "' href='#page" + i + "'>" + i + "</a>";
	}
	ref += "<span class='pager-none pager-right'>...</span>" ;
	return ref;
}

/**
 * 現在ページ数確認
 *
 * @param idx リンクの番号
 */
PagerHelper.prototype.isCurrent = function(idx){
	if(idx == this.startPage){
		return "pager-left";
	}else{
		return "pager-page";
	}
}

/**
 * リンクの取得(最初へ・前へ)
 *
 * @param リンク(最初へ・前へ)
 */
PagerHelper.prototype.getPrevRef = function(){
	// 最初へリンク
	var ref = this.now > 1 ? "<a class='pager pager-right' href='#page" + 1 + "'>最初へ»</a>" : "<span class='pager-none pager-right'>最初へ»</span>";
	// 前へリンク
	ref += this.now > 1 ? "<a class='pager' href='#page" + (Number(this.now) - 1) + "'>«前へ</a>" : "<span class='pager-none'>«前へ</span>";
	return ref;
}

/**
 * リンクの取得(次へ・最後へ)
 *
 * @param リンク(次へ・最後へ)
 */
PagerHelper.prototype.getNextRef = function(){
	// 次へリンク
	var ref = this.now < this.endPage ? "<a class='pager' href='#page" + (Number(this.now) + 1) + "'>次へ»</a>" : "<span class='pager-none'>次へ»</span>";
	// 最後へリンク
	ref += this.now < this.endPage ? "<a class='pager pager-left' href='#page" + this.maxPage + "'>最後へ»</a>" : "<span class='pager-none pager-left'>最後へ»</span>";
	return ref;
}

/**
 * リンクのクリックイベント
 *
 * @param callback コールバック関数
 */
PagerHelper.prototype.onClick = function(callback){

	$(".pager").off("click");
	$(".pager").on("click", function(){

		// href属性値から対象の現在ページを抜き出す
		var nowPage = this.href.substring(this.href.indexOf("#") + 5, this.href.length);
		if(callback){
			callback(nowPage);
		}
		return false;
	});
}