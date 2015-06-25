function loadSearch() {

	//Append Slide Panel Dive
	$( ".content-slide" ).before("<div class='search-slide' style='display:none; position: absolute;  top: 0;  bottom: 0;  left: 0;  height: 100%;  width: 100%;'></div>");
	//Bind Events to Search Elements
	
	/*
	Bind Events to Search buttons
	The data attribute of searchconfig must be applied to each button inorder for events to properly work.
	The data attribute is used to indicate which searchConfig is used to search for values.	
	*/
	//Return Keypress in input (Not clickable if 'unclickable' class is set.)
	$(document).on('keypress', '.search-container:not(.unclickable) .someoneelse input',function(e) {
		if(e.which == 13) {
			KD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));
		}
	});
	//Click on search icon (Not clickable if 'unclickable' class is set in before function.)
	$(document).on('click', '.search-container:not(.unclickable) .fa-search', function(){
		KD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));
	});
	//Click on Myself (Not clickable if 'unclickable' class is set in before function.)
	$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active).myself', function(){
		KD.search.executeSearch($(this).closest('.search-btn').data('searchconfig'));
	});

	//Bind events to toggle active class to disable elements while search is performing.
	//Also clears out values when a either myself or someone else is clicked
	//Only buttons which do not have the active or unclickable class applied.
	//Event is bound to all search buttons
	$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active)', function(){
		$(this).parent().find('.search-btn').toggleClass(function() {
			var searchBtn = $(this).closest('.search-btn');
			// if the searchconfig data attribute is set on the element and the button is currently active.
			if(searchBtn.data('searchconfig') && searchBtn.hasClass('active')){
				//Loop through each of question elements configured in the column obj and clear it to prep for new values
				$.each(KD.search.searchConfig[searchBtn.data('searchconfig')].columns, function(i,v){
					if(v.setQstn){
						KD.utils.Action.setQuestionValue(v.setQstn, "");
					}
				})
			}
			return "active";
		});
		if(!$(this).hasClass('someoneelse')){
			$('.someoneelse input').val('');
		}
	})

	//Function to toggle unclickable elements and spinning search icon
	//Used in several callbacks of searchConfig Objects
	function toggleUnclickable(o){
		$(o).children().find('.searching').toggle();
		$(o).toggleClass('unclickable');
		$(o).find('input').prop('disabled', function(i, v) { return !v; });
	}

	// Define Table objects or list Object
	// TODO:Possibly separate Tables from List is separate JS or config
	KD.search.initialize({
		requestedForTableConfig:{
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By First Name or Last Name or Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '#requested_for input','First Name': '#requested_for input','Last Name': '#requested_for input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			//Where to append the table
			appendTo: $('div.search-slide'),
			//ID to give the table when creating it.
			tableId: 'requestedForTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
			},
			before: function(){ //before search
				toggleUnclickable($('#requested_for'));
			},
			// After Table Load
			loadedcallback: function(){
				togglePanel(this);
			},
			//Define action to take place after SDR is complete.
			done: function (){
			},
			noResults: function(){
				alert("No results Found");
				toggleUnclickable($('#requested_for'));
			},
			//Bind a click event to tr, td, etc.
			clickCallback: function(){
				$('table').on( "click", 'tr td.select.requestedForTableConfig', {value:this}, function(event){
					defaultRowCallback(this);
					$('#requested_for input').val(KD.utils.Action.getQuestionValue('ReqFor_First Name')+ ' ' + KD.utils.Action.getQuestionValue('ReqFor_Last Name'));
					toggleUnclickable($('#requested_for'));
					togglePanel(event.data.value);
				})
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className: Used with DataTables Responsive Plugin.
			*/
			columns: [
				{ data: 'select', "title":"SELECT",	orderable: false, width: 60,			className: "requestedForTableConfig select" },
				{ data: 'First Name', "title":"FIRST", "setQstn":"ReqFor_First Name",		className: "control" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"ReqFor_Last Name",			className: "min-phone-l control-additional" },
				{ data: 'Email', "title":"EMAIL", "setQstn":"ReqFor_Email",					className: "min-tablet control-additional" },
				{ data: 'Login Id', "title":"LOGIN ID", "setQstn":"ReqFor_Login ID",		className: "none " },
				{ data: 'Work Phone Number', "title":"PHONE #", "setQstn":"ReqFor_Phone",	className: "none" },
			]
		},
		contactTableConfig:{
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By First Name or Last Name or Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '#contact input','First Name': '#contact input','Last Name': '#contact input'},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name"],
			},
			//Where to append the table
			appendTo: $('div.search-slide'),
			//ID to give the table when creating it.
			tableId: 'contactTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
			},
			before: function(){ //before search
				toggleUnclickable($('#contact'));
			},
			// After Table Load
			loadedcallback: function(){
				togglePanel(this);
			},
			//Define action to take place after Search is complete.
			done: function (){
			},
			noResults: function(){
				alert("No results Found");
				toggleUnclickable($('#contact'));
			},
			//Bind a click event to tr, td, etc.
			clickCallback: function(){
				$('table').on( "click", 'tr td.select.contactTableConfig', {value:this}, function(event){
					defaultRowCallback(this);
					$('#contact input').val(KD.utils.Action.getQuestionValue('Contact_First Name')+ ' ' + KD.utils.Action.getQuestionValue('Contact_Last Name'));
					$('#contact_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');
					toggleUnclickable($('#contact'));
					togglePanel(event.data.value);
				})
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className: Used with DataTables Responsive Plugin.
			*/
			columns: [
				{ data: 'select', "title":"SELECT",	orderable: false, width: 60,			className: "contactTableConfig select" },
				{ data: 'First Name', "title":"FIRST", "setQstn":"Contact_First Name",		className: "control" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"Contact_Last Name",			className: "min-phone-l control-additional" },

			]
		},
		defaultRequestedFor:{
			//define if this should be run at time of initialization
			runAtInitialization: true,
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeGetSingle",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Login Id",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.				
				parameters: {'Login ID': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			before: function(){
				toggleUnclickable($('#requested_for'));
			},
			// After Table Load
			loadedcallback: function(){
				toggleUnclickable($('#requested_for'));
			},
			//Define action to take place after Search is complete.
			done: function (){
			},
			noResults: function(){
				alert("No results Found");
				toggleUnclickable($('#requested_for'));
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className: Used with DataTables Responsive Plugin.
			*/
			columns: [
				{ data: 'First Name', "setQstn":"ReqFor_First Name"},
				{ data: 'Last Name', "setQstn":"ReqFor_Last Name"},
				{ data: 'Email', "setQstn":"ReqFor_Email"},
				{ data: 'Login Id', "setQstn":"ReqFor_Login ID"},
				{ data: 'Work Phone Number', "setQstn":"ReqFor_Phone"}
			]
		},
		defaultContact:{
			//define if this should be run at time of initialization
			runAtInitialization: true,
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeGetSingle",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Login Id",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.
				parameters: {'Login ID': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			before: function(){
				toggleUnclickable($('#contact'));
			},
			// After Table Load
			loadedcallback: function(){
				toggleUnclickable($('#contact'));
			},
			//Define action to take place after Search is complete.
			done: function(){	
			},
			noResults: function(){
				alert("No results Found");
				toggleUnclickable($('#contact'));
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className: Used with DataTables Responsive Plugin.
			*/
			columns: [
				{ data: 'First Name', "setQstn":"Contact_First Name"},
				{ data: 'Last Name', "setQstn":"Contact_Last Name"},

			]
		},
		listContact:{
			type: "BridgeList",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '#list-contact input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
					},
			//Where to append the table
			appendTo: $('#list-contact-results'),
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			before: function(){
				toggleUnclickable($('#list-contact'));
			},
			loadedcallback: function(){
				toggleUnclickable($('#list-contact'));
			},
			done: function(){
			},
			clickCallback: function(){
				this.appendTo.on( "click", 'li', {value:this}, function(event){
					defaultListCallback(this);
					$('#list-contact .someoneelse input').val(KD.utils.Action.getQuestionValue('List Contact First Name')+ ' ' + KD.utils.Action.getQuestionValue('List Contact Last Name'));
				})
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'First Name', 		"title":"FIRST", 	"setQstn":"List Contact First Name",		className: "control" },
				{ data: 'Last Name', 		"title":"LAST", 	"setQstn":"List Contact Last Name",			className: "min-phone-l control-additional" },
				{ data: 'Email', 			"title":"EMAIL", 	"setQstn":"List Contact Email",				className: "min-tablet control-additional" },
				{ data: 'Login Id', 							"setQstn":"List Contact Login ID",			className: "none " },
				{ data: 'Work Phone Number',  					"setQstn":"List Contact Phone",				className: "none" },
			],
			
			//Define action to take place after SDR is complete.
			done: function (){
				
			},
			noResults: function(){
				alert("No results Found")
			}
		},
		defaultListContact:{
			//define if this should be run at time of initialization
			runAtInitialization: true,
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeGetSingle",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Login Id",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.
				parameters: {'Login ID': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			before: function(){
				toggleUnclickable($('#list-contact'));
			},
			// After Table Load
			loadedcallback: function(){
				toggleUnclickable($('#list-contact'));
			},
			//Define action to take place after Search is complete.
			done: function(){	
			},
			noResults: function(){
				alert("No results Found");
				toggleUnclickable($('#list-contact'));
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className: Used with DataTables Responsive Plugin.
			*/
			columns: [
				{ data: 'First Name', "setQstn":"List Contact First Name"},
				{ data: 'Last Name', "setQstn":"List Contact Last Name"},

			]
		}
	});
}

(function($) {
	// Ensure the KINETIC global object exists
    KD = KD || {};
    // Create the utils namespace
    KD.utils = KD.utils || {};
    // Create the service items namespace
    KD.search = KD.search || {};
    // Create a scoped alias to simplify references
    var search = KD.search;

	//Define defaults for the Table config.  Reduces need to include all properties.  Each table config my overide these values by 
	//including a value of its own.
	//TODO:  Should these defaults be converted to and Array of objects also?
	var defaultsBridgeDataTable = {
		execute: performBridgeRequestDataTable,
		paging: true,
		info: true,
		searching: true,
		responsive: {
			details: {
				type: 'column',
				target: '.control, .control-additional'
			}
		},
	};
	
	//Define defaults for the List config.  Reduces need to include all properties.  Each list config my overide these values by 
	//including a value of its own.
	var defaultsBridgeList = {
		execute: performBridgeRequestList,
	};
	
	//Define defaults for the Table config.  Reduces need to include all properties.  Each table config my overide these values by 
	//including a value of its own.
	var defaultsBridgeGetSingle = {
		execute: performBridgeRequestSingle,
	};
	
	search.executeSearch = function(name) {
		search.searchConfig[name].execute();
	};
	
	search.searchConfig = {};
	search.initialize = function(o){
		search.searchConfig = o;
		//Initialize the configurations
		$.each(search.searchConfig, function(i, config){
			if(config.type=="BridgeDataTable"){
				//Entend defaults into the configuration
				search.searchConfig[i]=$.extend( {}, defaultsBridgeDataTable, config );
				$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId);
				search.searchConfig[i].appendTo.append($table);
				search.searchConfig[i].afterInit();
				search.searchConfig[i].clickCallback();
			}
			else if(config.type=="BridgeList"){
				//Entend defaults into the configuration
				search.searchConfig[i]=$.extend( {}, defaultsBridgeList, config );
				search.searchConfig[i].appendTo.append("<div id='results'>").hide();
				search.searchConfig[i].afterInit();
				search.searchConfig[i].clickCallback();
			}
			else if(config.type=="BridgeGetSingle"){
				//Entend defaults into the configuration
				search.searchConfig[i]=$.extend( {}, defaultsBridgeGetSingle, config );
			}
			//Execute Search immediately
			if(config.runAtInitialization){
				search.executeSearch(filtersearchConfigByName(search.searchConfig[i]));
			}
		});
	}

	this.defaultRowCallback = function(row){ //rowCallback
		var table = $(row).closest('table').data('name')
		var configObj = search.searchConfig[table];
		//var table = filterByName (search.searchConfig, tableConfig);
		var selectedRow = $(row).closest('tr');
		//Loop through columns configuration to set question values.
		$.each(configObj.columns, function( j, v){
			if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
				KD.utils.Action.setQuestionValue(v["setQstn"],configObj.tableObj.row(selectedRow).data()[v["data"]]);
			}
		});
	}

	this.defaultListCallback = function(li){ //rowCallback
		var list = $(li).closest('ul').data('name');
		var configObj = search.searchConfig[list];
		//var table = filterByName (search.searchConfig, tableConfig);
		this.selectionData = $(li).data()
		var self = this; // reference to this in current scope
		//Loop through columns configuration to set question values.
		$.each(configObj.columns, function( j, v){
			if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
				KD.utils.Action.setQuestionValue(v["setQstn"],self.selectionData[v.data]);
			}
		});
		configObj.appendTo.hide("blind", "swing", 1000);
	}

	// Used to execute objects configured as defaultBridgeDataTable
	function performBridgeRequestDataTable(){
		var configObj = this;
		configObj.before();
		//Retrieve and set the Bridge parameter values using JQuery
		var parameters = {};
		$.each(configObj.bridgeConfig.parameters, function(i,v){
			parameters[i]=$(configObj.bridgeConfig.parameters[i]).val();
		});
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector();
		//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
		var tableId = this.tableId;
			connector.search(configObj.bridgeConfig.model, configObj.bridgeConfig.qualification_mapping, {
				parameters: parameters,
				attributes: configObj.bridgeConfig.attributes,
				//TODO: Move Success into object configuration????  Does it make sense?
				success: function(response) {
					configObj.dataArray = [];
					//Retrieve Records
					configObj.records=response.records;
					if(configObj.records.length > 0 && configObj.records != null){	
						//Iterate through row results to retrieve data
						$.each(configObj.records, function(i,record){
							var obj = {};
							//Iterate through the configured columns to match with data returned from bridge
							$.each(configObj.columns, function( j, v ){
								var objKey = v["data"];
								if (typeof record.attributes[objKey] != "undefined"){
									var objVal = record.attributes[objKey];
								}
								else{
									var objVal = '';
								}
								obj[objKey] = objVal;
							});
							configObj.dataArray.push(obj);
						});
						//If DataTable not initialized, initialize it and add rows.	
						if(!$.fn.DataTable.fnIsDataTable($('#'+configObj.tableId)[0])){
							configObj.tableObj = $('#'+configObj.tableId).DataTable( configObj );
							configObj.tableObj.rows.add(configObj.dataArray).draw();
						}
						// Else DataTable already initialized.  Clear table and add new rows.
						else{
							configObj.tableObj.clear().rows.add(configObj.dataArray).draw();
						}
						//Set the name data attribute to the name of the search.searchConfig Obj
						var name = filtersearchConfigByName(configObj);
						$('#'+configObj.tableId).data('name',name);
						configObj.loadedcallback();
					}
					else{
						configObj.noResults();
					}
				},
			}); 
		configObj.done();			
	}

	function performBridgeRequestSingle(){
		var configObj = this;
		configObj.before();
		//Retrieve and set the Bridge parameter values using JQuery
		var parameters = {};
		$.each(configObj.bridgeConfig.parameters, function(i,v){
			parameters[i]=$(configObj.bridgeConfig.parameters[i]).val();
		});
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector();
		//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
		var tableId = this.tableId;
			connector.retrieve(configObj.bridgeConfig.model, configObj.bridgeConfig.qualification_mapping, {
				//parameters: parameters,
				parameters: configObj.bridgeConfig.parameters,
				attributes: configObj.bridgeConfig.attributes,
				//TODO: Move Success into object configuration????  Does it make sense?
				success: function(response) {
					configObj.dataArray = [];
					var obj = {};
					//Iterate through the configured columns to match with data returned from bridge
					$.each(configObj.columns, function( j, v ){
						var objKey = v["data"];
						if (typeof response.attributes[objKey] != "undefined"){
							var objVal = response.attributes[objKey];
							KD.utils.Action.setQuestionValue(v["setQstn"],objVal);

						}
						else{
							var objVal = '';
						}
						obj[objKey] = objVal;
					});
					configObj.dataArray.push(obj);
					configObj.loadedcallback();		
				},
			});
	configObj.done();
	}

	// Used to execute objects configured as defaultBridgeList
	function performBridgeRequestList(){
		var configObj = this;
		configObj.before();
		//Retrieve and set the Bridge parameter values using JQuery
		var parameters = {};
		$.each(configObj.bridgeConfig.parameters, function(i,v){
			parameters[i]=$(configObj.bridgeConfig.parameters[i]).val();
		});
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector();
		connector.search(configObj.bridgeConfig.model, configObj.bridgeConfig.qualification_mapping, {
			parameters: parameters,
			attributes: configObj.bridgeConfig.attributes,
			success: function(response) {
					this.$resultsList = $("<ul id='resultList'>");
					var self = this; // reference to this in current scope
					//Retrieve Records
					configObj.records=response.records;
					if(configObj.records.length > 0 && configObj.records != null){	
					//Itterate through row results to retrieve data
					$.each(configObj.records, function(i,record){
						self.$singleResult = $("<li id='result'>");
						//Iterate through the configured columns to match with data returned from bridge
						$.each(configObj.columns, function( j, v ){
							var objKey = v["data"];
							if (typeof record.attributes[objKey] != "undefined"){
								var title ="";
								if(v["title"]){
									var $title = $('<div>', {class: "title " + v['className']}).html(v["title"]);
									self.$singleResult.append($title);
								}
								var $value = $('<div>', {class: v["className"]}).html(record.attributes[objKey]);
								self.$singleResult.append($value); 
								//self.$singleResult.append("<div>"+record.attributes[objKey]+"</div>").addClass(v["className"]);
								self.$singleResult.data(objKey,record.attributes[objKey])
							}
							else{
								self.$singleResult.append($('<div>'));
							}
						});
						self.$resultsList.append(self.$singleResult);
					});
					//Set the Data Attribute to the name of the seachConfig Obj
					var name = filtersearchConfigByName(configObj);	
					this.$resultsList.data('name',name);
					configObj.appendTo.empty().append(this.$resultsList).show("blind", "swing", 1000);		
					}	
					configObj.loadedcallback();
				},
			}); 
		configObj.done(self.$resultsDiv);
	}
	// Used to execute objects configured as defaultBridgeList
	function performDefaultContact(){
		var configObj = this;
		//Retrieve and set the Bridge parameter values using JQuery
		var parameters = {};
		$.each(configObj.bridgeConfig.parameters, function(i,v){
			parameters[i]=$(configObj.bridgeConfig.parameters[i]).val();
		});
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector();
		connector.search(configObj.bridgeConfig.model, configObj.bridgeConfig.qualification_mapping, {
			parameters: parameters,
			attributes: configObj.bridgeConfig.attributes,
			success: function(response) {
					this.$resultsList = $("<ul id='resultList'>");
					var self = this; // reference to this in current scope
					//Retrieve Records
					configObj.records=response.records;
					if(configObj.records.length > 0 && configObj.records != null){	
						//Itterate through row results to retrieve data
						$.each(configObj.records, function(i,record){
							self.$singleResult = $("<li id='result'>");
							//Iterate through the configured columns to match with data returned from bridge
							$.each(configObj.columns, function( j, v ){
								var objKey = v["data"];
								if (typeof record.attributes[objKey] != "undefined"){
									self.$singleResult.append("<div>"+record.attributes[objKey]+"</div>");
								}
								else{
									self.$singleResult.append("<div></div>");
								}
							});
							self.$resultsList.append(self.$singleResult);
						});
						$('#results').empty().append(self.$resultsList);
						configObj.loadedCallback(self.$resultsDiv);
					}
				else{
					configObj.noResults();
				}
			},
			}); 
		configObj.done(self.$resultsDiv);
	}
	function performSDR(configObj, SDRId, params){
		//	Define a callback that will call the custom populateUserTable function on success, or alert on failure. 
		var connection=new KD.utils.Callback(function(response){
			configObj.dataArray = [];
			//Retrieve Records
			configObj.records=KD.utils.Action.getMultipleRequestRecords(response);
			if(configObj.records.length > 0 && configObj.records != null){	
				//Loop through row results to retrieve data
				$.each(configObj.records, function(i,record){
					var obj = {};
					$.each(configObj.columns, function( j, v ){
						var objKey = v["data"];
						var objVal = $(record).find("[id='"+objKey+"']").text() ;
						obj[objKey] = objVal;
					});
					configObj.dataArray.push(obj);
				});
					
				if(!$.fn.DataTable.fnIsDataTable($('#'+configObj.tableId)[0])){
					alert('DataTable not initialized');
				}
				else{
					configObj.tableObj.clear().rows.add(configObj.dataArray).draw();
					
				}
				configObj.done();
			}
			else{
				configObj.noResults();
			}
		},alert); 
		
		//	Make an Asynchronous SDR request. */
		KD.utils.Action.makeAsyncRequest('Get Users', SDRId, connection, params, '', false);
	}

	function ucFirst(str) {
		var firstLetter = str.substr(0, 1);
		return firstLetter.toUpperCase() + str.substr(1);
	} 
	//Returns name of searchConfig Object
	this.filtersearchConfigByName = function(obj) {
		var configName;
		$.each(search.searchConfig, function(i, config){
			if(config==obj){
			   configName=i;
			   return false;
			}
		}); 
		return configName;
	}
							
	// Set to first time
	var firstToggleClick = true;
	this.togglePanel = function(configObj){
			var contentSlide = $('div.content-slide');
			// Turn off any previous one events to prevent stacking
			contentSlide.off('click');
			$(window).off('resize');
			// First click of the button?
			if(firstToggleClick) {
				firstToggleClick = false;
				// Update scroll top information
				previousScrollTop = $(window).scrollTop();
				currentScrollTop = '-' + $(window).scrollTop() + 'px';
				$(':focus').blur();
				$('#'+configObj.tableId).parents('div.dataTables_wrapper').first().show();
				// Disable click events on content wrap
				$(contentSlide).find('div.pointer-events').css({'pointer-events':'none'});
				$(contentSlide).find('header.main, header.sub').css({'left': '100%'});
				$(contentSlide).css({'position':'fixed', /*'min-width':'480px',*/ 'top': previousScrollTop, 'bottom':'0', 'right':'0'});
				/*Append left !important.  Necessary becuase jQuery CSS doesn't all it to be added. */
				$(contentSlide).attr('style',$(contentSlide).attr('style')+'left: 100% !important' );
				configObj.appendTo.show();
				// Set the scroll top again for navigation slide. This will not affect content wrap since it's position is now fixed.
				$(window).scrollTop(0);
				// Create one reset display event on content slide
				contentSlide.one('click', function(event) {
					event.preventDefault();
					event.stopImmediatePropagation();
					firstToggleClick = true;
					BUNDLE.common.resetDisplay(this, configObj.appendTo, previousScrollTop); 
					$('#'+configObj.tableId).parents('div.dataTables_wrapper').first().hide();
				});
			} else {
				firstToggleClick = true;
				BUNDLE.common.resetDisplay(contentSlide, configObj.appendTo, previousScrollTop);  
				$('#'+configObj.tableId).parents('div.dataTables_wrapper').first().hide();
			}
		
	}
})(jQuery);