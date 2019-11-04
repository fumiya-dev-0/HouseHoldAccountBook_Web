/*************************************************
 * プログレスダイアログ用ヘルパークラス
 * 作成日: 2019/10/02
 *
 *************************************************/
ProgressHelper.WIDTH_POINT = 2;
ProgressHelper.WIDTH_MAX = 100;
ProgressHelper.INTERVAL = 1000;
function ProgressHelper(){}

ProgressHelper.prototype = ModalHelper.getInstance();

/**
 * インスタンスの取得
 *
 * @return インスタンス
 */
ProgressHelper.getInstance = function(){
	if(!this.ProgressHelper){
		this.progressHelper = new ProgressHelper();
	}
	return this.progressHelper;
}

/**
 * プログレスダイアログ実行
 *
 */
ProgressHelper.prototype.progress = function() {

	this.width = 0;
	this.update();

	var option = {
			title: "処理を実行しています...",
			close: false,
			width: "15%",
	};

	this.addTarget($("#progress-modal"), $("#progress-overlay"), $("#progress-content"), $("#progress-header"), null, $("#modal"));
	this.create(option);
	this.show();

	this.autoProcessCntUp();
}

/**
 * プログレスダイアログを閉じる
 *
 */
ProgressHelper.prototype.end = function(callback) {
	this.clearAutoProcess();
	this.close(function(){
		if(callback){
			callback();
		}
	});
}

/**
 * プログレスバーの更新
 *
 */
ProgressHelper.prototype.update = function() {
	if(this.width){
		 $("#progress-bar").css("width", this.width + "%");
	}
}

/**
 * プログレスバー進捗状況の更新(進む)
 *
 */
ProgressHelper.prototype.cntUp = function() {
	if(this.width < ProgressHelper.WIDTH_MAX - 5){
		this.width += ProgressHelper.WIDTH_POINT;
	}
	this.update();
}

/**
 * プログレスバー更新(最大値)
 *
 */
ProgressHelper.prototype.setWidthMax = function() {
	if(this.width < ProgressHelper.WIDTH_MAX){
		this.width = ProgressHelper.WIDTH_MAX;
	}
	this.update();
}

/**
 * 自動実行(カウントアップ)
 *
 */
ProgressHelper.prototype.autoProcessCntUp = function() {
	this.interval = setInterval((this.cntUp).bind(this), ProgressHelper.INTERVAL);
}

/**
 * 自動実行取り消し
 *
 */
ProgressHelper.prototype.clearAutoProcess = function() {
	if(this.interval) clearInterval(this.interval);
}