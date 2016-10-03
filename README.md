# KD-Search

Javascript library used to preform a search functions using a configured bridge

#Instructions for adding to bundle

1. Add search.JS file to //libraries/kinetic-search/js (You will have to create the kinetic-search directory and add a folder called js.)
2. Add searchConfig.JS file to //packages/catalog/assets/js (this file will require custom configuration.)
3. Add datatables-1.10.7/media directory to //libraries/ (copy the directory into the libraries folder under your **Service Catalog** on your server.)
4. Add datatables-responsive-plugin/media directory to //libraries/ (copy the directory into the libraries folder under your **Service Catalog** on your server.)
5. Open service.jsp (Found in //packages/catalog/interface/views/service)
6. Import JS files and datatables JS files into service.jsp under the <!-- Page Javascript -->
  * &lt;script type="text/javascript" src="<%=bundle.bundlePath()%>libraries/kinetic-search/js/search.js"&gt;&lt;/script&gt;
  * &lt;script type="text/javascript" charset="utf8" src="<%=bundle.bundlePath()%>libraries/datatables-1.10.7/media/js/jquery.dataTables.min.js"&gt;&lt;/script&gt;
  * &lt;script type="text/javascript" charset="utf8" src="<%=bundle.bundlePath()%>libraries/datatables-responsive-plugin/dataTables.responsive.js"&gt;&lt;/script&gt;
7. Import datatables CSS files into service.jsp under the <!-- Page Stylesheets -->
  * &lt;link rel="stylesheet" type="text/css" href="<%=bundle.bundlePath()%>libraries/datatables-1.10.7/media/css/jquery.dataTables.min.css"&gt; 
  * &lt;link rel="stylesheet" type="text/css" href="<%=bundle.bundlePath()%>libraries/datatables-responsive-plugin/dataTables.responsive.custom.css"&gt;
  
# How to use

First add an event on load for the page that the search will be used on and call the **loadSearch()**; function.  Additional load events will have to be included to expose the bridge for each qualifiction that will be used.  Custom code to include a search field input and a handle to activate the search will be required.  Configure the searchConfig.js file to work with the bridge and questions on the form.
And example of calling a DataViewer that executes a search is: DataViewer.executeSearch(function(){ return $(K('section[Requested For]').element());}, searchConfig.personSearchBridgeTable);
