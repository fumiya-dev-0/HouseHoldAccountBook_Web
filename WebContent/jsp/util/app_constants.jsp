<%@page import="householdaccountbook.util.AppConstants"%>
<%@page import="java.lang.reflect.Field"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String appConstants = "";
	for(Field field : AppConstants.class.getDeclaredFields()){
		field.setAccessible(true);

		try {
			appConstants += "AppConstants." + field.getName() + "='" + field.get(AppConstants.class) + "';\n";
		} catch (IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}
%>
<script>
AppConstants = {};

<%= appConstants %>
</script>