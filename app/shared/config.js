module.exports = {};
module.exports.addChangeUrl = "http://staciesimmons.com/JobFlow/addChange.php",
module.exports.changeExistUrl = "http://staciesimmons.com/JobFlow/changeExist.php",
module.exports.emailChangeUrl = "http://staciesimmons.com/JobFlow/acceptChange.php",
module.exports.projects = {
    stage: "projects",
    intro: "Fill out details on the project",
    properties: [
        {id:"projectsid", type:"key"},
        {id:"projectssummary", type:"textarea", title:"Enter a summary of the project"},
        {id:"client", type:"hidden"},
        {id:"orig_total", type:"text", title:"Contract total cost"},
        {id:"orig_competion_date", type:"date", title:"Contract completion date"},
        {id:"current_competion_date", type:"hidden"},
        {id:"current_total", type:"hidden"},
        {id:"contract_date", type:"date", title:"Contract sign date"}
    ],
    create: "CREATE TABLE IF NOT EXISTS projects ( "+
            "projectsid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "projectssummary VARCHAR(50), " +
            "client INTEGER, " +
            "orig_total VARCHAR(50), " +
            "orig_competion_date VARCHAR(50), " + 
            "current_competion_date VARCHAR(50), " + 
            "current_total VARCHAR(50), " +
            "contract_date VARCHAR(50) )",
    add: "INSERT INTO projects ( "+
            "projectssummary, client, orig_total, orig_competion_date, current_competion_date, current_total, contract_date" +
            ") VALUES (" + 
            "'&projectssummary&', '&client&', '&orig_total&', '&orig_competion_date&', '&current_competion_date&', '&current_total&', '&contract_date&'" +
            ")",
    select: "SELECT * FROM projects t WHERE &cond&",
    goto: "projectdetails"
};
module.exports.user = {
    stage: "user",
    intro: "Tell us about you and your company",
    properties: [
        {id:"userid", type:"key"},
        {id:"firstname", type:"text", title:"First name"},
        {id:"lastname", type:"text", title:"Last name"},
        {id:"phone", type:"tel", title:"Phone number"},
        {id:"companyname", type:"text", title:"Company name"},
        {id:"companylogo", type:"file", title:"Company logo"}
    ],
    create: "CREATE TABLE IF NOT EXISTS user ( "+
            "userid VARCHAR(100) PRIMARY KEY, " +
            "firstname VARCHAR(50), " +
            "lastname VARCHAR(50), " +
            "phone VARCHAR(30), " +
            "companyname VARCHAR(50), " +
            "companylogo VARCHAR(50) )",
    add: "INSERT INTO user ( "+
            "userid, firstname, lastname, phone, companyname, companylogo" +
            ") VALUES (" + 
            "'&userid&', '&firstname&', '&lastname&', '&phone&', '&companyname&', '&companylogo&'" +
            ")",
    select: "SELECT * FROM user",
    prepopulateCheck: "SELECT * FROM user WHERE userid=1",
    goto: "details"
};

module.exports.clients = {
    properties: [
        {id:"clientsid", type:"key"},
        {id:"firstname", type:"text", title:"First name"},
        {id:"lastname", type:"text", title:"Last name"},
        {id:"address", type:"text", title:"Address"},
        {id:"phone", type:"tel", title:"Phone number"},
        {id:"email", type:"email", title:"Email"}
    ],
    create: "CREATE TABLE IF NOT EXISTS clients ( "+
            "clientsid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstname VARCHAR(50), " +
            "lastname VARCHAR(50), " +
            "address VARCHAR(100), " +
            "phone VARCHAR(30), " +
            "email VARCHAR(100) )",
    add: "INSERT INTO clients ( "+
            "firstname, lastname, address, phone, email" +
            ") VALUES (" + 
            "'&firstname&', '&lastname&', '&address&', '&phone&', '&email&'" +
            ")",
    select: "SELECT * FROM clients t WHERE &cond& ",
    goto: "projects"
};
module.exports.changes = {
    stage: 'changes',
    intro: "Fill in details about the Change Order",
    properties: [
        {id:"changesid", type:"key"},
        {id:"changessummary", type:"textarea", title:"Enter change summary"},
        {id:"status", type:"hidden"},
        {id:"project", type:"hidden"},
    ],
    create: "CREATE TABLE IF NOT EXISTS changes ( "+
            "changesid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "changessummary VARCHAR(50), " +
            "project INTEGER, " +
            "status INTEGER )",
    add: "INSERT INTO changes ( "+
            "changessummary, project, status " +
            ") VALUES (" + 
            "'&changessummary&', '&project&', -1" +
            ")",
    update: "UPDATE changes ( "+
            "changessummary, project " +
            ") VALUES (" + 
            "'&changessummary&', '&project&', '&status&'" +
            ") WHERE &cond&",
    select: "SELECT * FROM changes t WHERE &cond&",
    goto: "email"
}; 
module.exports.details = {
    stage: "details",
    properties: [
        {id:"projectid", type:"key"},
        {id:"projectsummary", type:"text"},
        {id:"project", type:"hidden"},
    ],
    select: "SELECT * " +   
        "FROM projects  " + 
        "LEFT OUTER JOIN changes  " +
        "ON projectsid = project "
};  

module.exports.projectdetails = {
    stage: "projectdetails",
    properties: [
        {id:"projectid", type:"key"},
        {id:"projectsummary", type:"text"},
        {id:"change", type:"text"},
    ],
    select: "SELECT * " +   
        "FROM projects  " + 
        "LEFT OUTER JOIN changes  " +
        "ON projectsid = project " +
        "WHERE &cond&"
};  

module.exports.status = {
    "-1": "Send email",
    "0": "Waiting response",
    "1": "Accepted",
    "2": "Rejected"
}
