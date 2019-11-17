<%@page import="householdaccountbook.util.HtmlConstants"%>
<%@page import="java.lang.reflect.Field"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String htmlConstants = "";
	for(Field field : HtmlConstants.class.getDeclaredFields()){
		field.setAccessible(true);

		try {
			htmlConstants += "HtmlConstants." + field.getName() + "='" + field.get(HtmlConstants.class) + "';\n";
		} catch (IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}
%>
<script>
HtmlConstants = {};

<%= htmlConstants %>
</script>