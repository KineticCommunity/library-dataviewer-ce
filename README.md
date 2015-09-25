# KD-Search

Javascript library used to preform a search functions using a configured bridge

#Instructions for adding to bundle

1. Add JS file to //libraries/kinetic-search/js (You will have to create the kinetic-search directory and add a folder called js.)
2. Add datatables-1.10.7/media directory to //libraries/ (copy the directory into the libraries folder under your **Service Catalog** on your server.)
3. Add datatables-responsive-plugin/media directory to //libraries/ (copy the directory into the libraries folder under your **Service Catalog** on your server.)
4. Open service.jsp (Found in //packages/catalog/interface/views/service)
5. Import JS files and datatables JS files into service.jsp under the <!-- Page Javascript -->
  * &lt;script type="text/javascript" src="<%=bundle.bundlePath()%>libraries/kinetic-search/js/search.js"&gt;&lt;/script&gt;
  * &lt;script type="text/javascript" charset="utf8" src="<%=bundle.bundlePath()%>libraries/datatables-1.10.7/media/js/jquery.dataTables.min.js"&gt;&lt;/script&gt;
  * &lt;script type="text/javascript" charset="utf8" src="<%=bundle.bundlePath()%>libraries/datatables-responsive-plugin/dataTables.responsive.js"&gt;&lt;/script&gt;
6. Import datatables CSS files into service.jsp under the <!-- Page Stylesheets -->
  * &lt;link rel="stylesheet" type="text/css" href="<%=bundle.bundlePath()%>libraries/datatables-1.10.7/media/css/jquery.dataTables.min.css"&gt; 
  * &lt;link rel="stylesheet" type="text/css" href="<%=bundle.bundlePath()%>libraries/datatables-responsive-plugin/dataTables.responsive.custom.css"&gt;
  
# How to use

