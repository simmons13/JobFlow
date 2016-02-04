var email = function(i_oData) {
    
    var sEmail =
    "<div style='width:300px'>" +
        "<div style='font-weight:bold; margin-top:5px'>" +
            "Change Order" +
        "</div>" +
        
        "<div style='margin-top:5px'>" +
            i_oData.user.companyaddress +
        "</div>" +
        
        "<div style='margin-top:5px'>" +
            "Change Order Number: " + i_oData.changes.number +
        "</div>" +
        
        "<div style='margin-top:5px'>" +
            "Date: " + (new Date()).toString() +
        "</div>" +
        
        "<div style='margin-top:5px'>" +
            "Owner name: " + i_oData.clients.name +
        "</div>" +
        "<div style='margin-top:2px'>" +
            "Owner address: " + i_oData.clients.address +
        "</div>" +
        
        
        "<div style='margin-top:5px'>" +
            "Existing Contract Date: " + i_oData.projects.contract_date +
        "</div>" +
        
        "<div style='margin-top:5px'>" +
            "Description of Work Change(s): " +
        "</div>" +
        "<div style='margin-top:1px'>" +
            i_oData.changes.summary +
        "</div>";
        
        
    sEmail += 
        "<div style='margin-top:5px'>" +
            "The above changes shall be performed under the same terms and conditions " +
            "in the original agreement between owner and " +
            i_oData.user.companyname + "unless otherwise stated."
        "</div>" +
    
        "<div style='margin-top:1px'>" +
            "Original Contract Amount: $" + i_oData.projects.current_total +
        "</div>";

        //Include all x changes
    
        //Total Amount for this change order:					$______________
        //New Contract Amount including this Change Order		$______________


    if (i_oData.changes.time) {
        var nChangeAmount = i_oData.changes.current_competion_date;
        var sChangeType = (nChangeAmount > 0) ? "increased" : "decreased";
        
        sEmail += "<div style='margin-top:5px'>" +
            "Time required to complete the project shall be " + 
            sChangeType + " by " + nChangeAmount + 
            " calendar days due to this change order " + 
            "and the date of completion will be changed to " + i_oData.change.new_completion_date +
            "</div>";
    }
    
    sEmail += 
        "<div style='margin-top:5px'>" 
            "<a href='"+
                "http://staciesimmons.com/JobFlow/acceptChange.php?" +
                "contractor=" + i_oData.user.id +
                "&client=" + i_oData.clients.id + 
                "&project=" + i_oData.projects.id +
                "&change=" + i_oData.changes.id
             "' >Click here to accept the change order " + "</a>";
        "</div>";
    
    sEmail += "</div>";
    
    return sEmail;
      
};