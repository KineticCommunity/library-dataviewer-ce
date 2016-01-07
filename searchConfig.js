//Function to toggle unclickable elements and spinning search icon
//Used in several callbacks of searchConfig Objects
function toggleUnclickable(o){
	$(o).children().find('.searching').toggle();
	$(o).toggleClass('unclickable');
	$(o).find('input').prop('disabled', function(i, v) { return !v; });
}
	
function loadSearch() {
KD.search.executeSearch(searchConfig.defaultRequestedFor);
KD.search.executeSearch(searchConfig.defaultContact);

}

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
		searchConfigObj = searchConfig[$(this).closest('.search-btn').data('searchconfig')];
		KD.search.executeSearch(searchConfigObj);
	}
});
//Click on search icon (Not clickable if 'unclickable' class is set in before function.)
$(document).on('click', '.search-container:not(.unclickable) .fa-search', function(){
	searchConfigObj = searchConfig[$(this).closest('.search-btn').data('searchconfig')];
	KD.search.executeSearch(searchConfigObj);
});
//Click on Myself (Not clickable if 'unclickable' class is set in before function.)
$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active).myself', function(){
	searchConfigObj = searchConfig[$(this).closest('.search-btn').data('searchconfig')];
	KD.search.executeSearch(searchConfigObj);
});

test = {
data: {
	"First Name":{
		setQstn:"Contact_First Name",
		title:"WHO",
	},
	"Work Phone Number":{
		title:"PHONE",
		className: "min-tablet control-additional",
		setQstn:"ReqFor_Phone"
	}
},
}

//Bind events to toggle active class to disable elements while search is performing.
//Also clears out values when a either myself or someone else is clicked
//Only buttons which do not have the active or unclickable class applied.
//Event is bound to all search buttons
$(document).on('click', '.search-container:not(.unclickable) .search-btn:not(.active)', function(){
	$(this).parent().find('.search-btn').toggleClass(function() {
		var searchBtn = $(this).closest('.search-btn');
		// if the searchconfig data attribute is set on the element and the button is currently active.
/*			if(searchBtn.data('searchconfig') && searchBtn.hasClass('active')){
			//Loop through each of question elements configured in the column obj and clear it to prep for new values
			$.each(KD.search.searchConfig[searchBtn.data('searchconfig')].data, function(attribute, attributeObject){
				if(attributeObject.setQstn){
					KD.utils.Action.setQuestionValue(attributeObject.setQstn, "");
				}
			})
		}
*/
		return "active";
	});
	if(!$(this).hasClass('someoneelse')){
		$('.someoneelse input').val('');
	}
})



/**
 * Toggle Panel used to display results
 * Currently only works with Responsive Bundle
 */
togglePanel = function(configObj){
		var contentSlide = $('div.content-slide');
		// Turn off any previous one events to prevent stacking
		contentSlide.off('click');
		$(window).off('resize');
		// First click of the button or not defined
		if(typeof(search.firstToggleClick) == 'undefined' || search.firstToggleClick) {
			search.firstToggleClick = false;
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
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				event.stopImmediatePropagation();
				search.firstToggleClick = true;
				BUNDLE.common.resetDisplay(this, configObj.appendTo, previousScrollTop); 
				$('#'+configObj.tableId).parents('div.dataTables_wrapper').first().hide();
			});
		} else {
			search.firstToggleClick = true;
			BUNDLE.common.resetDisplay(contentSlide, configObj.appendTo, previousScrollTop);  
			$('#'+configObj.tableId).parents('div.dataTables_wrapper').first().hide();
		}
	
}

// Define Table objects or list Object and initialize them.
searchConfig ={
	requestedForTableConfig:{
		//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
		type: "BridgeDataTable",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By First Name or Last Name or Full Name",
			//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
			parameters: {'Full Name': '#requested_for input','First Name': '#requested_for input','Last Name': '#requested_for input'},
		},
		processSingleResult: true,
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"First Name":{
				title:"FIRST",
				className: "control",
				setQstn:"ReqFor_First Name",
			},
			"Last Name":{
				title:"Last",
				className: "min-phone-l control-additional",
				callback:function(value){
					console.log(value);
				},
				setQstn:"ReqFor_Last Name"
			},
			"Email":{
				title:"EMAIL",
				className: "min-tablet control-additional",
				setQstn:"ReqFor_Email"
			},
			"Login Id":{
				title:"EMAIL",
				className: "none",
				setQstn:"ReqFor_Login ID"
			},
			/*"Work Phone Number":{
				title:"PHONE",
				className: "none",
				setQstn:"ReqFor_Phone"
			}*/
		},
		//Where to append the table
		// appendTo: $('div.search-slide'), // Not recommended to use jQuery object as it may not exist when evaluated.
		// appendTo: 'div.search-slide',
		appendTo: function(){return $('div.search-slide');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		// table : '<table cellspacing="1", border="1", class="display test">',
		// table : function(){return ($('<table>', {'cellspacing':'0', 'border':'0', 'class': 'test2 display'})).attr('id',this.tableId);},
		//ID to give the table when creating it.
		tableId: 'requestedForTable',
		//After the Table has been created.
		afterInit: function(){ //completeCallback
			//Add select column to the table
			this.columns.unshift({ data: 'select', "title":"SELECT",	"defaultContent": "", orderable: false, width: 60,			className: "select" })
		},
		before: function(){ //before search
			toggleUnclickable($('#requested_for'));
		},
		// After Table Load
		loadedcallback: function(){
			togglePanel(this);
		},
		//Define action to take place after SDR is complete.
		success: function (){
			toggleUnclickable($('#requested_for'));
		},
		noResults: function(){
			alert("No results Found");
			toggleUnclickable($('#requested_for'));
		},
		// Executes on click of element with class of select
		clickCallback: function(results){
			$('#requested_for input').val(results["First Name"]+ ' ' + results["Last Name"]);
			togglePanel(this);
		},
		createdRow: function ( row, data, index ) {
			// Add select class to Row.  The class is used to trigger selection of row.
			$(row).addClass('select');
		},
		fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
			console.log(aaData);
		},
		dom: 'Bfrtip',
	},
	contactTableConfig:{
		type: "BridgeDataTable",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By First Name or Last Name or Full Name",
			parameters: {'Full Name': '#contact input','First Name': '#contact input','Last Name': '#contact input'},

		},
		data: {
			"First Name":{
				title:"FIRST",
				className: "control",
				setQstn:"Contact_First Name",
			},
			"Last Name":{
				title:"Last",
				className: "min-phone-l control-additional",
				callback:function(value){
					console.log(value);
				},
				setQstn:"Contact_Last Name"
			},
			"Email":{
				"title":"EMAIL",
				setQstn:"Contact_Email",
				className: "min-phone-l control-additional"
			},
			"Login Id":{
				"title":"ID",
				setQstn:"Contact_Login ID",
				className: "min-tablet control-additional"
			},
			"Work Phone Number":{
				"title":"PHONE",
				setQstn:"Contact_Phone",
				className: "min-tablet control-additional"
			}
		},
		appendTo: $('div.search-slide'),
		tableId: 'contactTable',
		afterInit: function(){ //completeCallback
			this.columns.unshift({ data: 'select', "title":"SELECT",	"defaultContent": "", orderable: false, width: 60,			className: "select" })
		},
		before: function(){ //before search
			toggleUnclickable($('#contact'));
		},
		loadedcallback: function(){
			togglePanel(this);
		},
		done: function (){
		},
		noResults: function(){
			alert("No results Found");
			toggleUnclickable($('#contact'));
		},
		clickCallback: function(results){
				$('#contact input').val(results["First Name"]+ ' ' + results["Last Name"]);
				$('#contact_search a').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-search');
				toggleUnclickable($('#contact'));
				togglePanel(this);
		},
		createdRow: function ( row, data, index ) {
			// Add select class to Row.  The class is used to trigger selection of row.
			$(row).addClass('select');
		},
	},
	defaultRequestedFor:{
		runAtInitialization: true,
		type: "BridgeGetSingle",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By Login Id",		
			// May be string or function
			//parameters: {'Login ID': clientManager.userName},
			parameters: {'Login ID': function(){return clientManager.userName;}},
		},
		data: {
			"First Name":{
				title:"FIRST",
				setQstn:"ReqFor_First Name",
			},
			"Last Name":{
				title:"LAST",
				setQstn:"ReqFor_Last Name",

			},
			"Email":{
				title:"EMAIL",
				setQstn:"ReqFor_Email",

			},
			"Login Id":{
				title:"ID",
				setQstn:"ReqFor_Login ID",

			},
			"Work Phone Number":{
				title:"PHONE",
				setQstn:"ReqFor_Phone",
			}
		},
		before: function(){
		},
		loadedcallback: function(){
		},
		done: function (){
		},
		noResults: function(){
			alert("No results Found");
		}
	},
	defaultContact:{
		runAtInitialization: true,
		type: "BridgeGetSingle",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By Login Id",
			//parameters: {'Login ID': clientManager.userName},
			parameters: {'Login ID': function(){return clientManager.userName;}},
		},
		data: {
			"First Name":{
				"title":"FIRST",
				setQstn:"Contact_First Name",
				callback:function(value){
					console.log(value);
				},
				className: "control",
			},
			"Last Name":{
				"title":"LAST",
				setQstn:"Contact_Last Name",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			},
			"Email":{
				"title":"EMAIL",
				setQstn:"Contact_Email",
				className: "min-phone-l control-additional"
			},
			"Login Id":{
				"title":"ID",
				setQstn:"Contact_Login ID",
				className: "min-tablet control-additional"
			},
			"Work Phone Number":{
				"title":"PHONE",
				setQstn:"Contact_Phone",
				className: "min-tablet control-additional"
			}
		},
		before: function(){
			toggleUnclickable($('#contact'));
		},
		loadedcallback: function(){
			toggleUnclickable($('#contact'));
		},
		done: function(){	
		},
		noResults: function(){
			alert("No results Found");
			toggleUnclickable($('#contact'));
		},
	},
	listContact:{
		type: "BridgeList",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By Full Name",
			parameters: {'Full Name': '#list-contact input'},
			attributes: ["First Name","Last Name","Email","Login Id","Work Phone Number"],
				},
		data: {
			"First Name":{
				title:"FIRST",
				setQstn:"List Contact First Name",
				callback:function(value){
					console.log(value);
				},
				className: "control",
			},
			"Last Name":{
				title:"LAST",
				setQstn:"List Contact Last Name",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			},
			"Email":{
				title:"EMAIL",
				setQstn:"List Contact Email",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			},
			"Login Id":{
				title:"LOGIN",
				setQstn:"List Contact Login ID",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			},
			"Work Phone Number":{
				title:"PHONE",
				setQstn:"List Contact Phone",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			},
		},
		appendTo: '#list-contact-results',
		afterInit: function(){ //completeCallback
			
		},
		before: function(){
			toggleUnclickable($('#list-contact'));
		},
		loadedcallback: function(){
			this.appendTo.show("blind", "swing", 1000);
			toggleUnclickable($('#list-contact'));
		},
		done: function(){
		},
		clickCallback: function(results){
				$('#list-contact .someoneelse input').val(results["First Name"]+ ' ' + results["Last Name"]);
				this.appendTo.hide("blind", "swing", 1000);
		},
		noResults: function(){
			alert("No results Found")
		}
	},
	defaultListContact:{
		runAtInitialization: true,
		type: "BridgeGetSingle",
		bridgeConfig:{
			model: "Person",
			qualification_mapping: "By Login Id",
			//parameters: {'Login ID': clientManager.userName},
			parameters: {'Login ID': function(){return clientManager.userName;}},
		},
		data: {
			"First Name":{
				"title":"FIRST",
				setQstn:"List Contact First Name",
				callback:function(value){
					console.log(value);
				},
				className: "control",
			},
			"Last Name":{
				"title":"LAST",
				setQstn:"List Contact Last Name",
				callback:function(value){
					console.log(value);
				},
				className: "min-phone-l control-additional"
			}
		},
		before: function(){
			toggleUnclickable($('#list-contact'));
		},
		loadedcallback: function(){
			toggleUnclickable($('#list-contact'));
		},
		done: function(){	
		},
		noResults: function(){
			alert("No results Found");
			toggleUnclickable($('#list-contact'));
		}
	},
	requestedForSDRTableConfig:{
		//type: "BridgeDataTable" or "BridgeList".  Determines default values to be used and behavior.
		type: "performSDRTable",
		sdrConfig:{
			SDRId: 'KSHAA5V0HJEMVANZR2R0KM2F7LBICP',
			params: 
			/*"lname=Peterson",*/
			function(){
				return "lname="+$('#SDR_requested_for input').val();
			},
			sdrName: 'CallLastNameSDR'
		},
		processSingleResult: true,
		data: {
			"AR Login":{
				title:"LOGIN ID",
				className: "control",
				setQstn:"SDR_ReqFor_Login ID"
			},
			"First Name":{
				title:"FIRST",
				className: "min-tablet control-additional",
				setQstn:"SDR_ReqFor_First Name"
			},
			"Last Name":{
				title:"LAST",
				className: "min-tablet control-additional",
				setQstn:"SDR_ReqFor_Last Name"
			},
			"Supervisor Name":{
				title:"MANAGER NAME",
				className: "none",
				setQstn:""
			},
		},
		//Where to append the table
		//appendTo: '#SDR_requested_for',
		appendTo: function(){return $('#SDR_requested_for');},
		//ID to give the table when creating it.
		tableId: 'SDRRequestedForTable',
		//After the Table has been created.
		afterInit: function(){ //completeCallback
					this.columns.unshift({ data: 'select', "title":"SELECT",	"defaultContent": "", orderable: false, width: 60,			className: "select" })
	
		},
		before: function(){ //before search
//			toggleUnclickable($('#requested_for'));
//			$('#requested_for input').val($('#requested_for input').val().toLowerCase());
		},
		// After Table Load
		loadedcallback: function(){
			//togglePanel(this);
		},
		//Define action to take place after SDR is complete.
		done: function (){
		},
		noResults: function(){
			alert('No results Found');
//			toggleUnclickable($('#requested_for'));
		},
		// Executes on click of element with class of select
		clickCallback: function(results){
//				$('#requested_for input').val(results["First Name"]+ ' ' + results["Last Name"]);
//				toggleUnclickable($('#requested_for'));
				//togglePanel(event.data.value);
		},
		createdRow: function ( row, data, index ) {
			// Add select class to Row.  The class is used to trigger selection of row.
			$(row).addClass('select');
		},

	}
};

