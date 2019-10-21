<!--
//==================================================================
// タブ: 一覧画面
// 作成日: 2019/09/21
//
//==================================================================
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="inputArea">
	<s:submit name="prev_button" type="image" src="/HouseHoldAccountBook_Web/img/left-chevron.png" />
	<s:textfield name="date" id="date" type="date" />
	<s:submit name="next_button" type="image" src="/HouseHoldAccountBook_Web/img/right-chevron.png" />
	<s:submit id="print_button" value="印刷" class="button-border button-info" />
	<s:submit id="new_button" value="新規" class="button-border button-info" />
	<s:submit id="upd_button" value="更新" class="button-border button-info" />
	<s:submit id="dlt_button" value="削除" class="button-border button-warning" />
</div>

<div id="tableArea"></div>
<div id="memoArea">
	<s:textarea name="memo" placeholder="メモ" />
</div>