/**
 * 対象要素の取得
 */
var tabs = document.getElementById("tab_controll").getElementsByTagName("a");
//var pages = document.getElementById("tab_body").getElementsByTagName("div");
var pages = [document.getElementById("list_page"), document.getElementById("graph_page"), document.getElementById("setting_page")];

/**
 * タブの切り替え処理
 * @returns
 */
function changeTab(){

	// href属性値から対象のid名を抜き出す
	var targetId = this.href.substring(this.href.indexOf("#") + 1, this.href.length);

	// 指定のタブページだけを表示する(block)
	for(var i = 0; i < pages.length; i++){

		if(pages[i].id != targetId){
			pages[i].style.display = "none";
		}else{
			pages[i].style.display = "block";
		}
	}

	// クリックされたタブを前面に表示する
	for(var i = 0; i < pages.length; i++){
		tabs[i].style.zIndex = "0";
	}

	this.style.zIndex = "10";

	// ページ遷移をしないようにfalseを返す
	return false;
}

/**
 * 全てのタブに対して、クリック時にchangeTabが実行
 */
for(var i = 0; i < tabs.length; i++){
	tabs[i].onclick = changeTab;
}

// 最初は先頭のタブを選択
tabs[0].onclick();