//this is a simple sample configuration
//this one would be called with the line
//KDSearch.executeSearch(messageConfigs.recipientConfig);
//or
//KDSearch.executeSearch(messageConfigs.contentConfig);
<script>
messageConfigs = {
   recipientConfig:{
    type: "BridgeDataTable",
		// responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
		//responsive: false,
		bridgeConfig:{
			model: "Recipient by Notification",
			qualification_mapping: "Recipients By Notification",
			//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
			parameters: {'Notification Name': function(){ return K('field[Notification Name]').value();}},
		},
		processSingleResult: false,  //you would want this to be false for a console table to to make them select even if there is only one search result
		clearOnClick:false,    //you would want this to be false for a console table
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"Recipient Type":{
				title:"Recipient Type",
				className: "all"
			},
			"Global or Specific":{
				title:"Scope Type",
				className: "all"
			},
			"Scope":{
				title:"Scope",
				className: "all",
				callback:function(value){
				  
				},
				setQstn:"Scope"
			},
			"Language Type":{
				title:"Language Type",
				className: "all"
			},
			"Language":{
				title:"Language",
				className: "all"
			},
			"Recipient":{
				title:"Recipient",
				className: "all"
			},
			"Status":{
				title:"Status",
				className: "none"
			}
		},
		//Where to append the table
		appendTo: function(){return $('#existingRecip');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		//ID to give the table when creating it.
		resultsContainerId: 'currentRecipientsTable',
		//After the Table has been created.
		before: function(){ //before search
		},
		error: function(){
		},
		//Define action to take place after SDR is complete.
		success: function (){
		},
		success_empty: function(){
		},
		complete: function(){
		},
		// Executes on click of element with class of select
		clickCallback: function(results){
		},
		createdRow: function ( row, data, index ) {
		},
		fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
		},
		dom: 'Bfrtip',
   },
   contentConfig:{
    type: "BridgeDataTable",
		// responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
		responsive: false,
		bridgeConfig:{
			model: "Content by Notification",
			qualification_mapping: "Content By Notification",
			//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
			parameters: {'Notification Name': function(){ return K('field[Notification Name]').value();}},
		},
		processSingleResult: false,
		clearOnClick:false,
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"Global or Specific":{
				title:"Scope Type",
				className: "all"
			},
			"Scope":{
				title:"Scope",
				className: "all"
			},
			"Language Type":{
				title:"Language Type",
				className: "all"
			},
			"Language":{
				title:"Language",
				className: "all"
			},
			"Subject":{
				title:"Subject",
				className: "all"
			},
			"Body":{
				title:"Body",
				className: "all"
			},
			"Status":{
				title:"Status",
				className: "none"
			}
		},
		//Where to append the table
		appendTo: function(){return $('#existingContent');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		resultsContainerId: 'currentContentTable',
		//After the Table has been created.
		before: function(){ //before search
		},
		error: function(){
		},
		//Define action to take place after SDR is complete.
		success: function (){
		},
		success_empty: function(){
		},
		complete: function(){
		},
		// Executes on click of element with class of select
		clickCallback: function(results){
		},
		createdRow: function ( row, data, index ) {
		},
		fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
		},
		dom: 'Bfrtip',
   }
}
</script>