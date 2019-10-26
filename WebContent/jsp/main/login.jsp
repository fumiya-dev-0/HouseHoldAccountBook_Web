<!-- JSPタグ宣言 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- Struts2タグ宣言 -->
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="../lib.jsp"%>
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@LOGIN_CSS_PATH.getPath()" />">

<!-- タイトル -->
<title><s:property
		value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" /></title>
</head>
<body>
	<!-- ヘッダー -->
	<header>
	<h1>
		<s:property
			value="@householdaccountbook.util.Util$Html@TITLE.getHtmlTag()" />
	</h1>
	</header>
	<div align="center" id="main">
		<!-- エラーメッセージ表示 -->
		<div id="error">
			<s:if test="!errorMessage.isEmpty()">
				<s:property value="errorMessage" />
			</s:if>
		</div>
		<!-- ログインフォーム -->
		<s:form action="login_action">
			<table>
				<tr>
					<td>ログイン</td>
				</tr>
				<tr>
					<td><s:textfield name="userId" id="userId" placeholder="ユーザID" /></td>
				</tr>
				<tr>
					<td><s:password name="password" id="password"
							placeholder="パスワード" /></td>
				</tr>
				<tr>
					<td><s:submit value="ログイン" id="login" /></td>
				</tr>
				<tr>
					<td><label><s:checkbox name="auto" id="auto" />ユーザIDを保存する</label></td>
				</tr>
			</table>
		</s:form>
	</div>
	<!-- フッター -->
	<footer> </footer>
</body>
</html>