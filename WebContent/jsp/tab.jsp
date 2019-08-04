<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<p id="tab_controll">
	<a href="#list_page">一覧</a><a href="#graph_page">グラフ</a><a href="#setting_page">設定</a>
</p>
<div id="tab_body">
	<div id="list_page"><%@include file="tabbody_listpage.jsp"%></div>
	<div id="graph_page"><%@include file="tabbody_graphpage.jsp"%></div>
	<div id="setting_page"><%@include file="tabbody_settingpage.jsp"%></div>
</div>