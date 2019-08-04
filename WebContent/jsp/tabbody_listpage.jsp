<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div>
	<s:submit name="prev_button" />
	<s:textfield name="date" value="xxxx年x月x日" />
	<s:submit name="next_button" />
	<s:submit name="print_button" value="印刷" />
	<s:submit name="add_button" value="追加" />
	<s:submit name="upd_button" value="更新" />
	<s:submit name="dlt_button" value="削除" />
</div>
<div>
	<table>
		<tr>
			<td>日付</td>
			<td>品名</td>
			<td>収入</td>
			<td>支出</td>
			<td>費目</td>
			<td>合計</td>
		</tr>
	</table>
</div>
<div>
	<s:textarea name="memo" value="メモ" />
</div>