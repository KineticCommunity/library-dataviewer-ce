
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

	// Define Table objects or list Object and initialize them.
	KD.search.initialize({
		requestedForTableConfig:{
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person - Remote System",
				qualification_mapping: "By Name - Vague Search",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Name': '#requested_for input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login","Phone"],
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
				{ data: 'Login', "title":"LOGIN ID", "setQstn":"ReqFor_Login ID",		className: "none " },
				{ data: 'Phone', "title":"PHONE #", "setQstn":"ReqFor_Phone",	className: "none" },
			]
		},
		contactTableConfig:{
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeDataTable",
			bridgeConfig:{
				model: "Person - Remote System",
				qualification_mapping: "By Name - Vague Search",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Name': '#contact input'},
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
				model: "Person - Remote System",
				qualification_mapping: "By Login",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.				
				parameters: {'Login': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login","Phone"],
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
			/*Configure the data to be returned by the Bridge and where to populate the data.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'First Name', "setQstn":"ReqFor_First Name"},
				{ data: 'Last Name', "setQstn":"ReqFor_Last Name"},
				{ data: 'Email', "setQstn":"ReqFor_Email"},
				{ data: 'Login', "setQstn":"ReqFor_Login ID"},
				{ data: 'Phone', "setQstn":"ReqFor_Phone"}
			]
		},
		defaultContact:{
			//define if this should be run at time of initialization
			runAtInitialization: true,
			//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
			type: "BridgeGetSingle",
			bridgeConfig:{
				model: "Person - Remote System",
				qualification_mapping: "By Login",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.
				parameters: {'Login': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login","Phone"],
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
			/*Configure the data to be returned by the Bridge and where to populate the data.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'First Name', "setQstn":"Contact_First Name"},
				{ data: 'Last Name', "setQstn":"Contact_Last Name"},

			]
		},
		listContact:{
			type: "BridgeList",
			bridgeConfig:{
				model: "Person - Remote System",
				qualification_mapping: "By Name - Vague Search",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				parameters: {'Name': '#list-contact input'},
				//CONFIGURE: Bridge Attributes to be returned
				attributes: ["First Name","Last Name","Email","Login","Phone"],
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
			/*Configure the data to be displayed in the list and set into Question Values
			//This is a modified object used by Datatables.net.  setQstn has been added to it.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//title: Display name used in the table header.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			//className:  CSS Class value to apply to element diplayed in list.
			*/
			columns: [
				{ data: 'First Name', 		"title":"FIRST", 	"setQstn":"List Contact First Name",		className: "control" },
				{ data: 'Last Name', 		"title":"LAST", 	"setQstn":"List Contact Last Name",			className: "min-phone-l control-additional" },
				{ data: 'Email', 			"title":"EMAIL", 	"setQstn":"List Contact Email",				className: "min-tablet control-additional" },
				{ data: 'Login', 							"setQstn":"List Contact Login ID",			className: "none " },
				{ data: 'Phone',  					"setQstn":"List Contact Phone",				className: "none" },
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
				model: "Person - Remote System",
				qualification_mapping: "By Login",
				//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
				//Currently set by js before execution.
				parameters: {'Login': clientManager.userName},
				//CONFIGURE: Bridge Attributes to be returned
				//TODO: can the column configuration be leveraged to retrieve attributes?
				attributes: ["First Name","Last Name","Email","Login","Phone"],
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
			/*Configure the data to be returned by the Bridge and where to populate the data.
			//columns: Array of Objects.
			//data: Must match the data returned by the Simple Data Request.
			//setQstn: Question Element to be set with the selected value. (Only when defaultRowCallback is used)
			*/
			columns: [
				{ data: 'First Name', "setQstn":"List Contact First Name"},
				{ data: 'Last Name', "setQstn":"List Contact Last Name"},

			]
		}
	});
}
