<!--
//==================================================================
// タブ: 一覧画面ファイル
// 作成日: 2019/09/21
//
//==================================================================
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link rel="stylesheet" type="text/css"
	href="<s:property value="@houserholdaccountbook.util.Util$Css@TABBODY_LISTPAGE_CSS_PATH.getPath()" />">
<!-- JSファイル読み込み -->
<script
	src="<s:property value="@houserholdaccountbook.util.Util$JavaScript@TABBODY_LISTPAGE_JS_PATH.getPath()" />"></script>
<div id="inputArea">
	<s:submit name="prev_button" type="image"
		src="/HouseHoldAccountBook_Web/img/left-chevron.png" />
	<s:textfield name="date" id="date" type="date" />
	<s:submit name="next_button" type="image"
		src="/HouseHoldAccountBook_Web/img/right-chevron.png" />
	<s:submit name="print_button" id="print_button" value="印刷" />
	<s:submit name="add_button" id="add_button" value="追加" />
	<s:submit name="upd_button" id="upd_button" value="更新" />
	<s:submit name="dlt_button" id="dlt_button" value="削除" />
</div>

<div id="tableArea"></div>
<div id="memoArea">
	<s:textarea name="memo" placeholder="メモ" />
</div>