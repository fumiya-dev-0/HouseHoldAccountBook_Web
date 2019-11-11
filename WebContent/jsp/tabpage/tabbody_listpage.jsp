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
		<select id="date-combo" class="combo"></select>
		<s:submit id="print-button" value="印刷" class="btn-info" />
		<s:submit id="new-button" value="新規" class="btn-info" />
		<s:submit id="upd-button" value="更新" class="btn-info" />
		<s:submit id="dlt-button" value="削除" class="btn-warning" />
	</div>
	<div id="main-area">
		<div class="main-area-child">
			<div>収入合計</div>
			<div>999,999円</div>
			<div>支出合計</div>
			<div>999,999円</div>
		</div>
		<div class="main-area-child">
			<span>家計簿表</span>
			<div id="table-area"></div>
		</div>
	</div>
	<div id="pager-area"></div>
</div>