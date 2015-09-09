service_item "SDR Search Example" do
  catalog "Production"
  categories "Request Type"
  type "Template"
  description nil
  display_page "/themes/brighthouse-anne/packages/catalog/service.jsp"
  display_name nil
  header_content "<script>\nfunction handleTierSelectOnLoad(tierSelectInput, data){\n    KD.utils.Action.setQuestionValue(tierSelectInput,'Loading....');\n    var $input = $(KD.utils.Util.getQuestionInput(tierSelectInput));\n    $input.buildTierSelect(data);\n}\n\nfunction handleTierSelectOnLoadSDR(tierSelectInput, data, actionId){\n    KD.utils.Action.setQuestionValue(tierSelectInput,'Loading....');\n    var $input = $(KD.utils.Util.getQuestionInput(tierSelectInput));\n\n    var connection = new KD.utils.Callback(function(arg){\n        $input.buildTierSelectFromSDR(data, arg.responseText);\n        console.log(arg.responseText);\n    }, function(arg){\n        KD.utils.Action.setQuestionValue(tierSelectInput,'Error!');\n        console.log(arg.responseText);\n    });\nvar questElement = KD.utils.Util.getElementObject(\"Organization\");\nvar questionID = questElement.id.substr(7);\n    var params =  questionID +'='+KD.utils.Action.getQuestionValue(\"Organization\");\n    KD.utils.Action.makeAsyncRequest('Groups', actionId, connection,params, '', true);\n\n}\n\nfunction CallLastNameSDR(ActionID,Params,Name) {\n\nKD.search.initialize({\n\t\trequestedForSDRTableConfig:{\n\t\t\t//type: \"BridgeDataTable\" or \"BridgeList\".  Determines default values to be used and behavior.\n\t\t\ttype: \"performSDRTable\",\n\t\t\tsdrConfig:{\n\t\t\t\tSDRId: ActionID,\n\t\t\t\tparams: Params,\n\t\t\t\tsdrName: Name\n\t\t\t},\n\t\t\t//Where to append the table\n\t\t\tappendTo: $('div.search-slide'),\n\t\t\t//ID to give the table when creating it.\n\t\t\ttableId: 'requestedForTable',\n\t\t\t//After the Table has been created.\n\t\t\tafterInit: function(){ //completeCallback\n\t\t\t},\n\t\t\tbefore: function(){ //before search\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t\t$('#requested_for input').val($('#requested_for input').val().toLowerCase());\n\t\t\t},\n\t\t\t// After Table Load\n\t\t\tloadedcallback: function(){\n\t\t\t\ttogglePanel(this);\n\t\t\t},\n\t\t\t//Define action to take place after SDR is complete.\n\t\t\tdone: function (){\n\t\t\t},\n\t\t\tnoResults: function(){\n\t\t\t\talert('No results Found');\n\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t},\n\t\t\t//Bind a click event to tr, td, etc.\n\t\t\tclickCallback: function(){\n\t\t\t\t$('table').on( 'click', 'tr td.select.requestedForTableConfig', {value:this}, function(event){\n\t\t\t\t\tdefaultRowCallback(this);\n\t\t\t\t\t$('#requested_for input').val(KD.utils.Action.getQuestionValue('ReqFor_First Name')+ ' ' + KD.utils.Action.getQuestionValue('ReqFor_Last Name'));\n\t\t\t\t\ttoggleUnclickable($('#requested_for'));\n\t\t\t\t\ttogglePanel(event.data.value);\n\t\t\t\t})\n\t\t\t},\n\t\t\t/*Configure the data to be displayed in the table and set into Question Values\n\t\t\t\t\t\t*/\n\t\t\tcolumns: [\n\t\t\t\t{ data: 'select', \"title\":\"SELECT\",\torderable: false, width: 60,\t\t\tclassName: \"requestedForTableConfig select\" },\n\t\t\t\t{ data: 'AR Login', \"title\":\"LOGIN ID\", \"setQstn\":\"ReqFor_Login ID\",\t\tclassName: \"control\" },\n\t\t\t\t{ data: 'First Name', \"title\":\"FIRST\", \"setQstn\":\"ReqFor_First Name\",\t\tclassName: \"min-tablet control-additional\" },\n\t\t\t\t{ data: 'Last Name', \"title\":\"LAST\", \"setQstn\":\"ReqFor_Last Name\",\t\t\tclassName: \"min-tablet control-additional\" },\n\t\t\t\t{ data: 'Department', \"title\":\"DEPT\", \t\t\tclassName: \"min-tablet control-additional\" },\n\t\t\t\t\t\n\t\t\t\t{ data: 'Phone Number', \"title\":\"OFFICE PHONE\", \"setQstn\":\"ReqFor_OfficePhone\",\tclassName: \"none\" },\n\t\t\t\t{ data: 'Email', \"title\":\"EMAIL\", \"setQstn\":\"ReqFor_Email\",\t\t\t\t\tclassName: \"none\" },\n\t\t\t\t{ data: 'AddrLine1', \"title\":\"STREET ADDRESS\", \t\t\t\tclassName: \"none\" },\n\t\t\t\t{ data: 'Create Date', \"title\":\"Created On\", \"setQstn\":\"ReqFor_OfficeLoc\",\tclassName: \"none\" },\n\t\t\t\t{ data: 'Supervisor Name', \"title\":\"MANAGER NAME\", \tclassName: \"none\" }\n\t\t\t]\n\t\t}\n\t\t});\n\n}\n</script>\n\n\n"
  web_server "http://clients.kineticdata.com/kinetic/"
  authentication :default
  data_set "SYSTEM_DEFAULTS"
  visible_to_group "0;"
  management_group "Public"
  submission_group "Public"
  priority "5"
  allow_anonymous true
  attribute "Task Server Name", "Clients Task 4"
  attribute "Task Source Name", "Kinetic Request"
  page "Initial Page",
    :contents,
    :vertical_buttons,
    :submit_button_value => "Submit" do
    event "Initial processing of Tiered Menu fields ",
      :custom_action,
      :load,
      :use_bridging do
      custom_code "/*var tierSelectDataObject = {\n\tbridgeModelName: 'Problem Codes',\n\tbridgeQualification: 'Active By Ticket Type',\n\tbridgeParameterNames: ['Ticket Type'],\n\tbridgeParameterValues: ['Service Request'],\n\tbridgeOrderField: 'Value',\n\ttierLevelFields: [\n\t\t'Category',\n\t\t'Subcategory',\n\t\t'Description'\n\t],\n\tvalueField: 'Value'\n};\n\nhandleTierSelectOnLoad('Service Category', tierSelectDataObject);\n\nvar tierSelectDataObjectSDR = {\n\ttierLevelFields: [\n                                'Tier 01',\n\t\t'Tier 02'\n\t],\n\tvalueField: 'Tier 02'\n};\nhandleTierSelectOnLoadSDR('Group', tierSelectDataObjectSDR, clientAction.actionId);*/"
    end
    event "alert",
      :custom_action,
      :load,
      :disabled,
      :use_bridging do
      custom_code "alert('load');"
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
      :editor_label => "Req First Name",
      :size => "20",
      :rows => "1",
      :required_text => "Requester First Name",
      :field_map_number => "1"
    question "Requester Last Name", "Requester Last Name", :free_text,
      :required,
      :editor_label => "Req Last Name",
      :size => "20",
      :rows => "1",
      :required_text => "Requester Last Name",
      :field_map_number => "2"
    question "Requester Email Address", "Requester Email", :email,
      :required,
      :editor_label => "Req Email Address",
      :size => "20",
      :required_text => "Requester Email",
      :pattern_label => "Standard Email Address",
      :pattern => "^[\\w-\\.]+\\@[\\w\\.-]+\\.[a-zA-Z]{2,4}$",
      :validation_text => "Requester Email Address (Standard Email Address)",
      :field_map_number => "4"
    question "Req Login ID", "Requester Login ID", :free_text,
      :size => "20",
      :rows => "1",
      :field_map_number => "7"
    section  "Requested For Section",
      :style_class => " border rounded "
    text "Requested For Header", "Requested For",
      :style_class => " sectionHeader "
    text "requested for search", "<div id=\"requested_for\" class=\"search-container\">\n\t<div class=\"search-btn myself active\" data-searchconfig=\"defaultRequestedFor\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<div class=\"myself\">Myself</div>\n\t</div>\n\t<div class=\"search-btn someoneelse\" data-searchconfig=\"requestedForTableConfig\">\n\t\t<div class=\"fa fa-check\"></div>\n\t\t<input placeholder=\"someone else...\" style=\"\">\n\t\t<div class=\"fa fa-search\"></div>\n\t\t<div class=\"searching fa fa-spinner fa-spin fa-lg\" style=\"display: none;\"></div>\n\t</div>\n</div>" do
      event "Define Search",
        :custom_action,
        :click do
        custom_code "\n  var lastName = KD.utils.Action.getQuestionValue('ReqFor_Last Name');\n  var lastNameElm = KD.utils.Util.getElementObject('ReqFor_Last Name');\n  var lastNameId = null;\n  if (lastNameElm && lastNameElm.id) {\n    lastNameId = lastNameElm.id.substr(7);\n    var sdrparams = '' + lastNameId + '=' + lastName;\n\nCallLastNameSDR( clientAction.actionId,sdrparams,'Search by Last Name');\n\n  }"
        data_request "KS_SAMPLE_People",
          :name => "Search by Last Name",
          :fields_available => "AddrLine1,AR Login,Department,Email,First Name,Last Name,Office,Phone Number,Supervisor Name,Create Date",
          :sort_fields => "Last Name,First Name",
          :max_entries => "999",
          :sort_order => "Ascending",
          :qualification => "'Last Name' LIKE  \"<FLD>ReqFor_Last Name;KS690e923801298dee7901937084d448b66;ANSWER</FLD>%\""
      end
    end
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
      :field_map_number => "13" do
      event "Search by Last Name",
        :custom_action,
        :keyup,
        :fire_if => "KD.utils.Util.getKeyPressed(evt)==13" do
        custom_code "\n  var lastName = KD.utils.Action.getQuestionValue('ReqFor_Last Name');\n  var lastNameElm = KD.utils.Util.getElementObject('ReqFor_Last Name');\n  var lastNameId = null;\n  if (lastNameElm && lastNameElm.id) {\n    lastNameId = lastNameElm.id.substr(7);\n    var sdrparams = '' + lastNameId + '=' + lastName;\n\nCallLastNameSDR( clientAction.actionId,sdrparams,'Search by Last Name');\nKD.search.executeSearch('requestedForSDRTableConfig');\n  }\n\n"
        data_request "KS_SAMPLE_People",
          :name => "Search by Last Name",
          :fields_available => "AddrLine1,AR Login,Department,Email,First Name,Last Name,Office,Phone Number,Supervisor Name,Create Date",
          :sort_fields => "Last Name,First Name",
          :max_entries => "999",
          :sort_order => "Ascending",
          :qualification => "'Last Name' LIKE  \"<FLD>ReqFor_Last Name;KS690e923801298dee7901937084d448b66;ANSWER</FLD>%\""
      end
    end
    question "Requested For Email", "Email Address", :free_text,
      :editor_label => "ReqFor_Email",
      :size => "40",
      :rows => "1",
      :field_map_number => "14"
    question "Requested For Office Number", "Office Phone Number", :free_text,
      :editor_label => "ReqFor_OfficePhone",
      :size => "40",
      :rows => "1",
      :field_map_number => "15"
    question "Requested For Mobile Number", "Mobile Phone Number", :free_text,
      :editor_label => "ReqFor_MobileNumber",
      :size => "40",
      :rows => "1",
      :field_map_number => "28"
    question "Requested For Office Location", "Office Location", :free_text,
      :editor_label => "ReqFor_OfficeLoc",
      :size => "40",
      :rows => "1",
      :field_map_number => "6"
    section  "Questions",
      :style_class => " border rounded "
    text "Service Questions", "Please answer the following questions",
      :style_class => " sectionHeader "
    question "Issue Details", "Issue Details", :free_text,
      :size => "80",
      :rows => "3",
      :max => "4000",
      :field_map_number => "5"
    section  "Attachment Section",
      :style_class => " multiple-attachment-section  border rounded "
    text "Attachment Header", "Attachment(s)",
      :style_class => " sectionHeader "
    question "Attachment1", "Attachment", :attachment,
      :size => "40",
      :file_size_limit => "10240",
      :upload_label => "Get File",
      :clear_label => "Clear",
      :field_map_number => "3"
    question "Attachment2", "Attachment", :attachment,
      :removed,
      :size => "40",
      :file_size_limit => "10240",
      :upload_label => "Get File",
      :clear_label => "Clear",
      :field_map_number => "8"
    question "Attachment3", "Attachment", :attachment,
      :removed,
      :size => "40",
      :file_size_limit => "10240",
      :upload_label => "Get File",
      :clear_label => "Clear",
      :field_map_number => "10"
    question "Attachment4", "Attachment", :attachment,
      :removed,
      :size => "40",
      :file_size_limit => "10240",
      :upload_label => "Get File",
      :clear_label => "Clear",
      :field_map_number => "16"
    question "Attachment5", "Attachment", :attachment,
      :removed,
      :size => "40",
      :file_size_limit => "10240",
      :upload_label => "Get File",
      :clear_label => "Clear",
      :field_map_number => "17"
  end
  page "Confirmation Page",
    :confirmation,
    :vertical_buttons,
    :display_page => "/themes/BH/packages/catalog/confirmation.jsp" do
    section  "Details"
  end
end
