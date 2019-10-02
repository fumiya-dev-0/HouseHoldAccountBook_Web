<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link rel="stylesheet" type="text/css"
	href="<s:property value="@houserholdaccountbook.util.Util$Css@TABBODY_LISTPAGE_CSS_PATH.getPath()" />">
	<!-- JSファイル読み込み -->
<script src="<s:property value="@houserholdaccountbook.util.Util$JavaScript@TABBODY_LISTPAGE_JS_PATH.getPath()" />"></script>
<div id="inputArea">
	<s:submit name="prev_button" type="image"
		src="/HouseHoldAccountBook_Web/img/left-chevron.png"
		onclick="dateChange(this)" />
	<s:textfield name="date" id="date" type="date" />
	<s:submit name="next_button" type="image"
		src="/HouseHoldAccountBook_Web/img/right-chevron.png"
		onclick="dateChange(this)" />
	<s:submit name="print_button" id="print_button" value="印刷" />
	<s:submit name="add_button" id="add_button" value="追加" />
	<s:submit name="upd_button" id="upd_button" value="更新" />
	<s:submit name="dlt_button" id="dlt_button" value="削除" />
</div>

<div id="tableArea">
	<table>
		<tr>
			<th>日付</th>
			<th>品名</th>
			<th>収入</th>
			<th>支出</th>
			<th>費目</th>
			<th>合計</th>
		</tr>
		<tr>
			<td>yyyy/mm/dd</td>
			<td>xxx</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
		</tr>
	</table>
</div>
<div id="memoArea">
	<s:textarea name="memo" placeholder="メモ" />
</div>