<!--
/*************************************************
 * メインメニュー画面
 * 作成日: 2019/08/04
 *
 *************************************************/
 -->
<!-- JSPタグ宣言 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- Struts2タグ宣言 -->
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- タイトル -->
<title><s:property value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" /></title>
<script>
window.onload = function(){
	Main.init();
}
</script>
</head>
<body>
	<!-- ヘッダー -->
	<header>
	<h1>
		<s:property value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" />
	</h1>
	<s:submit name="logout" id="logout" class="btn-warning" value="ログアウト" />
	</header>
	<div id="main">
		<!-- タブメニュー読み込み -->
		<%@include file="../menu/menu.jsp"%>
	</div>
	<!-- モーダルダイアログ読み込み -->
	<%@include file="../common/modal.jsp"%>
	<!-- メッセージダイアログ読み込み -->
	<%@include file="../common/message.jsp"%>
	<!-- プログレスダイアログ読み込み -->
	<%@include file="../common/progress.jsp"%>
	<!-- ライブラリ読み込み -->
	<%@include file="lib.jsp"%>
	<!-- フッター -->
	<footer></footer>
</body>
</html>