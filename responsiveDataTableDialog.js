

$(document).ready(function() {
	$( ".content-slide" ).after( "<div id='slide-panel'></div>" );
	
	$('#name_search input').keypress(function(e) {
    if(e.which == 13) {
        $(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		performBridgeRequest(peopleTables.requestedForTableConfig);
    }
	});
	$('#name_search a').click(function(e) {
         $(this).find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');
		performBridgeRequest(peopleTables.requestedForTableConfig);
	});
	
	var timer;
	$('#name_search input').keyup(function() {
		if (timer) {
			clearTimeout(timer);
		}
		//timer = setTimeout("alert($('#name_search input').val());", 500);
		timer = setTimeout("performBridgeRequestList(peopleTables.requestedForTableConfig2);", 500);
			//performBridgeRequest2(peopleTables.requestedForTableConfig);
		//	$(this).siblings().find('i').removeClass('fa-search').addClass('fa-spinner fa-pulse');

	});


$('#Search').keypress(function () { 
    
});
	/***************** CONFIGURE: the Fields to be used in the table *****************
	//This Array of objects defines searching and behavior for Simple Data Requests (SDRs).
	//Each Object in the array defines a search and its behavior and must be created with a
	//configuration that works with a simple data request.
	/*********************************************************************************/
	var tableDefaults = {
		initiateSearch: function (SRID){defaultSearch(this, SRID)},
		//rowclick: function (){defaultRowCallback(this);},
		paging: true,
		info: true,
		searching: true,
		//responsive: true,
		responsive: {
			details: {
				type: 'column',
				//target: $('.dataTable tbody td').not('.select'),
				//target: '.all',
				target: '.control, .control-additional'
			}
		},
	};
	var listDefaults = {

	};
	
	peopleTables = {
		requestedForTableConfig: {
			type: "DataTable",
			//Where to append the table
			appendTo: $('#slide-panel'),
			//ID to give the table when creating it.
			tableId: 'requestedForTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			loadedcallback: function(){
				var panel = $('#slide-panel');
				//if (!panel.hasClass("visible")) {
					panel.addClass('visible').animate({
						'right': '0'
					});
				//}
				//KD.utils.Action.insertElement('RequestedForTable');
				$('#'+this.tableId + ' tr td:first-child').on('click',function(){
					defaultRowCallback(this);
					$('input#name_search').val(KD.utils.Action.getQuestionValue('ReqFor_First Name')+ ' ' + KD.utils.Action.getQuestionValue('ReqFor_Last Name'));
					//KD.utils.Action.removeElement('RequestedForTable');
					$('#name_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');
					var panel = $('#slide-panel');
					//if (panel.hasClass("visible")) {
						panel.removeClass('visible').animate({
							'right': '-100%'
						});
					//} 
				});
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'select', "title":"SELECT",	orderable: false, width: 60,			className: "select" },
				{ data: 'First Name', "title":"FIRST", "setQstn":"ReqFor_First Name",		className: "control" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"ReqFor_Last Name",			className: "min-phone-l control-additional" },
				{ data: 'Email', "title":"EMAIL", "setQstn":"ReqFor_Email",					className: "min-tablet control-additional" },
				{ data: 'Login Id', "title":"LOGIN ID", "setQstn":"ReqFor_Login ID",		className: "none " },
				{ data: 'Work Phone Number', "title":"PHONE #", "setQstn":"ReqFor_Phone",	className: "none" },
			],
			//Params to be created and passed to the Simple Data Request (SDR).  SDR may be created to accept parameters
			//which can be passed into the query. Passed into SDR as: "lname=Bob&Status=Active" 
			params: {
				lname: function() {
					return  ucFirst(KD.utils.Action.getQuestionValue('Search By Last Name'));
				},
				status: "Active"
			},
			//Define action to take place after SDR is complete.
			done: function (){
				KD.utils.Action.setQuestionValue('Search By Last Name','');	
				$( "#dialog" ).dialog("open");
			},
			noResults: function(){
				alert("No results Found")
			}
		},
		requestedForTableConfig2: {
			type: "List",
			bridgeConfig:{
				model: "Person",
				qualification_mapping: "By Full Name",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Full Name': '#name_search input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
					},
			//Where to append the table
			appendTo: $('#DYNAMIC_TEXT_KSHAA5V0HJEMVANOR2RUDKJ9A318PZ'),
			//ID to give the table when creating it.
			tableId: 'requestedForTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				
			},
			loadedcallback: function(){

			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'select', "title":"SELECT",	orderable: false, width: 60,			className: "select" },
				{ data: 'First Name', "title":"FIRST", "setQstn":"ReqFor_First Name",		className: "control" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"ReqFor_Last Name",			className: "min-phone-l control-additional" },
				{ data: 'Email', "title":"EMAIL", "setQstn":"ReqFor_Email",					className: "min-tablet control-additional" },
				{ data: 'Login Id', "title":"LOGIN ID", "setQstn":"ReqFor_Login ID",		className: "none " },
				{ data: 'Work Phone Number', "title":"PHONE #", "setQstn":"ReqFor_Phone",	className: "none" },
			],
			
			//Define action to take place after SDR is complete.
			done: function (){
				
			},
			noResults: function(){
				alert("No results Found")
			}
		}
	}

	$.each(peopleTables, function(i, config){
		if(config.type=="DataTable"){
			config=$.extend( {}, tableDefaults, config );
			$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',config.tableId);
			config.appendTo.append($table);
			//config.afterInit();
			peopleTables[i].tableObj = $('#'+config.tableId).DataTable( config );
			config.afterInit();
		}
		else if(config.type=="List"){
			config=$.extend( {}, listDefaults, config );
			config.appendTo.append("<div id='results'>");
			config.afterInit();
		}
		/* Legacy code - Save for a bit longer
		peopleTables[i]=$.extend( {}, tableDefaults, peopleTables[i] );
		$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',peopleTables[i].tableId);
		peopleTables[i].appendTo.append($table);
		//peopleTables[i].afterInit();
		peopleTables[i].tableObj = $('#'+peopleTables[i].tableId).DataTable( peopleTables[i] );
		peopleTables[i].afterInit();
		
		//peopleTables[i].rowclick();
		//peopleTables[i].tableObj.on( 'click', 'tr', peopleTables[i].rowclick);
		//peopleTables[i].tableObj.on( 'click', peopleTables[i].rowclick);
		*/
		});
} );

function defaultRowCallback(row){ //rowCallback
	var id = $(row).closest('table').attr('id');
	selectedRow = $(row).closest('tr');
	table = filterByTableId (peopleTables, id);
	
	$.each(table[0].columns, function( j, v){
		if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
			KD.utils.Action.setQuestionValue(v["setQstn"],table[0].tableObj.row(selectedRow).data()[v["data"]]);
			//                                      $('#'+table[0].tableId).DataTable().row($(row).closest('tr')).data()
		}
	});
	$(".ui-dialog-content").dialog("close");
}
/* Previous Version of Default Row callback
function defaultRowCallback(row){ //rowCallback
	var id = $(row).closest('table').attr('id');
	var selectedRow = $(row).index();
	table = filterByTableId (peopleTables, id);
	
	$.each(table[0].columns, function( j, v){
		if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
			KD.utils.Action.setQuestionValue(v["setQstn"],table[0].tableObj.row( row ).data()[v["data"]]);
		}
	});
	$(".ui-dialog-content").dialog("close");
}
*/
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

function performBridgeRequest(tableConfig){
	//create the connector necessary to connect to the bridge
	var connector = new KD.bridges.BridgeConnector();
	//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
	var tableId = peopleTables.requestedForTableConfig.tableId;
	//CONFIGURE: Define Bridge and Model/qualification to use
	connector.search('Person', 'By First or Last Name', {
		//CONFIGURE: Bridge Parameters
		parameters: {'Last Name': $('#name_search input').val(),'First Name': $('#name_search input').val()},
		//CONFIGURE: Bridge Attributes to be returned
		attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
		//CONFIGURE: Function to process results after search
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
				alert('DataTable not initialized');
			}
			else{
				tableConfig.tableObj.clear().rows.add(tableConfig.dataArray).draw();
				tableConfig.loadedcallback();
				tableConfig.appendTo.show();
				
			}
			tableConfig.done();
		}
		else{
			tableConfig.noResults();
		}
			},
		}
	);      
}
function performBridgeRequestList(tableConfig){
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

function filterByTableId (obj, id) {
	return $.map(obj, function (item, key) { 
			if(item.tableId == id){
				return item;
			}
	});
};