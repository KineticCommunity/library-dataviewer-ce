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
		var configObj = search.searchConfig[name];
			if(configObj && configObj.execute){
				configObj.execute();
			}
	};
	
	search.searchConfig = {};
	search.initialize = function(o){
		search.searchConfig = $.extend( {}, o, search.searchConfig );
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
			parameters[i] = encodeURIComponent($(configObj.bridgeConfig.parameters[i]).val());
		});
		var templateId = (configObj.bridgeConfig.templateId) ? configObj.bridgeConfig.templateId : clientManager.templateId;
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector({templateId: templateId});		//CONFIGURE: Id of table (div) to recieve Bridge results.  The table element must exist before this code executes.
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
		var templateId = (configObj.bridgeConfig.templateId) ? configObj.bridgeConfig.templateId : clientManager.templateId;
		//create the connector necessary to connect to the bridge
		var connector = new KD.bridges.BridgeConnector({templateId: templateId});
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
		var templateId = (configObj.bridgeConfig.templateId) ? configObj.bridgeConfig.templateId : clientManager.templateId;
		var connector = new KD.bridges.BridgeConnector({templateId: templateId});
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
					//Add odd and even classes to results
					this.$resultsList.find('li:even').addClass("even")
					this.$resultsList.find('li:odd').addClass("odd")
					//Set the Data Attribute to the name of the seachConfig Obj
					var name = filtersearchConfigByName(configObj);	
					this.$resultsList.data('name',name);
					configObj.appendTo.empty().append(this.$resultsList).show("blind", "swing", 1000);		
					}	
					else{
						configObj.noResults();
					}
					configObj.loadedcallback();
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

	search.ucFirst = function(str){
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
							
	//Toggle Panel used to display results
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