<!--
/*************************************************
 * ライブラリ用
 * 作成日: 2019/09/21
 *
 *************************************************/
 -->
<%@page import="householdaccountbook.util.HtmlConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- jQuery読み込み -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- CSSファイル読み込み -->
<!-- 初期読み込みCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.DEFAULT_CSS_PATH %>">
<!-- インプット要素CSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.INPUT_CSS_PATH %>">
<!-- テーブルCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.TABLE_CSS_PATH %>">
<!-- メニュー画面CSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.MAIN_CSS_PATH %>">
<!-- タブメニューCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.MENU_CSS_PATH %>">
<!-- ベースダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.BASE_DIALOG_CSS_PATH %>">
<!-- モーダルダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.MODAL_CSS_PATH %>">
<!-- メッセージダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.MESSAGE_CSS_PATH %>">
<!-- プログレスダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.PROGRESS_CSS_PATH %>">
<!-- ページャCSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.PAGER_CSS_PATH %>">
<!-- 一覧画面CSS -->
<link rel="stylesheet" type="text/css" href="<%= HtmlConstants.LISTPAGE_CSS_PATH %>">

<!-- JSファイル読み込み -->
<!-- 定数用JSファイル -->
<script src="<%= HtmlConstants.CONSTANTS_JS_PATH %>"></script>
<!-- ajaxユーティリティクラスJS -->
<script src="<%= HtmlConstants.AJAX_UTIL_JS_PATH %>"></script>
<!-- 日付ユーティリティクラスJS -->
<script src="<%= HtmlConstants.DATE_UTIL_JS_PATH %>"></script>
<!-- 文字列ユーティリティクラスJS -->
<script src="<%= HtmlConstants.STRING_UTIL_JS_PATH %>"></script>
<!-- テーブル生成ヘルパークラスJS -->
<script src="<%= HtmlConstants.TABLE_HELPER_JS_PATH %>"></script>
<!-- ベースダイアログクラスJS -->
<script src="<%= HtmlConstants.BASE_DIALOG_JS_PATH %>"></script>
<!-- モーダルダイアログヘルパークラスJS -->
<script src="<%= HtmlConstants.MODAL_HELPER_JS_PATH %>"></script>
<!-- メッセージダイアログヘルパークラスJS -->
<script src="<%= HtmlConstants.MESSAGE_HELPER_JS_PATH %>"></script>
<!-- プログレスダイアログヘルパークラスJS -->
<script src="<%= HtmlConstants.PROGRESS_HELPER_JS_PATH %>"></script>
<!-- ページャクラスJS -->
<script src="<%= HtmlConstants.PAGER_HELPER_JS_PATH %>"></script>
<!-- メニュー画面JS -->
<script src="<%= HtmlConstants.MAIN_JS_PATH %>"></script>
<!-- 一覧画面JS -->
<script src="<%= HtmlConstants.LISTPAGE_JS_PATH %>"></script>
<!-- タブメニューJS -->
<script src="<%= HtmlConstants.MENU_JS_PATH %>"></script>