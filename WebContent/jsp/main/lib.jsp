<!--
/*************************************************
 * ライブラリ用
 * 作成日: 2019/09/21
 *
 *************************************************/
 -->
<%@page import="householdaccountbook.util.PathConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- jQuery読み込み -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- CSSファイル読み込み -->
<!-- 初期読み込みCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.DEFAULT_CSS_PATH %>">
<!-- インプット要素CSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.INPUT_CSS_PATH %>">
<!-- テーブルCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.TABLE_CSS_PATH %>">
<!-- メニュー画面CSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.MAIN_CSS_PATH %>">
<!-- タブメニューCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.MENU_CSS_PATH %>">
<!-- ベースダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.BASE_DIALOG_CSS_PATH %>">
<!-- モーダルダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.MODAL_CSS_PATH %>">
<!-- メッセージダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.MESSAGE_CSS_PATH %>">
<!-- プログレスダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.PROGRESS_CSS_PATH %>">
<!-- ページャCSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.PAGER_CSS_PATH %>">
<!-- 一覧画面CSS -->
<link rel="stylesheet" type="text/css" href="<%= PathConstants.LISTPAGE_CSS_PATH %>">

<!-- JSファイル読み込み -->
<!-- 定数用JSファイル -->
<script src="<%= PathConstants.CONSTANTS_JS_PATH %>"></script>
<!-- ajaxユーティリティクラスJS -->
<script src="<%= PathConstants.AJAX_UTIL_JS_PATH %>"></script>
<!-- 日付ユーティリティクラスJS -->
<script src="<%= PathConstants.DATE_UTIL_JS_PATH %>"></script>
<!-- 文字列ユーティリティクラスJS -->
<script src="<%= PathConstants.STRING_UTIL_JS_PATH %>"></script>
<!-- テーブル生成ヘルパークラスJS -->
<script src="<%= PathConstants.TABLE_HELPER_JS_PATH %>"></script>
<!-- ベースダイアログクラスJS -->
<script src="<%= PathConstants.BASE_DIALOG_JS_PATH %>"></script>
<!-- モーダルダイアログヘルパークラスJS -->
<script src="<%= PathConstants.MODAL_HELPER_JS_PATH %>"></script>
<!-- メッセージダイアログヘルパークラスJS -->
<script src="<%= PathConstants.MESSAGE_HELPER_JS_PATH %>"></script>
<!-- プログレスダイアログヘルパークラスJS -->
<script src="<%= PathConstants.PROGRESS_HELPER_JS_PATH %>"></script>
<!-- ページャクラスJS -->
<script src="<%= PathConstants.PAGER_HELPER_JS_PATH %>"></script>
<!-- メニュー画面JS -->
<script src="<%= PathConstants.MAIN_JS_PATH %>"></script>
<!-- 一覧画面JS -->
<script src="<%= PathConstants.LISTPAGE_JS_PATH %>"></script>
<!-- タブメニューJS -->
<script src="<%= PathConstants.MENU_JS_PATH %>"></script>