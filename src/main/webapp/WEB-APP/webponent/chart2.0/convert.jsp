<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%@ page import="org.apache.batik.transcoder.image.PNGTranscoder" %>
<%@ page import="org.apache.batik.transcoder.TranscoderInput" %>
<%@ page import="org.apache.batik.transcoder.TranscoderOutput" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<%
	String imageName = URLDecoder.decode(request.getParameter("SVGSTRING"), "UTF-8");

	//String svg_URI_input = Paths.get("test.svg").toUri().toURL().toString();
	Reader stringReader = new StringReader(imageName);
	TranscoderInput input_svg_image = new TranscoderInput(stringReader);
	
	OutputStream png_ostream = new FileOutputStream("C:/down/chart.png");
	
	TranscoderOutput output_png_image = new TranscoderOutput(png_ostream);
	
	PNGTranscoder my_converter = new PNGTranscoder();
	
	my_converter.transcode(input_svg_image, output_png_image);
	
	png_ostream.flush();
	png_ostream.close();
	
	
	 
%>
<body>

</body>
</html>