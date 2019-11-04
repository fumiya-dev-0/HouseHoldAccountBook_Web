<!--
/*************************************************
 * タブ一覧画面
 * 作成日: 2019/09/21
 *
 *************************************************/
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="list_page">
	<div id="input-area">
		<select id="date-combo"></select>
		<s:submit id="print-button" value="印刷" class="button-border button-info" />
		<s:submit id="new-button" value="新規" class="button-border button-info" />
		<s:submit id="upd-button" value="更新" class="button-border button-info" />
		<s:submit id="dlt-button" value="削除" class="button-border button-warning" />
	</div>
	<div id="tableArea"></div>
	<div id="pagerArea"></div>
</div>