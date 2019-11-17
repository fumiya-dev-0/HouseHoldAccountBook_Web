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
		<s:submit id="csv-btn" value="CSV出力" class="btn-info" />
		<s:submit id="new-btn" value="新規" class="btn-info" />
		<s:submit id="upd-btn" value="更新" class="btn-info" />
		<s:submit id="del-btn" value="削除" class="btn-warning" />
	</div>
	<div id="main-area">
		<div class="main-area-child">
			<div>収入合計</div>
			<div id="income-sum" class="sum-area"></div>
			<div>支出合計</div>
			<div id="spending-sum" class="sum-area"></div>
			<div>残額合計</div>
			<div id="balance-sum" class="sum-area"></div>
		</div>
		<div class="main-area-child">
			<div id="table-area"></div>
		</div>
	</div>
	<div id="pager-area"></div>
</div>