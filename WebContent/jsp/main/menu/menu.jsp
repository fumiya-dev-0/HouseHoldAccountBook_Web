<!--
/*************************************************
 * タブメニュー用画面
 * 作成日: 2019/08/04
 *
 *************************************************/
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<p id="menu-controll">
	<a href="#list_page">一覧</a><a href="#graph_page">グラフ</a><a href="#setting_page">設定</a><a href="#user_add_page">ユーザ登録</a>
</p>
<div id="menu-disp">
	<%@include file="../page/list_page.jsp"%>
	<%@include file="../page/graph_page.jsp"%>
	<%@include file="../page/setting_page.jsp"%>
	<%@include file="../page/user_page.jsp"%>
</div>