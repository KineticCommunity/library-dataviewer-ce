

$(document).ready(function() {
	/***************** CONFIGURE: the Fields to be used in the table *****************
	//This Array of objects defines searching and behavior for Simple Data Requests (SDRs).
	//Each Object in the array defines a search and its behavior and must be created with a
	//configuration that works with a simple data request.
	/*********************************************************************************/
	var tableDefaults = {
		initiateSearch: function (SRID){defaultSearch(this, SRID)},
		rowclick: function (){defaultRowCallback(this);},
		paging: true,
		info: true,
		searching: true,
		responsive: true,
		//records: {},  //Set in the core code with values from SDR
	};
	peopleTables = {
		//Configuration of Search for Gov't Sponsor.  Initiated by event on "ARS Search Govt Sponsor"
		sponsorTableConfig: {
			//Where to append the table
			appendTableTo: $('body'),
			//ID to give the table when creating it.
			tableId: 'sponsorTable',
			//After the Table has been created.
			afterInit: function(){ //completeCallback
				$('#sponsorTable').wrap('<div id="dialog" title="Basic dialog"><div id="userTable" style="width:99%;"></div><div style="clear:both;"></div></div>');  //use appends
				$( "#dialog" ).dialog( {
					"autoOpen": false,
					"width": "auto",
					buttons: [
						{
						  text: "Cancel",
						  click: function() {
							$( this ).dialog( "close" );
						  }
						}
					]
				} );
			},
			/*Configure the data to be displayed in the table and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'First Name', "title":"FIRST", "setQstn":"Govt Sponsor First Name" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"Govt Sponsor Last Name" },
				{ data: 'Email', "title":"EMAIL", "setQstn":"Govt Sponsor UserID" },
				{ data: 'Phone Number', "title":"PHONE" },
				{ data: 'Site', "title":"SITE" },
				{ data: 'Email', "visible": false, "setQstn":"Govt Sponsor Email"}
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
		approverTableConfig: {
			rowclick: function(){
				alert('test');
				defaultRowCallback(this);
			},
			appendTableTo: $('body'),
			tableId: 'approverTable',
			afterInit: function(){
				$('#approverTable').wrap('<div id="sponsor_dialog" title="Basic dialog"><div id="userTable" style="width:99%;"></div><div style="clear:both;"></div></div>');
				$( "#sponsor_dialog" ).dialog( {
					"autoOpen": false,
					"width": "auto",
					buttons: [
						{
						  text: "Cancel",
						  click: function() {
							$( this ).dialog( "close" );
						  }
						}
					]
				} );
			},
			columns: [
				{ data: 'First Name', "title":"FIRST", "setQstn":"SPAWAR Approver First" },
				{ data: 'Last Name', "title":"LAST", "setQstn":"SPAWAR Approver Last" },
				{ data: 'Email', "title":"EMAIL", "setQstn":"SPAWAR Approver UserID" },
				{ data: 'Phone Number', "title":"PHONE" },
				{ data: 'Site', "title":"SITE" },
				{ data: 'Email', "visible": false, "setQstn":"SPAWAR Approver Email"}
			],
			params: {
				lname: function() {
					return  ucFirst(KD.utils.Action.getQuestionValue('SPAWAR Approver'));
				},
				status: "Active"
			},
			done: function (){
				KD.utils.Action.setQuestionValue('Search By Last Name','');	
				$( "#sponsor_dialog" ).dialog("open");
			},
			noResults: function(){
				alert("No results Found")
			}
		}
	}

	$.each(peopleTables, function(i, config){
		//config = $.extend( true, tableDefaults, config );
		peopleTables[i]=$.extend( {}, tableDefaults, peopleTables[i] );
		$table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',peopleTables[i].tableId);
		peopleTables[i].appendTableTo.append($table);
		peopleTables[i].afterInit();
		peopleTables[i].tableObj = $('#'+peopleTables[i].tableId).DataTable( peopleTables[i] );
		//peopleTables[i].rowclick();
		peopleTables[i].tableObj.on( 'click', 'tr', peopleTables[i].rowclick);
		});
	
	/*
	for(var i=0;i<arrayOfTable.length; i++){
		//arrayOfTable[i] = $.extend( true, tableDefaults, arrayOfTable[i] );
		arrayOfTable[i] = $.extend( {}, tableDefaults, arrayOfTable[i] );
		var $table =($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'display'})).attr('id',arrayOfTable[i].tableId);
		arrayOfTable[i].appendTableTo.append($table);
		arrayOfTable[i].afterInit();
		arrayOfTable[i].tableObj = $('#'+arrayOfTable[i].tableId).DataTable( arrayOfTable[i] );
	}
	*/

} );

/*
function defaultRowCallback() { //rowCallback
	var table = this;
	table.tableObj.on( 'click', 'tr', function () { 
		var selectedRow = table.tableObj.row( this ).index();
		$.each(table.columns, function( j, v){
			if(v["setQstn"]!="" && typeof v["setQstn"] != "undefined"){
				KD.utils.Action.setQuestionValue(v["setQstn"],table.tableObj.row( selectedRow ).data()[v["data"]]);
			}
		});
		$(".ui-dialog-content").dialog("close");
	});
}
*/

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