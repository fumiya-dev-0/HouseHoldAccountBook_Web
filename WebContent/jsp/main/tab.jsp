<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<p id="tab_controll">
	<a href="#list_page">一覧</a><a href="#graph_page">グラフ</a><a href="#setting_page">設定</a><a href="#user_add_page">ユーザ登録</a>
</p>
<div id="tab_body">
	<%@include file="../listpage/tabbody_listpage.jsp"%>
	<%@include file="../listpage/tabbody_graphpage.jsp"%>
	<%@include file="../listpage/tabbody_settingpage.jsp"%>
	<%@include file="../listpage/tabbody_useraddpage.jsp"%>
</div>