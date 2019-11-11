<!--
/*************************************************
 * ライブラリ用
 * 作成日: 2019/09/21
 *
 *************************************************/
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- jQuery読み込み -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- CSSファイル読み込み -->
<!-- 初期読み込みCSS -->
<link rel="stylesheet" type="text/css" href="css/common/default.css">
<!-- テーブルCSS -->
<link rel="stylesheet" type="text/css" href="css/common/table.css">
<!-- メニュー画面CSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@MAIN_CSS_PATH.getPath()" />">
<!-- タブメニューCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@TAB_CSS_PATH.getPath()" />">
<!-- ベースダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@BASE_DIALOG_CSS_PATH.getPath()" />">
<!-- モーダルダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@MODAL_CSS_PATH.getPath()" />">
<!-- メッセージダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@MESSAGE_CSS_PATH.getPath()" />">
<!-- プログレスダイアログCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@PROGRESS_CSS_PATH.getPath()" />">
<!-- ページャCSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@PAGER_CSS_PATH.getPath()" />">
<!-- 一覧画面CSS -->
<link rel="stylesheet" type="text/css" href="<s:property value="@householdaccountbook.util.Util$Css@TABBODY_LISTPAGE_CSS_PATH.getPath()" />">

<!-- JSファイル読み込み -->
<!-- 定数用JSファイル -->
<script src="js/common/constants.js"></script>
<!-- ajaxユーティリティクラスJS -->
<script src="js/common/ajax_util.js"></script>
<!-- 日付ユーティリティクラスJS -->
<script src="js/common/date_util.js"></script>
<!-- 文字列ユーティリティクラスJS -->
<script src="js/common/string_util.js"></script>
<!-- テーブル生成ヘルパークラスJS -->
<script src="js/common/table_helper.js"></script>
<!-- ベースダイアログクラスJS -->
<script src="js/base/base_dialog.js"></script>
<!-- モーダルダイアログヘルパークラスJS -->
<script src="js/common/modal_helper.js"></script>
<!-- メッセージダイアログヘルパークラスJS -->
<script src="js/common/message_helper.js"></script>
<!-- プログレスダイアログヘルパークラスJS -->
<script src="js/common/progress_helper.js"></script>
<!-- ページャクラスJS -->
<script src="js/common/pager_util.js"></script>
<!-- 一覧画面JS -->
<script src="<s:property value="@householdaccountbook.util.Util$JavaScript@TABBODY_LISTPAGE_JS_PATH.getPath()" />"></script>
<!-- タブメニューJS -->
<script src="<s:property value="@householdaccountbook.util.Util$JavaScript@TAB_JS_PATH.getPath()" />"></script>