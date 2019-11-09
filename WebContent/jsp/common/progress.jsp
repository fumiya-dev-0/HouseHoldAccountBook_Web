<!--
/*************************************************
 * プログレスダイアログ用画面
 * 作成日: 2019/10/02
 *
 *************************************************/
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="progress-modal" class="modal">
	<div id="progress-header" class="base-dialog-header">
		<span id="progress-header-title"></span>
	</div>
	<div id="progress-content" class="modal-content">
		<div id="progress">
			<div id="progress-bar"></div>
		</div>
	</div>
</div>