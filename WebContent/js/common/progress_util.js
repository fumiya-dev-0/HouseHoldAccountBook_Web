// ==================================================================
// プログレスバー用ユーティリティクラス
// 作成日: 2019/10/02
//
// ==================================================================
ProgressUtil.WIDTH_POINT = 2;
ProgressUtil.WIDTH_MAX = 100;
ProgressUtil.WIDTH_MIN = 0;
ProgressUtil.INTERVAL = 1000;


function ProgressUtil(){}

/**
 * プログレスダイアログ実行
 *
 */
ProgressUtil.progress = function() {

	this.progressModal = $("#progress-modal");
	this.progressOverlay = $("#progress-overlay");
	this.progressContent = $("#progress-content");
	this.setProgressBar($("#progress-bar"));

	this.width = 50;
	this.interval = null;
	this.update();

	this.modalHelper = new ModalHelper();
	var option = {
			title: "処理を実行しています...",
			close: false,
			width: "15%",
	};
	this.modalHelper.create(option, this.progressModal, this.progressOverlay, this.progressContent, "#progress-header", null);
	this.modalHelper.show(this.progressModal, this.progressOverlay);

	this.autoProcessCntUp();
}

/**
 * プログレスダイアログを閉じる
 *
 */
ProgressUtil.close = function() {

	this.clearAutoProcess();

	if(this.modalHelper) this.modalHelper.close(this.progressModal, this.progressOverlay);
}

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
	if(this.width) this.progressBar.css("width", this.width + "%");
}

/**
 * プログレスバー進捗状況の更新(進む)
 *
 */
ProgressUtil.cntUp = function() {
	if(this.width < this.WIDTH_MAX - 5) this.width += this.WIDTH_POINT;
	this.update();
}

/**
 * プログレスバー進捗状況の更新(戻る)
 *
 */
ProgressUtil.cntDown = function() {
	if(this.width > this.WIDTH_MIN) this.width -= this.WIDTH_POINT;
	this.update();
}

/**
 * 自動実行(カウントアップ)
 *
 */
ProgressUtil.autoProcessCntUp = function() {
	this.interval = setInterval((this.cntUp).bind(this), this.INTERVAL);
}

/**
 * 自動実行(カウントダウン)
 *
 */
ProgressUtil.autoProcessCntDown = function() {
	this.interval = setInterval((this.cntDown).bind(this), this.INTERVAL);
}

/**
 * 自動実行取り消し
 *
 */
ProgressUtil.clearAutoProcess = function() {
	if(this.interval) clearInterval(this.interval);
}

/**
 * プログレスバー更新(最大値)
 *
 */
ProgressUtil.isSetWidthMax = function() {
	if(this.width < this.WIDTH_MAX) this.width = this.WIDTH_MAX;
	this.update();
}

/**
 * プログレスバー更新(最小値)
 *
 */
ProgressUtil.isSetWidthMin = function() {
	if(this.width > this.WIDTH_MIN) this.width = this.WIDTH_MIN;
	this.update();
}