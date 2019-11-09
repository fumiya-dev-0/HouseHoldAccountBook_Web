<!--
/*************************************************
 * メッセージダイアログ用画面
 * 作成日: 2019/09/23
 *
 *************************************************/
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="confirm-modal" class="modal">
	<div id="confirm-header" class="base-dialog-header">
		<span id="confirm-header-title"></span>
		<input type="button" id="confirm-close" class="base-dialog-close" value="×">
	</div>
	<div id="confirm-content" class="base-dialog-content"></div>
	<div id="confirm-footer" class="base-dialog-footer">
		<input type="button" id="confirm-send-btn" class="button-border button-info" style="width: 60px; height: 30px;" value="ＯＫ">
		<input type="button" id="confirm-close-btn" class="button-border button-warning" style="width: 60px; height: 30px;" value="閉じる">
	</div>
</div>
<div id="alert-modal" class="modal">
	<div id="alert-header" class="base-dialog-header">
		<span id="alert-header-title"></span>
	</div>
	<div id="alert-content" class="base-dialog-content"></div>
	<div id="alert-footer" class="base-dialog-footer">
		<input type="button" id="alert-send-btn" class="button-border button-info" style="width: 60px; height: 30px;" value="ＯＫ">
	</div>
</div>