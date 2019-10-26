// ==================================================================
// プログレスバー用ユーティリティクラス
// 作成日: 2019/10/02
//
// ==================================================================
ProgressUtil.WIDTH_POINT = 2;
ProgressUtil.WIDTH_MAX = 100;
ProgressUtil.WIDTH_MIN = 0;
ProgressUtil.INTERVAL = 1000;

var width = 0;

function ProgressUtil(){}

/**
 * プログレスバーの設定
 *
 */
ProgressUtil.setProgressBar = function(progressBar) {
	this.progressBar = progressBar;
}

/**
 * プログレスバーの更新
 *
 */
ProgressUtil.update = function() {
	this.progressBar.css("width", width + "%");
}

/**
 * プログレスバー進捗状況の更新(進む)
 *
 */
ProgressUtil.cntUp = function() {
	if(width < this.WIDTH_MAX) width += this.WIDTH_POINT;
	this.update();
}

/**
 * プログレスバー進捗状況の更新(戻る)
 *
 */
ProgressUtil.cntDown = function() {
	if(width > this.WIDTH_MIN) width -= this.WIDTH_POINT;
	this.update();
}

/**
 * 自動実行(カウントアップ)
 *
 */
ProgressUtil.autoProcessCntUp = function() {
	setInterval((this.cntUp).bind(this), this.INTERVAL);
}

/**
 * 自動実行(カウントダウン)
 *
 */
ProgressUtil.autoProcessCntDown = function() {
	setInterval((this.cntDown).bind(this), this.INTERVAL);
}

/**
 * プログレスバー更新(最大値)
 *
 */
ProgressUtil.isSetWidthMax = function() {
	if(width < this.WIDTH_MAX) width = this.WIDTH_MAX;
	this.update();
}