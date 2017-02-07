searchConfig ={
    // Example of full configuration of a seach object to return results as a DataTable
    personSearchBridgeTable:{
        resource:{
            name: "Sample People",
            //Params to be created and passed to the Bridge.  VALUE MUST BE JQUERY SELECTOR.
            parameters: {'Full Name': '#requested_for input','First Name': '#requested_for input','Last Name': '#requested_for input'},
        },
        data: [
            { 
                title:"<input type='checkbox' class='editor-active'>",    
                 defaultContent:"<input type='checkbox' class='editor-active'>",
                 class:"control hidden",
            },
            { 
                defaultContent: 'static',
                title:"static text",
                class: 'hidden',
            },
            { 
                name: "First Name",
                title:"FIRST",
                class: "all",
                setField:"First Name",
            },
            { 
                name: "Last Name",
                title:"Last",
                class: "min-tablet",
                callback:function(value){
                    console.log(value);
                },
                setField:"Last Name"
            },
            { 
                name: "Email",
                title:"EMAIL",
                class: "min-phone",
                setField:"Email",
            },
            { 
                name: "Login Id",
                title:"LOGIN",
                class: "none",
                setField:"Login Id"
            },
            { 
                name: "Phone Number",
                title:"PHONE",
                class: "hidden",
                setField:"Phone Number",
            }
        ],
        resultsContainerId: 'requestedForTable',
        before: function(configObj){ 
            
            K('field[Requested For Someone Else]').value($('#search-requestedfor-someone-else input').val());
        },
        success: function (configObj){
            
            console.log(this);
        },
        successEmpty: function(configObj){
            
            console.log(this);
        },
        error: function(configObj){
            
            console.log(this);
        },
        complete: function(configObj){
            
            console.log(this);
        },
        // Executes on click of element with class of select
        clickCallback: function(results){
            
            $('#search-requestedfor-someone-else input').attr('type', 'button').val($("<div>").html("&#xf00c; "+results["First Name"]+ ' ' + results["Last Name"]).text());
            $('#search-requestedfor-someone-else .fa').hide();
        },
        removeOnClick: true,
        processSingleResult: true,
        renderer: {
            /*type: KDSearch.Renderers.UnorderedList,*/
            type: DataViewer.Renderers.DataTables, // Passing a function here allows for better customization
            options: {
                // DataTable OPTIONS; Passing options here make it clear that they are being passed to data tables
                // responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
                responsive: true,
                fnFooterCallback: function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
                    
                },
                dom: 'Bfrtip',
                createdRow: function ( row, data, index ) {
                        
                        console.log('row created');
                },
                pageLength: 15,
            }
        },       
    },
}