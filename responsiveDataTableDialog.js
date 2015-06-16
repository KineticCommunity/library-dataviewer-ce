

$(document).ready(function() {
	//Append Slide Panel Dive
	$( ".content-slide" ).after( "<div id='slide-panel'></div>" );
	
	//Bind Events to Search Elements
	$('#name_search input').keypress(function(e) {
    if(e.which == 13) {
        $(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		executeTable("requestedForTableConfig");
    }
	});
	$('#name_search a').click(function(e) {
        $(this).find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		executeTable("requestedForTableConfig");
	});


	$('#contact_search input').keypress(function(e) {
    if(e.which == 13) {
        $(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		executeTable("contactTableConfig");
    }
	});
	$('#contact_search a').click(function(e) {
        $(this).find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		executeTable("contactTableConfig");
	});
	
	//Bind events for contact Search
	$( ".search-container .search" ).on("click", function(){
		if($(this).hasClass('inactive')){
					$(this).parent().find('.search').toggleClass('inactive');
		}
		if(!$(this).hasClass('someoneelse')){
			$('.someoneelse input').val('');
		}
	})

	$('.contact .someoneelse input').keypress(function(e) {
		if(e.which == 13) {
			//$(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
			executeTable("contactTableConfig");
		}
	});
	$('#list-contact .someoneelse input').keypress(function(e) {
		if(e.which == 13) {
			//$(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
			executeTable("listContact");
		}
	});
	
	//Define defaults for the Table config.  Reduces need to include all properties.  Each table config my overide these values by 
	//including a value of its own.
	var defaultsBridgeDataTable = {
		execute: performBridgeRequest,
		initiateSearch: function (SRID){defaultSearch(this, SRID)},
		//rowclick: function (){defaultRowCallback(this);},
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
		execute: performBridgeSingleRequest,
	};
	
	// Define Table objects or list Object
	// TODO:Possibly separate Tables from List is separate JS or config
	peopleTables = [
		{
			//Reference name for the configuration
			name: "requestedForTableConfig",
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By First Name or Last Name or Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '#name_search input','First Name': '#name_search input','Last Name': '#name_search input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			//Where to append the table
			appendTo: $('#slide-panel'),
			//ID to give the table when creating it.
			tableId: 'requestedForTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			// After Table Load
			loadedcallback: function(){
				togglePanel(this);
			},
			//Bind a click event to tr, td, etc.
			clickCallback: function(){
				$('table').on( "click", 'tr td.select.requestedForTableConfig', {value:this}, function(event){
				//$('table').on( "click", 'tr td.select.requestedForTableConfig', function(){
				//$('table').data('name', this.name).on( "click", 'tr td:first-child', {value:test}, function(event){
				//$('table').on("click", '[data-name='+this.name+'] tr td:first-child', function(){
				//$('document').on("click", '[data-name="requestedForTableConfig"] tr', function(){
				//$('table[data-name]').on('click','tr',function(){
					defaultRowCallback(this);
					$('input#name_search').val(KD.utils.Action.getQuestionValue('ReqFor_First Name')+ ' ' + KD.utils.Action.getQuestionValue('ReqFor_Last Name'));
					$('#name_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');
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
			],
			//Define action to take place after SDR is complete.
			done: function (){
				KD.utils.Action.setQuestionValue('Search By Last Name','');	
				$( "#dialog" ).dialog("open");
			},
			//TODO: Not sure if this is currently leveraged
			noResults: function(){
				alert("No results Found")
			}
		},
		{
			//Reference name for the configuration
			name: "contactTableConfig",
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By First Name or Last Name or Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '.someoneelse input','First Name': '.someoneelse input','Last Name': '.someoneelse input'},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name"],
			},
			//Where to append the table
			appendTo: $('#slide-panel'),
			//ID to give the table when creating it.
			tableId: 'contactTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			// After Table Load
			loadedcallback: function(){
				togglePanel(this);
			},
			//Bind a click event to tr, td, etc.
			clickCallback: function(){
				$('table').on( "click", 'tr td.select.contactTableConfig', {value:this}, function(event){
				//$('table').on( "click", 'tr td.select.contactTableConfig', function(){
				//$('table').data('name', this.name).on( "click", 'tr td:first-child', {value:test}, function(event){
				//$('table').data('name', this.name).on( "click", 'tr td:first-child', function(){
				//$('table').on("click", '[data-name='+this.name+'] tr td:first-child', function(){
				//$('document').on("click", '[data-name="contactTableConfig"]', function(){
				//$('table[data-name]').on('click','tr',function(){
					defaultRowCallback(this);
					$('input#contact_search').val(KD.utils.Action.getQuestionValue('Contact_First Name')+ ' ' + KD.utils.Action.getQuestionValue('Contact_Last Name'));
					$('#contact_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');
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

			],
			//Define action to take place after Search is complete.
			done: function (){

			},
			//TODO: Not sure if this is currently leveraged
			noResults: function(){
				alert("No results Found")
			}
		},
		{
			//Reference name for the configuration
			name: "defaultContactTableConfig",
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeGetSingle",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Login Id",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Login ID': ''},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
			},
			//Where to append the table
			appendTo: '',
			//ID to give the table when creating it.
			tableId: 'defalultContactTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			// After Table Load
			loadedcallback: '',/*function(){
				togglePanel(this);
			},*/
			//Bind a click event to tr, td, etc.
			clickCallback: function(){
				$('table').on( "click", 'tr td.select.contactTableConfig', {value:this}, function(event){
					$('.someoneelse input').val(KD.utils.Action.getQuestionValue('Contact_First Name')+ ' ' + KD.utils.Action.getQuestionValue('Contact_Last Name'));
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
				{ data: 'First Name', "setQstn":"Contact_First Name"},
				{ data: 'Last Name', "setQstn":"Contact_Last Name"},

			],
			//Define action to take place after Search is complete.
			done: function (){

			},
			//TODO: Not sure if this is currently leveraged
			noResults: function(){
				alert("No results Found")
			}
		},
		{
			name: "listContact",
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
			loadedcallback: function(){

			},
			clickCallback: function(){
				this.appendTo.on( "click", 'li', {value:this}, function(event){
					defaultListCallback(this);
					$('#list-contact input').val(KD.utils.Action.getQuestionValue('List Contact First Name')+ ' ' + KD.utils.Action.getQuestionValue('List Contact Last Name'));
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
		}
	]
	//Initialize the configurations
	$.each(peopleTables, function(i, config){
		if(config.type=="BridgeDataTable"){
			peopleTables[i]=$.extend( {}, defaultsBridgeDataTable, config );
			//config=$.extend( {}, defaultsBridgeDataTable, config );
//			$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId).data('name',config.name);
			//$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId);
			//peopleTables[i].appendTo.append($table);
			$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId);
			peopleTables[i].appendTo.append($table);
/*			if(!$.fn.DataTable.fnIsDataTable($('#'+peopleTables[i].tableId)[0])){
				$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId);
				peopleTables[i].appendTo.append($table);
				peopleTables[i].tableObj = $('#'+peopleTables[i].tableId).DataTable( peopleTables[i] );
			}
			else{
				peopleTables[i].tableObj = $('#'+peopleTables[i].tableId).DataTable()
			}
*/
			peopleTables[i].afterInit();
			peopleTables[i].clickCallback();
		}
		else if(config.type=="BridgeList"){
			peopleTables[i]=$.extend( {}, defaultsBridgeList, peopleTables[i] );
			peopleTables[i].appendTo.append("<div id='results'>").hide();
			peopleTables[i].afterInit();
			peopleTables[i].clickCallback();
		}
		else if(config.type=="BridgeGetSingle"){
			peopleTables[i]=$.extend( {}, defaultsBridgeGetSingle, peopleTables[i] );
			peopleTables[i].clickCallback();
		}
	});
} );

function defaultRowCallback(row){ //rowCallback
	var tableConfig = $(row).closest('table').data('name')
	var table = filterByTableName (peopleTables, tableConfig);
	var selectedRow = $(row).closest('tr');
	//Loop through columns configuration to set question values.
	$.each(table[0].columns, function( j, v){
		if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
			KD.utils.Action.setQuestionValue(v["setQstn"],table[0].tableObj.row(selectedRow).data()[v["data"]]);
		}
	});
}

function defaultListCallback(li){ //rowCallback
	var tableConfig = $(li).closest('ul').data('name');
	var table = filterByTableName (peopleTables, tableConfig);
	this.selectionData = $(li).data()
	var self = this; // reference to this in current scope
	//Loop through columns configuration to set question values.
	$.each(table[0].columns, function( j, v){
		if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
			KD.utils.Action.setQuestionValue(v["setQstn"],self.selectionData[v.data]);
		}
	});
	table[0].appendTo.hide("blind", "swing", 1000);
}
function defaultSearch(tableConfig, SDRId){  
	var params = buildParams(tableConfig);
	performSDR(tableConfig, SDRId, params);
}

function buildParams(tableConfig){
	tableConfig.fullParams = "";
	$.each(tableConfig.params, function( j, v ){
		if(typeof v == "function"){
		tableConfig.fullParams = tableConfig.fullParams+j+"="+this()+"&";
		}
		else{
		tableConfig.fullParams = tableConfig.fullParams+j+"="+v+"&";
		}
	});
	return tableConfig.fullParams;
}

// Used to execute objects configured as defaultBridgeDataTable
function performBridgeRequest(){
	var tableConfig = this;
	//Retrieve and set the Bridge parameter values using JQuery
	var parameters = {};
	$.each(tableConfig.bridgeConfig.parameters, function(i,v){
		parameters[i]=$(tableConfig.bridgeConfig.parameters[i]).val();
	});
	//create the connector necessary to connect to the bridge
	var connector = new KD.bridges.BridgeConnector();
	//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
	var tableId = this.tableId;
		connector.search(tableConfig.bridgeConfig.model, tableConfig.bridgeConfig.qualification_mapping, {
		parameters: parameters,
		attributes: tableConfig.bridgeConfig.attributes,
		//TODO: Move Success into object configuration????  Does it make sense?
		success: function(response) {
			tableConfig.dataArray = [];
			//Retrieve Records
			tableConfig.records=response.records;
			if(tableConfig.records.length > 0 && tableConfig.records != null){	
			//Itterate through row results to retrieve data
			$.each(tableConfig.records, function(i,record){
				var obj = {};
				//Itterate through the configured columns to match with data returned from bridge
				$.each(tableConfig.columns, function( j, v ){
					var objKey = v["data"];
					if (typeof record.attributes[objKey] != "undefined"){
						var objVal = record.attributes[objKey];
					}
					else{
						var objVal = '';
					}
					obj[objKey] = objVal;
				});
				tableConfig.dataArray.push(obj);
			});
				
			if(!$.fn.DataTable.fnIsDataTable($('#'+tableConfig.tableId)[0])){
				//alert('DataTable not initialized');
				tableConfig.tableObj = $('#'+tableConfig.tableId).DataTable( tableConfig );
				tableConfig.tableObj.rows.add(tableConfig.dataArray).draw();
			}
			else{
				tableConfig.tableObj.clear().rows.add(tableConfig.dataArray).draw();
			}
//			else{
				$.each(peopleTables, function(i, config){
					if(config==tableConfig){
					   $('#'+tableConfig.tableId).data('name',tableConfig.name);
					}
				})
				

//				}
//				tableConfig.tableObj.clear().rows.add(tableConfig.dataArray).draw();
				tableConfig.loadedcallback();
				tableConfig.appendTo.show();
				
//			}
			tableConfig.done();
		}
		else{
			tableConfig.noResults();
		}
			},
		}
	);      
}

function performBridgeSingleRequest(){
	var tableConfig = this;
	//Retrieve and set the Bridge parameter values using JQuery
	var parameters = {};
	$.each(tableConfig.bridgeConfig.parameters, function(i,v){
		parameters[i]=$(tableConfig.bridgeConfig.parameters[i]).val();
	});
	//create the connector necessary to connect to the bridge
	var connector = new KD.bridges.BridgeConnector();
	//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
	var tableId = this.tableId;
		connector.retrieve(tableConfig.bridgeConfig.model, tableConfig.bridgeConfig.qualification_mapping, {
		//parameters: parameters,
		parameters: tableConfig.bridgeConfig.parameters,
		attributes: tableConfig.bridgeConfig.attributes,
		//TODO: Move Success into object configuration????  Does it make sense?
		success: function(response) {
			tableConfig.dataArray = [];
				var obj = {};
				//Iterate through the configured columns to match with data returned from bridge
				$.each(tableConfig.columns, function( j, v ){
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
				tableConfig.dataArray.push(obj);

				tableConfig.loadedcallback();		
			tableConfig.done();
		},
		}
	);      
}

// Used to execute objects configured as defaultBridgeList
function performBridgeRequestList(){
	var tableConfig = this;
	//Retrieve and set the Bridge parameter values using JQuery
	var parameters = {};
	$.each(tableConfig.bridgeConfig.parameters, function(i,v){
		parameters[i]=$(tableConfig.bridgeConfig.parameters[i]).val();
	});
	//create the connector necessary to connect to the bridge
	var connector = new KD.bridges.BridgeConnector();
	connector.search(tableConfig.bridgeConfig.model, tableConfig.bridgeConfig.qualification_mapping, {
		parameters: parameters,
		attributes: tableConfig.bridgeConfig.attributes,
		success: function(response) {
				this.$resultsList = $("<ul id='resultList'>");
				var self = this; // reference to this in current scope
				//Retrieve Records
				tableConfig.records=response.records;
				if(tableConfig.records.length > 0 && tableConfig.records != null){	
				//Itterate through row results to retrieve data
				$.each(tableConfig.records, function(i,record){
					self.$singleResult = $("<li id='result'>");
					//Iterate through the configured columns to match with data returned from bridge
					$.each(tableConfig.columns, function( j, v ){
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
					
				this.$resultsList.data('name',tableConfig.name);
				tableConfig.appendTo.empty().append(this.$resultsList).show("blind", "swing", 1000);
				
				//$('body').append(self.$resultsDiv);
				tableConfig.done(self.$resultsDiv);
			}
			},
		}
	);      
}
// Used to execute objects configured as defaultBridgeList
function performDefaultContact(){
	var tableConfig = this;
	//Retrieve and set the Bridge parameter values using JQuery
	var parameters = {};
	$.each(tableConfig.bridgeConfig.parameters, function(i,v){
		parameters[i]=$(tableConfig.bridgeConfig.parameters[i]).val();
	});
	//create the connector necessary to connect to the bridge
	var connector = new KD.bridges.BridgeConnector();
	connector.search(tableConfig.bridgeConfig.model, tableConfig.bridgeConfig.qualification_mapping, {
		parameters: parameters,
		attributes: tableConfig.bridgeConfig.attributes,
		success: function(response) {
				this.$resultsList = $("<ul id='resultList'>");
				var self = this; // reference to this in current scope
				//Retrieve Records
				tableConfig.records=response.records;
				if(tableConfig.records.length > 0 && tableConfig.records != null){	
				//Itterate through row results to retrieve data
				$.each(tableConfig.records, function(i,record){
					self.$singleResult = $("<li id='result'>");
					//Iterate through the configured columns to match with data returned from bridge
					$.each(tableConfig.columns, function( j, v ){
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
					
				//$('#name_search input').append(self.$resultsDiv);
				$('#results').empty().append(self.$resultsList);
				
				//$('body').append(self.$resultsDiv);
				tableConfig.done(self.$resultsDiv);
			}
			},
		}
	);      
}
function performSDR(tableConfig, SDRId, params){
	//	Define a callback that will call the custom populateUserTable function on success, or alert on failure. 
	var connection=new KD.utils.Callback(function(response){
		tableConfig.dataArray = [];
		//Retrieve Records
		tableConfig.records=KD.utils.Action.getMultipleRequestRecords(response);
		if(tableConfig.records.length > 0 && tableConfig.records != null){	
			//Loop through row results to retrieve data
			$.each(tableConfig.records, function(i,record){
				var obj = {};
				$.each(tableConfig.columns, function( j, v ){
					var objKey = v["data"];
					var objVal = $(record).find("[id='"+objKey+"']").text() ;
					obj[objKey] = objVal;
				});
				tableConfig.dataArray.push(obj);
			});
				
			if(!$.fn.DataTable.fnIsDataTable($('#'+tableConfig.tableId)[0])){
				alert('DataTable not initialized');
			}
			else{
				tableConfig.tableObj.clear().rows.add(tableConfig.dataArray).draw();
				
			}
			tableConfig.done();
		}
		else{
			tableConfig.noResults();
		}
	},alert); 
	
	//	Make an Asynchronous SDR request. */
	KD.utils.Action.makeAsyncRequest('Get Users', SDRId, connection, params, '', false);
}

function ucFirst(str) {
	var firstLetter = str.substr(0, 1);
	return firstLetter.toUpperCase() + str.substr(1);
} 

function filterByTableName (obj, name) {
	return $.map(obj, function (item, key) { 
			if(item.name == name){
				return item;
			}
	});
};

function executeTable(name) {
	$.map(peopleTables, function (item, key) { 
			if(item.name == name){
				item.execute();
			}
	});
};

function togglePanel(tableConfig){
	var panel = $('#slide-panel');
	if(panel.hasClass('visible')){				//Hide Panel
		panel.removeClass('visible').animate({
		'right': '-100%'
		});
		$('#'+tableConfig.tableId).parents('div.dataTables_wrapper').first().hide();
	}
	else{										//Show Panel
		panel.addClass('visible').animate({
		'right': '0'
	});
	$('#'+tableConfig.tableId).parents('div.dataTables_wrapper').first().show();
	}
	
}
function toggleTable(tableConfig){
	if($('#'+tableConfig.tableId).parents('div.dataTables_wrapper').first().is(":visible")){	// Hide Table
		$('#'+tableConfig.tableId).parents('div.dataTables_wrapper').first().hide();
	}
	else{ 																						// Show Table
		$('#'+tableConfig.tableId).parents('div.dataTables_wrapper').first().show();

	}
	
}