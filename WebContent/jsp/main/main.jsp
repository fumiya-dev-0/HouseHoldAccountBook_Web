<!-- JSPタグ宣言 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- Struts2タグ宣言 -->
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="../lib.jsp"%>
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@LIST_CSS_PATH.getPath()" />">
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@TAB_CSS_PATH.getPath()" />">
<!-- モーダルダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@MODAL_CSS_PATH.getPath()" />">
<!-- タブ画面のCSS・JS -->
<!-- 一覧画面 -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@TABBODY_LISTPAGE_CSS_PATH.getPath()" />">
<script src="<s:property value="@householdaccountbook.util.Util$JavaScript@TABBODY_LISTPAGE_JS_PATH.getPath()" />"></script>
<!-- タイトル -->
<title><s:property value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" /></title>
</head>
<body>
	<!-- ヘッダー -->
	<header>
	<h1>
		<s:property value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" />
	</h1>
	<s:submit name="logout" id="logout" value="ログアウト" />
	</header>
	<div id="main">
		<!-- タブメニュー読み込み -->
		<%@include file="tab.jsp"%>
	</div>
	<!-- モーダルダイアログ読み込み -->
	<%@include file="../common/modal.jsp"%>
	<!-- プログレスダイアログ読み込み -->
	<%@include file="../common/progress.jsp"%>
	<!-- JSファイル読み込み -->
	<script src="<s:property value="@householdaccountbook.util.Util$JavaScript@TAB_JS_PATH.getPath()" />"></script>
	<!-- フッター -->
	<footer></footer>
</body>
</html>