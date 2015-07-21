service_item "Search Example" do
  catalog "Bright House"
  categories "Support"
  type "Template"
  description "Searching Request with Bridges using a js library "
  display_page "/themes/brighthouse/packages/catalog/service.jsp"
  display_name "search_example"
  header_content "<script type='text/javascript' src='/kinetic/themes/brighthouse/libraries/kinetic-search/js/search.js'></script>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/kinetic/themes/brighthouse/packages/catalog/assets/css/peopleSearch.css\">\n\n<!-- DataTables CSS-->\n<!-- <link rel=\"stylesheet\" type=\"text/css\" href=\"/kinetic/themes/flyout/common/resources/DataTables-1.10.5/media/css/jquery.dataTables.css\"> \n<link rel=\"stylesheet\" type=\"text/css\" href=\"//cdn.datatables.net/responsive/1.0.6/css/dataTables.responsive.css\">\n-->\n<!-- DataTables CSS-->\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/kinetic/themes/brighthouse/libraries/datatables-1.10.7/media/css/jquery.dataTables.min.css\"> \n<link rel=\"stylesheet\" type=\"text/css\" href=\"/kinetic/themes/brighthouse/libraries/datatables-responsive-plugin/dataTables.responsive.custom.css\">\n\n  \n<!-- DataTables-->\n<!-- <script type=\"text/javascript\" charset=\"utf8\" src=\"/kinetic/themes/flyout/common/resources/DataTables-1.10.5/media/js/jquery.dataTables.js\"></script>\n<script type=\"text/javascript\" charset=\"utf8\" src=\"//cdn.datatables.net/responsive/1.0.6/js/dataTables.responsive.js\"></script> \n-->\n<!-- DataTables JS-->\n<script type=\"text/javascript\" charset=\"utf8\" src=\"/kinetic/themes/brighthouse/libraries/datatables-1.10.7/media/js/jquery.dataTables.min.js\"></script>\n<script type=\"text/javascript\" charset=\"utf8\" src=\"/kinetic/themes/brighthouse/libraries/datatables-responsive-plugin/dataTables.responsive.js\"></script>\n\n<!-- JQuery UI-->\n<link rel=\"stylesheet\" type=\"text/css\" href=\"ki/netic/themes/brighthouse/libraries/jquery/jquery-ui-1.10.3.custom.min.css\" />\n<script src=\"/kinetic/themes/brighthouse/libraries/jquery/jquery-ui-1.10.3.custom.min.js\"></script>\n\n<!-- Font-Awesome -->\n<link rel=\"stylesheet\" href=\"/kinetic/themes/brighthouse/libraries/font-awesome/css/font-awesome.min.css\">\n\n<script>\nfunction loadSearch() {\n\n\t//Append Slide Panel Dive\n\t$( \".content-slide\" ).before(\"<div class='search-slide' style='display:none; position: absolute;  top: 0;  bottom: 0;  left: 0;  height: 100%;  width: 100%;'></div>\");\n\t//Bind Events to Search Elements\n\t\n\t/*\n\tBind Events to Search buttons\n\tThe data attribute of searchconfig must be applied to each button inorder for events to properly work.\n\tThe data attribute is used to indicate which searchConfig is used to search for values.\t\n\t*/\n\t//Return Keypress in input (Not clickable if 'unclickable' class is set.)\n\t$(document).on('keypress', '.search-container:not(.unclickable) .someoneelse input',function(e) {\n\t\tif(e.which == 13) {\n\t\t\tKD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));\n\t\t}\n\t});\n\t//Click on search icon (Not clickable if 'unclickable' class is set in before function.)\n\t$(document).on('click', '.search-container:not(.unclickable) .fa-search', function(){\n\t\tKD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));\n\t});\n\t//Click on Myself (Not clickable if 'unclickable' class is set in before function.)\n\t$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active).myself', function(){\n\t\tKD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));\n\t});\n\n\t//Bind events to toggle active class to disable elements while search is performing.\n\t//Also clears out values when a either myself or someone else is clicked\n\t//Only buttons which do not have the active or unclickable class applied.\n\t//Event is bound to all search buttons\n\t$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active)', function(){\n\t\t$(this).parent().find('.search-btn').toggleClass(function() {\n\t\t\tvar searchBtn = $(this).closest('.search-btn');\n\t\t\t// if the searchconfig data attribute is set on the element and the button is currently active.\n\t\t\tif(searchBtn.data('searchconfig') && searchBtn.hasClass('active')){\n\t\t\t\t//Loop through each of question elements configured in the column obj and clear it to prep for new values\n\t\t\t\t$.each(KD.search.searchConfig[searchBtn.data('searchconfig')].columns, function(i,v){\n\t\t\t\t\tif(v.setQstn){\n\t\t\t\t\t\tKD.utils.Action.setQuestionValue(v.setQstn, \"\");\n\t\t\t\t\t}\n\t\t\t\t})\n\t\t\t}\n\t\t\treturn \"active\";\n\t\t});\n\t\tif(!$(this).hasClass('someoneelse')){\n\t\t\t$('.someoneelse input').val('');\n\t\t}\n\t})\n\n\t//Function to toggle unclickable elements and spinning search icon\n\t//Used in several callbacks of searchConfig Objects\n\tfunction toggleUnclickable(o){\n\t\t$(o).children().find('.searching').toggle();\n\t\t$(o).toggleClass('unclickable');\n\t\t$(o).find('input').prop('disabled', function(i, v) { return !v; });\n\t}\n\n\t// Define Table objects or list Object and initialize them.\n\tKD.search.initialize({\n\t\trequestedForTableConfig:{\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"BridgeDataTable\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By First Name or Last Name or Full Name\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\tparameters: {'Full Name': '#requested_for input','First Name': '#requested_for input','Last Name': '#requested_for input'},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\tattributes: [\"First Name\",\"Last Name\",\"Email\",\"Login Id\",\"Work Phone Number\"],\n\t\t\t},\n\t\t\t//Where to append the table\n\t\t\tappendTo: $('div.search-slide'),\n\t\t\t//ID to give the table when creating it.\n\t\t\ttableId: 'requestedForTable',\n\t\t\t//After the Table has been created.\n\t\t\tafterInit: function(){ //completeCallback\n\t\t\t},\n\t\t\tbefore: function(){ //before search\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttogglePanel(this);\n\t\t\t},\n\t\t\t//Define action to take place after SDR is complete.\n\t\t\tdone: function (){\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\");\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t//Bind a click event to tr, td, etc.\n\t\t\tclickCallback: function(){\n\t\t\t\t$('table').on( \"click\", 'tr td.select.requestedForTableConfig', {value:this}, function(event){\n\t\t\t\t\tdefaultRowCallback(this);\n\t\t\t\t\t$('#requested_for input').val(KD.utils.Action.getQuestionValue('ReqFor_First Name')+ ' ' + KD.utils.Action.getQuestionValue('ReqFor_Last Name'));\n\t\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t\t\ttogglePanel(event.data.value);\n\t\t\t\t})\n\t\t\t},\n\t\t\t/*Configure the data to be displayed in the table and set into Question Values\n\t\t\t//This is a modified object used by Datatables.net.  setQstn has been added to it.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//title: Display name used in the table header.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t//className: Used with DataTables Responsive Plugin.\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'select', \"title\":\"SELECT\",\torderable: false, width: 60,\t\t\tclassName: \"requestedForTableConfig select\" },\n\t\t\t\t{ data: 'First Name', \"title\":\"FIRST\", \"setQstn\":\"ReqFor_First Name\",\t\tclassName: \"control\" },\n\t\t\t\t{ data: 'Last Name', \"title\":\"LAST\", \"setQstn\":\"ReqFor_Last Name\",\t\t\tclassName: \"min-phone-l control-additional\" },\n\t\t\t\t{ data: 'Email', \"title\":\"EMAIL\", \"setQstn\":\"ReqFor_Email\",\t\t\t\t\tclassName: \"min-tablet control-additional\" },\n\t\t\t\t{ data: 'Login Id', \"title\":\"LOGIN ID\", \"setQstn\":\"ReqFor_Login ID\",\t\tclassName: \"none \" },\n\t\t\t\t{ data: 'Work Phone Number', \"title\":\"PHONE #\", \"setQstn\":\"ReqFor_Phone\",\tclassName: \"none\" },\n\t\t\t]\n\t\t},\n\t\tcontactTableConfig:{\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"BridgeDataTable\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By First Name or Last Name or Full Name\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\tparameters: {'Full Name': '#contact input','First Name': '#contact input','Last Name': '#contact input'},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\t//TODO: can the column configuration be leveraged to retrieve attributes?\n\t\t\t\tattributes: [\"First Name\",\"Last Name\"],\n\t\t\t},\n\t\t\t//Where to append the table\n\t\t\tappendTo: $('div.search-slide'),\n\t\t\t//ID to give the table when creating it.\n\t\t\ttableId: 'contactTable',\n\t\t\t//After the Table has been created.\n\t\t\tafterInit: function(){ //completeCallback\n\t\t\t},\n\t\t\tbefore: function(){ //before search\n\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttogglePanel(this);\n\t\t\t},\n\t\t\t//Define action to take place after Search is complete.\n\t\t\tdone: function (){\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\");\n\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t},\n\t\t\t//Bind a click event to tr, td, etc.\n\t\t\tclickCallback: function(){\n\t\t\t\t$('table').on( \"click\", 'tr td.select.contactTableConfig', {value:this}, function(event){\n\t\t\t\t\tdefaultRowCallback(this);\n\t\t\t\t\t$('#contact input').val(KD.utils.Action.getQuestionValue('Contact_First Name')+ ' ' + KD.utils.Action.getQuestionValue('Contact_Last Name'));\n\t\t\t\t\t$('#contact_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');\n\t\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t\t\ttogglePanel(event.data.value);\n\t\t\t\t})\n\t\t\t},\n\t\t\t/*Configure the data to be displayed in the table and set into Question Values\n\t\t\t//This is a modified object used by Datatables.net.  setQstn has been added to it.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//title: Display name used in the table header.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t//className: Used with DataTables Responsive Plugin.\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'select', \"title\":\"SELECT\",\torderable: false, width: 60,\t\t\tclassName: \"contactTableConfig select\" },\n\t\t\t\t{ data: 'First Name', \"title\":\"FIRST\", \"setQstn\":\"Contact_First Name\",\t\tclassName: \"control\" },\n\t\t\t\t{ data: 'Last Name', \"title\":\"LAST\", \"setQstn\":\"Contact_Last Name\",\t\t\tclassName: \"min-phone-l control-additional\" },\n\n\t\t\t]\n\t\t},\n\t\tdefaultRequestedFor:{\n\t\t\t//define if this should be run at time of initialization\n\t\t\trunAtInitialization: true,\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"BridgeGetSingle\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By Login Id\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\t//Currently set by js before execution.\t\t\t\t\n\t\t\t\tparameters: {'Login ID': clientManager.userName},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\t//TODO: can the column configuration be leveraged to retrieve attributes?\n\t\t\t\tattributes: [\"First Name\",\"Last Name\",\"Email\",\"Login Id\",\"Work Phone Number\"],\n\t\t\t},\n\t\t\tbefore: function(){\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t//Define action to take place after Search is complete.\n\t\t\tdone: function (){\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\");\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t/*Configure the data to be returned by the Bridge and where to populate the data.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'First Name', \"setQstn\":\"ReqFor_First Name\"},\n\t\t\t\t{ data: 'Last Name', \"setQstn\":\"ReqFor_Last Name\"},\n\t\t\t\t{ data: 'Email', \"setQstn\":\"ReqFor_Email\"},\n\t\t\t\t{ data: 'Login Id', \"setQstn\":\"ReqFor_Login ID\"},\n\t\t\t\t{ data: 'Work Phone Number', \"setQstn\":\"ReqFor_Phone\"}\n\t\t\t]\n\t\t},\n\t\tdefaultContact:{\n\t\t\t//define if this should be run at time of initialization\n\t\t\trunAtInitialization: true,\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"BridgeGetSingle\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By Login Id\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\t//Currently set by js before execution.\n\t\t\t\tparameters: {'Login ID': clientManager.userName},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\t//TODO: can the column configuration be leveraged to retrieve attributes?\n\t\t\t\tattributes: [\"First Name\",\"Last Name\",\"Email\",\"Login Id\",\"Work Phone Number\"],\n\t\t\t},\n\t\t\tbefore: function(){\n\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t},\n\t\t\t//Define action to take place after Search is complete.\n\t\t\tdone: function(){\t\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\");\n\t\t\t\ttoggleUnclickable($('#contact'));\n\t\t\t},\n\t\t\t/*Configure the data to be returned by the Bridge and where to populate the data.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'First Name', \"setQstn\":\"Contact_First Name\"},\n\t\t\t\t{ data: 'Last Name', \"setQstn\":\"Contact_Last Name\"},\n\n\t\t\t]\n\t\t},\n\t\tlistContact:{\n\t\t\ttype: \"BridgeList\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By Full Name\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\tparameters: {'Full Name': '#list-contact input'},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\tattributes: [\"First Name\",\"Last Name\",\"Email\",\"Login Id\",\"Work Phone Number\"],\n\t\t\t\t\t},\n\t\t\t//Where to append the table\n\t\t\tappendTo: $('#list-contact-results'),\n\t\t\t//After the Table has been created.\n\t\t\tafterInit: function(){ //completeCallback\n\t\t\t\t\n\t\t\t},\n\t\t\tbefore: function(){\n\t\t\t\ttoggleUnclickable($('#list-contact'));\n\t\t\t},\n\t\t\tloadedcallback: function(){\n\t\t\t\ttoggleUnclickable($('#list-contact'));\n\t\t\t},\n\t\t\tdone: function(){\n\t\t\t},\n\t\t\tclickCallback: function(){\n\t\t\t\tthis.appendTo.on( \"click\", 'li', {value:this}, function(event){\n\t\t\t\t\tdefaultListCallback(this);\n\t\t\t\t\t$('#list-contact .someoneelse input').val(KD.utils.Action.getQuestionValue('List Contact First Name')+ ' ' + KD.utils.Action.getQuestionValue('List Contact Last Name'));\n\t\t\t\t})\n\t\t\t},\n\t\t\t/*Configure the data to be displayed in the list and set into Question Values\n\t\t\t//This is a modified object used by Datatables.net.  setQstn has been added to it.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//title: Display name used in the table header.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t//className:  CSS Class value to apply to element diplayed in list.\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'First Name', \t\t\"title\":\"FIRST\", \t\"setQstn\":\"List Contact First Name\",\t\tclassName: \"control\" },\n\t\t\t\t{ data: 'Last Name', \t\t\"title\":\"LAST\", \t\"setQstn\":\"List Contact Last Name\",\t\t\tclassName: \"min-phone-l control-additional\" },\n\t\t\t\t{ data: 'Email', \t\t\t\"title\":\"EMAIL\", \t\"setQstn\":\"List Contact Email\",\t\t\t\tclassName: \"min-tablet control-additional\" },\n\t\t\t\t{ data: 'Login Id', \t\t\t\t\t\t\t\"setQstn\":\"List Contact Login ID\",\t\t\tclassName: \"none \" },\n\t\t\t\t{ data: 'Work Phone Number',  \t\t\t\t\t\"setQstn\":\"List Contact Phone\",\t\t\t\tclassName: \"none\" },\n\t\t\t],\n\t\t\t\n\t\t\t//Define action to take place after SDR is complete.\n\t\t\tdone: function (){\n\t\t\t\t\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\")\n\t\t\t}\n\t\t},\n\t\tdefaultListContact:{\n\t\t\t//define if this should be run at time of initialization\n\t\t\trunAtInitialization: true,\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"BridgeGetSingle\",\n\t\t\tbridgeConfig:{\n\t\t\t\tmodel: \"Person\",\n\t\t\t\tqualification_mapping: \"By Login Id\",\n\t\t\t\t//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.\n\t\t\t\t//Currently set by js before execution.\n\t\t\t\tparameters: {'Login ID': clientManager.userName},\n\t\t\t\t//CONFIGURE: Bridge Attributes to be returned\n\t\t\t\t//TODO: can the column configuration be leveraged to retrieve attributes?\n\t\t\t\tattributes: [\"First Name\",\"Last Name\",\"Email\",\"Login Id\",\"Work Phone Number\"],\n\t\t\t},\n\t\t\tbefore: function(){\n\t\t\t\ttoggleUnclickable($('#list-contact'));\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttoggleUnclickable($('#list-contact'));\n\t\t\t},\n\t\t\t//Define action to take place after Search is complete.\n\t\t\tdone: function(){\t\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert(\"No results Found\");\n\t\t\t\ttoggleUnclickable($('#list-contact'));\n\t\t\t},\n\t\t\t/*Configure the data to be returned by the Bridge and where to populate the data.\n\t\t\t//columns: Array of Objects.\n\t\t\t//data: Must match the data returned by the Simple Data Request.\n\t\t\t//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)\n\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'First Name', \"setQstn\":\"List Contact First Name\"},\n\t\t\t\t{ data: 'Last Name', \"setQstn\":\"List Contact Last Name\"},\n\n\t\t\t]\n\t\t}\n\t});\n}\n</script>"
  web_server "http://clients.kineticdata.com/kinetic/"
  authentication :default
  data_set "SYSTEM_DEFAULTS"
  visible_to_group "0;"
  management_group "Public"
  submission_group "Public"
  priority "5"
  allow_anonymous true
  page "Initial Page",
    :contents,
    :vertical_buttons,
    :submit_button_value => "Submit" do
    event "default Contact and Requested For",
      :custom_action,
      :load,
      :disabled,
      :use_bridging do
      custom_code "/*Work around to set 'Login Id Paramter to clientManager.userName, which id availabe on jQuery ready when the object is declared.*/\nKD.search.searchConfig.defaultContact.bridgeConfig.parameters['Login ID']=clientManager.userName;\n/*Execute search objec*/\nKD.search.executeTable('defaultContact');\n\n/*Work around to set 'Login Id Paramter to clientManager.userName, which id availabe on jQuery ready when the object is declared.*/\nKD.search.searchConfig.defaultRequestedFor.bridgeConfig.parameters['Login ID']=clientManager.userName;\n/*Execute search objec*/\nKD.search.executeTable('defaultRequestedFor');"
      bridged_resource "Person",
        :qualification => "By Login Id"
    end
    event "loadSearch",
      :custom_action,
      :load,
      :use_bridging do
      custom_code "loadSearch();"
    end
    section  "Section Example",
      :style_class => " border rounded "
    text "Section Example Title", "Section Example",
      :style_class => " sectionHeader "
    text "Service Item Description", "<p>\nReplace this text with a brief desciption of this service item.\n</p>"
    section  "Submitter",
      :removed
    text "Submitter Header", "Submitter Information",
      :style_class => " primaryColorHeader "
    question "Requester First Name", "Requester First Name", :free_text,
      :required,
      :advance_default,
      :editor_label => "Req First Name",
      :default_form => "KS_SAMPLE_People",
      :default_field => "First Name",
      :default_qual => "'AR Login'=\"$\\USER$\"",
      :size => "20",
      :rows => "1",
      :required_text => "Requester First Name",
      :field_map_number => "1"
    question "Requester Last Name", "Requester Last Name", :free_text,
      :required,
      :advance_default,
      :editor_label => "Req Last Name",
      :default_form => "KS_SAMPLE_People",
      :default_field => "Last Name",
      :default_qual => "'AR Login'=\"$\\USER$\"",
      :size => "20",
      :rows => "1",
      :required_text => "Requester Last Name",
      :field_map_number => "2"
    question "Requester People Number", "Requester People Number", :free_text,
      :advance_default,
      :editor_label => "Req People #",
      :default_form => "KS_SAMPLE_People",
      :default_field => "Request ID",
      :default_qual => "'AR Login'=\"$\\USER$\"",
      :size => "20",
      :rows => "1",
      :field_map_number => "3"
    question "Requester Email Address", "Requester Email", :email,
      :required,
      :advance_default,
      :editor_label => "Req Email Address",
      :default_form => "KS_SAMPLE_People",
      :default_field => "Email",
      :default_qual => "'AR Login'=\"$\\USER$\"",
      :size => "20",
      :required_text => "Requester Email",
      :pattern_label => "Standard Email Address",
      :pattern => "^[\\w-\\.]+\\@[\\w\\.-]+\\.[a-zA-Z]{2,4}$",
      :validation_text => "Requester Email Address (Standard Email Address)",
      :field_map_number => "4"
    question "Req Login ID", "Requester Login ID", :free_text,
      :advance_default,
      :default_form => "KS_SAMPLE_People",
      :default_field => "AR Login",
      :default_qual => "'AR Login'=\"$\\USER$\"",
      :size => "20",
      :rows => "1",
      :field_map_number => "7"
    section  "Requested For Section",
      :style_class => " border rounded "
    text "Requested For Header", "Requested For",
      :style_class => " sectionHeader "
    text "name_search", "<div id=\"requested_for\" class=\"search-container\">\n\t<div class=\"search-btn myself active\" data-searchconfig=\"defaultRequestedFor\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<div class=\"myself\">Myself</div>\n\t</div>\n\t<div class=\"search-btn someoneelse\" data-searchconfig=\"requestedForTableConfig\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<input placeholder=\"someone else...\" style=\"\">\n\t\t<div class=\"fa fa-search\"></div>\n\t\t<div class=\"searching fa fa-spinner fa-spin fa-lg\" style=\"display: none;\"></div>\n\t</div>\n</div>\n\n" do
      event "Bind Bridge",
        :custom_action,
        :custom_event,
        :use_bridging do
        custom_code nil
        bridged_resource "Person",
          :qualification => "By First or Last Name"
      end
      event "Bind Bridge",
        :custom_action,
        :click,
        :use_bridging do
        custom_code nil
        bridged_resource "Person",
          :qualification => "By First Name or Last Name or Full Name"
      end
      event "Bridge",
        :custom_action,
        :click,
        :use_bridging do
        custom_code nil
        bridged_resource "Person",
          :qualification => "By Full Name"
      end
    end
    question "Search By Last Name", "Last Name", :free_text,
      :removed,
      :transient,
      :size => "40",
      :rows => "1",
      :style_class => " fleft "
    text "Search Buttons", "<div class=\"fleft\" id=\"searchButtons\">\n  <input type=\"button\" value=\"Search\" id=\"b_searchReqFor\" class=\"templateButton\" > \n  <input type=\"button\" value=\"Clear\" id=\"b_clearReqFor\" class=\"templateButton\" > \n  <img id=\"ajax_searchReqFor\" src=\"/kinetic/themes/brighthouse/common/assets/images/spinner.gif\" alt=\"searching...\" style=\"display:none;\" />\n</div>\n<div class=\"clearfix\"></div>",
      :removed,
      :style_class => " fleft " do
      event "People Search",
        :set_fields_external,
        :click,
        :disabled,
        :fire_if => "1==1" do
        data_request "KS_SAMPLE_People",
          :sort_fields => "Full Name",
          :max_entries => "100",
          :sort_order => "Ascending",
          :qualification => "'Last Name'  LIKE \"<FLD>Search By Last Name;KS43a35d26e48ee43a3ba132d1042b540f6;ANSWER</FLD>%\""
        field_map "ReqFor_Dept", "<FLD>Department</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_Email", "<FLD>Email</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_First Name", "<FLD>First Name</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_Last Name", "<FLD>Last Name</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_Login ID", "<FLD>AR Login</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_Org", "<FLD>Region</FLD> ",
          :visible_in_table => "Yes"
        field_map "ReqFor_Phone", "<FLD>Phone Number</FLD> ",
          :visible_in_table => "Yes"
      end
      event "Bridge Test",
        :custom_action,
        :click,
        :use_bridging do
        custom_code "performBridgeRequest(peopleTables.requestedForTableConfig);"
        bridged_resource "Person",
          :qualification => "All"
      end
    end
    text "RequestedForTable", "<div id=\"requstedForTableDiv\"></div>\n",
      :removed
    section  "Requested For Details Section",
      :style_class => " border rounded "
    question "Requested For Login ID", "Requested For Login ID", :free_text,
      :required,
      :editor_label => "ReqFor_Login ID",
      :size => "40",
      :rows => "1",
      :field_map_number => "11"
    question "Requested For First Name", "First Name", :free_text,
      :editor_label => "ReqFor_First Name",
      :size => "40",
      :rows => "1",
      :field_map_number => "12"
    question "Requested For Last Name", "Last Name", :free_text,
      :editor_label => "ReqFor_Last Name",
      :size => "40",
      :rows => "1",
      :field_map_number => "13"
    question "Requested For Email", "Email Address", :free_text,
      :editor_label => "ReqFor_Email",
      :size => "40",
      :rows => "1",
      :field_map_number => "14"
    question "Requested For Phone Number", "Phone Number", :free_text,
      :editor_label => "ReqFor_Phone",
      :size => "40",
      :rows => "1",
      :field_map_number => "15"
    question "ReqFor_Org", "Office", :free_text,
      :size => "40",
      :rows => "1",
      :field_map_number => "28"
    question "ReqFor_Dept", "Branch", :free_text,
      :size => "40",
      :rows => "1",
      :field_map_number => "6"
    section  "Contact Section",
      :style_class => " border rounded "
    text "Contact Header", "Contact Information",
      :style_class => " sectionHeader "
    text "contact_search", "<div id=\"contact\" class=\"search-container\">\n\t<div class=\"search-btn myself active\" data-searchconfig=\"defaultContact\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<div class=\"myself\">Myself</div>\n\t</div>\n\t<div class=\"search-btn someoneelse\" data-searchconfig=\"contactTableConfig\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<input placeholder=\"someone else...\" style=\"\">\n\t\t<div class=\"fa fa-search\"></div>\n\t\t<div class=\"searching fa fa-spinner fa-spin fa-lg\" style=\"display: none;\"></div>\n\t</div>\n</div>"
    section  "Contact Details Section",
      :style_class => " border rounded "
    question "Contact Login ID", "Contact Login ID", :free_text,
      :required,
      :editor_label => "Contact_Login ID",
      :size => "40",
      :rows => "1",
      :field_map_number => "18"
    question "Contact First Name", "First Name", :free_text,
      :editor_label => "Contact_First Name",
      :size => "40",
      :rows => "1",
      :field_map_number => "19"
    question "Contact Last Name", "Last Name", :free_text,
      :editor_label => "Contact_Last Name",
      :size => "40",
      :rows => "1",
      :field_map_number => "20"
    question "Contact Email", "Email Address", :free_text,
      :editor_label => "Contact_Email",
      :size => "40",
      :rows => "1",
      :field_map_number => "21"
    question "Contact Phone Number", "Phone Number", :free_text,
      :editor_label => "Contact_Phone",
      :size => "40",
      :rows => "1",
      :field_map_number => "22"
    section  "List Contact Section",
      :style_class => " border rounded "
    text "Search Results in a List", "Search Results in a List",
      :style_class => " sectionHeader "
    text "list-contact_search", "<div id=\"list-contact\" class=\"search-container\">\n\t<div class=\"search-btn myself active\" data-searchconfig=\"defaultListContact\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<div class=\"myself\">Myself</div>\n\t</div>\n\t<div class=\"search-btn someoneelse\" data-searchconfig=\"listContact\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<input placeholder=\"someone else...\" style=\"\">\n\t\t<div class=\"fa fa-search\"></div>\n\t\t<div class=\"searching fa fa-spinner fa-spin fa-lg\" style=\"display: none;\"></div>\n\t</div>\n</div>\n<div id=\"list-contact-results\">\n</div>"
    section  "List Contact Details Section",
      :style_class => " border rounded "
    question "List Contact Login ID", "List Contact Login ID", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "9"
    question "List Contact First Name", "List Contact First Name", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "10"
    question "List Contact Last Name", "List Contact Last Name", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "23"
    question "List Contact Email", "List Contact Email", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "16"
    question "List Contact Phone", "List Contact Phone", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "17"
    section  "Questions",
      :style_class => " border rounded "
    text "Service Questions", "Please answer the following questions",
      :style_class => " sectionHeader "
    question "Summary", "Summary", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "5"
    question "Notes", "Notes", :free_text,
      :size => "40",
      :rows => "6",
      :field_map_number => "8"
  end
  page "Confirmation Page",
    :confirmation,
    :vertical_buttons,
    :submit_button_value => "Submit",
    :display_page => "/themes/brighthouse/packages/catalog/confirmation.jsp" do
    section  "Details"
  end
end
