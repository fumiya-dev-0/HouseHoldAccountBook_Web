<%@page import="com.google.gson.Gson"%>
<%@page import="householdaccountbook.util.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<% Gson gson = new Gson(); %>
<%= gson.toJson(request.getAttribute(Constants.DATA))  %>