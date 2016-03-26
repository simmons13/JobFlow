var create = function(i_oData, console) {
    
    function notEmpty(i_sArg) {
        return !(!i_sArg || (i_sArg && i_sArg.indexOf("&") == 0 && i_sArg.indexOf("&", 1) == i_sArg.length-1));
    }
    
    var sEmail = "<html><body>";
    sEmail += "<div style='width:400px; font-family:Verdana, Geneva, sans-serif; font-size:13px; padding: 15px;' >";

    var sTextCSS = "style='font-family:Courier New, Courier, monospace; display: inline-block;'"
    var sTitleCSS = "style='font-family:Courier New, Courier, monospace; display: inline-block; width:200px;'"
    var sValueCSS = "style='font-family:Courier New, Courier, monospace; display: inline-block; width:100px; text-decoration:underline;'"
    
    
    sEmail += "<div style='font-weight:bold; margin-top:20px'>"  + "</div>";
        
    if (notEmpty(i_oData.address)) {
        sEmail += "<div style='margin-top:20px'>" +
            "<div " + sTextCSS + ">" + i_oData.address + "</div>" +
            "</div>";
    }
        
    sEmail += "<div style='margin-top:20px'>" +
            "Change Order Number: "  + i_oData.changesid +
        "</div>";
        
    sEmail += "<div style='margin-top:20px'>" +
            "Date: " + (new Date()).toDateString() + 
        "</div>";
        
    sEmail += "<div style='margin-top:20px'>" +
            "Owner name: " + i_oData.userfirstname + " " + i_oData.userlastname+
        "</div>";
        
    if (notEmpty(i_oData.useraddress)) {
        sEmail += "<div style='margin-top:2px'>" +
            "Owner address: " + 
            "<b>" + i_oData.useraddress + "</b>" +
        "</div>";
    }
        
    if (notEmpty(i_oData.contract_date)) {
        sEmail += "<div style='margin-top:20px'>" +
            "Contract Date: " + (new Date(i_oData.contract_date)).toDateString() + 
        "</div>";
    }
        
    if (notEmpty(i_oData.changessummary)) {
        sEmail += "<div style='margin-top:20px'>" +
            "Description of Work Change: " +
            "</div>" +
            "<div style='margin-top:1px'>" +
                "<div " + sTextCSS + ">" + i_oData.changessummary + "</div>" +
            "</div>";
    }
        
    sEmail += 
        "<div style='margin-top:20px'>" +
            "The above changes shall be performed under the same terms and conditions " +
            "in the original agreement between owner and " +
            i_oData.usercompanyname + " unless otherwise stated. " +
        "</div>";
    
    
    sEmail += "<div style='margin-top:1px'>";
    if (notEmpty(i_oData.current_total)) {
        sEmail += "<div " + sTitleCSS + ">Current Contract Amount: </div>";
        sEmail += "<div " + sValueCSS + "> $" + i_oData.current_total + "</div>";
    }

    if (notEmpty(i_oData.changes_total)) {
        sEmail += "<div " + sTitleCSS + ">Change Order Cost: </div>";
        sEmail += "<div " + sValueCSS + "> $" + i_oData.changes_total + "</div>";
    
        var nNew = parseInt(i_oData.current_total) + parseInt(i_oData.changes_total);
        sEmail += "<div " + sTitleCSS + ">New Total Cost: </div>";
        sEmail += "<div " + sValueCSS + "> $" + nNew + "</div>";
    
    }
    sEmail += "</div>";
 
    //Include all x changes

    //Total Amount for this change order:					$______________
    //New Contract Amount including this Change Order		$______________


    if (notEmpty(i_oData.changedate)) {
        var nChangeAmount = parseInt(i_oData.changes_competion_date);
        var sChangeType = i_oData.changedatedirection || "increased";
        
        var nNewDate = new Date(i_oData.current_competion_date);
        nNewDate.setDate(nNewDate.getDate() + nChangeAmount);
        
        sEmail += "<div style='margin-top:20px'>" +
            "Time required to complete the project shall be " + 
            sChangeType + " by " + nChangeAmount + 
            " calendar days due to this change order " + 
            "and the date of completion will be changed to " + nNewDate.toDateString() +
            "</div>";
    }
    
    if (i_oData.url){
        var sButton = "text-align:center; -webkit-border-radius: 28;-moz-border-radius: 28; border-radius: 28px; color: #ffffff; font-size: 20px; padding: 10px 20px 10px 14px; text-decoration: none; background: ";
        sEmail += "<div style='width:100%; margin-top:40px'>" +
            "<a style='" +sButton+"#3498db;" + "' href=\""+ i_oData.url+1 +"\">Click here to Accept the change order</a>" +
            "</div>" +
            "<div style='width:100%; margin-top:40px'>" +
            "<a style='" +sButton+"#d97b34;" + "' href=\""+ i_oData.url+2 +"\">Click here to Reject the change order</a>" +
            "</div>";
    }
    
    sEmail += "</div></body></html>";
    
    return sEmail;
      
};

module.exports = {};
module.exports.create = create;