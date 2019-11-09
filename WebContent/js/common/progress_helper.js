/*************************************************
 * プログレスダイアログ用ヘルパークラス
 * 作成日: 2019/10/02
 *
 *************************************************/
/** 横幅初期値 */
ProgressHelper.WIDTH_DEFAULT = 0;
/** 横幅増加値 */
ProgressHelper.WIDTH_POINT = 2;
/** 横幅最大値 */
ProgressHelper.WIDTH_MAX = 100;
/** 1秒間隔 */
ProgressHelper.INTERVAL = 1000;
function ProgressHelper(){}

/**
 * メソッドチェーン
 *
 */
ProgressHelper.prototype = {

		progress: function(){
			this.progress();
		},

		show: function(){
			this.autoProcessCntUp();
			this.show();
		}
}

ProgressHelper.prototype = new BaseDialog();

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

	this.initWidth();

	this.init($("#progress-modal"), $("#progress-overlay"), $("#progress-content"), $("#progress-header"), null, $("#modal"));

	var title = "処理を実行しています...";
	if(title){
		this.header.css("text-align", "left");
		this.header.find("#progress-header-title").text(title);
	}

	return this;
}

/**
 * プログレスダイアログを閉じる
 *
 * @param callback コールバック関数
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
 * プログレスバー初期化
 *
 */
ProgressHelper.prototype.initWidth = function() {
	this.width = ProgressHelper.WIDTH_DEFAULT;
	this.update();
}

/**
 * プログレスバーの更新
 *
 */
ProgressHelper.prototype.update = function() {
	if(this.width !== null){
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