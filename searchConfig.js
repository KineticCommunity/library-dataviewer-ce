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
			resource: "Recipient by Notification",
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
			resource: "Content by Notification",
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

//Options that show JSON table and list functions
//In these examples, the JSON is hard coded, but it could be passed in a variable as well

<script>
messageConfigs = {
   langConfig:{
    type: "BridgeDataTable",
		// responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
		responsive: false,
		bridgeConfig:{
			resource: "Languages",
			qualification_mapping: "All",
			//Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
			parameters: {},
		},
		processSingleResult: false,
		clearOnClick:false,
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"Language":{
				title:"Language",
				className: "all"
			},
			"Empty":{
				title:" ",
				className: "all",
				notdynamic: true
			}
		},
		//Where to append the table
		appendTo: function(){return $('#Languages');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		//ID to give the table when creating it.
		resultsContainerId: 'languageTable',
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
			$('td',row).eq(1).addClass("cursorPointer");
			rowButtonHTML = '<button title="Edit Item" class="btn-edit" value="Edit"><i class="fa fa-pencil-square-o"></i></button><button title="Delete Item" class="btn-delete" value="Delete"><i class="fa fa-scissors"></i></button>';
			$('td',row).eq(1).html(rowButtonHTML);
			$('td',row).eq(1).click(function(e) {
			//do something
			  if (e.target.className.indexOf("pencil") != -1) {
			     alert('this is edit');
		  }
			  if (e.target.className.indexOf("scissors") != -1) {
			     alert('this is delete');
			  }
			});
	
			
		},
		fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
		},
		dom: 'Bfrtip',
   },
   langJsonConfig:{
    type: "JSONDataTable",
		// responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
		responsive: false,
		JSON: [{"Language":"English","Country":"US"},{"Language":"French","Country":"France"},{"Language":"Spanish","Country":"Spain"}],
		processSingleResult: false,
		clearOnClick:false,
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"Language":{
				title:"Language",
				className: "all"
			},
			"Country": {
				title:"Country",
				className: "all"
			},
			"Empty":{
				title:" ",
				className: "all",
				notdynamic: true
			}
		},
		//Where to append the table
		appendTo: function(){return $('#jsonTable');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		//ID to give the table when creating it.
		resultsContainerId: 'languageJSONTable',
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
			$('td',row).eq(2).addClass("cursorPointer");
			rowButtonHTML = '<button title="Edit Item" class="btn-edit" value="Edit"><i class="fa fa-pencil-square-o"></i></button><button title="Delete Item" class="btn-delete" value="Delete"><i class="fa fa-scissors"></i></button>';
			$('td',row).eq(2).html(rowButtonHTML);
			$('td',row).eq(2).click(function(e) {
			//do something
			  if (e.target.className.indexOf("pencil") != -1) {
			     alert('this is edit');
		  }
			  if (e.target.className.indexOf("scissors") != -1) {
			     alert('this is delete');
			  }
			});
	
			
		},
		fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
		},
		dom: 'Bfrtip',
   },
   langJsonListConfig:{
    type: "JSONList",
		// responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
		responsive: false,
		JSON: [{"Language":"English","Country":"US"},{"Language":"French","Country":"France"},{"Language":"Spanish","Country":"Spain"}],
		processSingleResult: false,
		clearOnClick:false,
		// Properties in the data must match the attributes of the Bridge Request
		data: {
			"Language":{
				title:"Language",
				className: "all"
			},
			"Country": {
				title:"Country",
				className: "all"
			}
		},
		//Where to append the table
		appendTo: function(){return $('#jsonList');},
		// OPTIONAL: Create Table function or string to become jQuery obj
		//ID to give the table when creating it.
		resultsContainerId: 'languageJSONList',
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
		
		dom: 'Bfrtip',
   },
}

</script>