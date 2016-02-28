module.exports = {};
module.exports.addChangeUrl = "http://staciesimmons.com/JobFlow/addChange.php",
module.exports.changeExistUrl = "http://staciesimmons.com/JobFlow/changeExist.php",
module.exports.acceptChangeUrl = "http://staciesimmons.com/JobFlow/acceptChange.php",
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
    new: "INSERT INTO projects ( "+
            "projectssummary, client, orig_total, orig_competion_date, " +
            "current_competion_date, current_total, contract_date" +
            ") VALUES (" +
            "'&projectssummary&', '&client&', '&orig_total&', '&orig_competion_date&', " +
            "'&current_competion_date&', '&current_total&', '&contract_date&'" +
            ")",
    edit: "UPDATE projects "+
            "SET " +
            "projectssummary='&projectssummary&', client='&client&', " +
            "contract_date='&contract_date&', orig_total='&orig_total&' " +
            "WHERE projectsid=&projectsid& ",
    update: "UPDATE projects SET &cond& WHERE projectsid=&projectsid& ",
    select: "SELECT * FROM projects " +
            "INNER JOIN clients " +
            "ON clientsid = client ",
    goto: "details"
};
module.exports.user = {
    stage: "user",
    intro: "Tell us about you and your company",
    properties: [
        {id:"userid", type:"key"},
        {id:"userfirstname", type:"text", title:"First name"},
        {id:"userlastname", type:"text", title:"Last name"},
        {id:"userphone", type:"tel", title:"Phone number"},
        {id:"usercompanyname", type:"text", title:"Company name"},
        {id:"usercompanylogo", type:"file", title:"Company logo"}
    ],
    create: "CREATE TABLE IF NOT EXISTS user ( "+
            "userid VARCHAR(100) PRIMARY KEY, " +
            "userfirstname VARCHAR(50), " +
            "userlastname VARCHAR(50), " +
            "userphone VARCHAR(30), " +
            "usercompanyname VARCHAR(100), " +
            "usercompanylogo VARCHAR(500) )",
    new: "INSERT INTO user ( "+
            "userid, userfirstname, userlastname, userphone, usercompanyname, usercompanylogo" +
            ") VALUES (" +
            "'&userid&', '&userfirstname&', '&userlastname&', '&userphone&', " +
            "'&usercompanyname&', '&usercompanylogo&'" +
            ")",
    edit: "UPDATE clients "+
            "SET " +
            "userfirstname='&userfirstname&', userlastname='&userlastname&', userphone='&userphone&', " +
            "usercompanyname='&usercompanyname&', usercompanylogo='&usercompanylogo&' " +
            "WHERE clientsid=&clientsid& ",
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
    new: "INSERT INTO clients ( "+
            "firstname, lastname, address, phone, email" +
            ") VALUES (" +
            "'&firstname&', '&lastname&', '&address&', '&phone&', '&email&'" +
            ")",
    edit: "UPDATE clients "+
            "SET " +
            "firstname='&firstname&', lastname='&lastname&', address='&address&', " +
            "phone='&phone&', email='&email&' " +
            "WHERE clientsid=&clientsid& ",
    select: "SELECT * FROM clients t ",
    goto: "projects"
};

/*
    viewModel.changecost = false;
    viewModel.changedate = false;   
    viewModel.changecostdirection = "increase";   
    viewModel.changedatedirection = "increase";
*/
        
module.exports.changes = {
    stage: 'changes',
    intro: "Fill in details about the Change Order",
    properties: [
        {id:"changesid", type:"key"},
        {id:"changessummary", type:"textarea", title:"Enter change summary"},
        {id:"changes_total", type:"textarea", title:"Enter change summary"},
        {id:"changes_competion_date", type:"textarea", title:"Enter change summary"},
        {id:"changecost", type:"textarea", title:"Enter change summary"},
        {id:"changedate", type:"textarea", title:"Enter change summary"},
        {id:"changecostdirection", type:"textarea", title:"Enter change summary"},
        {id:"changedatedirection", type:"textarea", title:"Enter change summary"},
        {id:"status", type:"hidden"},
        {id:"project", type:"hidden"}
    ],
    create: "CREATE TABLE IF NOT EXISTS changes ( "+
            "changesid INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "changessummary VARCHAR(50), " +
            "changes_total VARCHAR(50), " +
            "changes_competion_date VARCHAR(50), " +
            "changecost VARCHAR(10), " +
            "changedate VARCHAR(10), " +
            "changecostdirection VARCHAR(50), " +
            "changedatedirection VARCHAR(50), " +
            "project INTEGER, " +
            "status INTEGER )",
    new: "INSERT INTO changes ( "+
            "changessummary, changes_total, changes_competion_date, " + 
            "changecost, changedate, changecostdirection, changedatedirection, " +
            "project, status " +
            ") VALUES (" +
            "'&changessummary&', '&changes_total&', '&changes_competion_date&', " +
            "'&changecost&', '&changedate&', '&changecostdirection&', '&changedatedirection&', " +
            "'&project&', -1" +
            ")",
    edit: "UPDATE changes "+
            "SET " +
            "changessummary='&changessummary&', changes_total='&changes_total&', " +
            "changes_competion_date='&changes_competion_date&', changecost='&changecost&', " +
            "changedate='&changedate&', changecostdirection='&changecostdirection&', " +
            "changedatedirection='&changedatedirection&', " +
            "status=-1 " +
            "WHERE changesid=&changesid& ",
    update: "UPDATE changes SET &cond& WHERE changesid=&changesid& ",
    select: "SELECT * FROM changes t",
    goto: "projectdetails"
};
module.exports.details = {
    stage: "details",
    ids: ["userid"],
    properties: [
        {id:"projectid", type:"key"},
        {id:"projectsummary", type:"text"},
        {id:"project", type:"hidden"},
    ],
    select: "SELECT * " +
        "FROM projects " +
        "LEFT OUTER JOIN changes " +
        "ON projectsid = project "
};

module.exports.projectdetails = {
    stage: "projectdetails",
    ids: ["userid", "projectsid", "clientsid"],
    properties: [
        {id:"projectid", type:"key"},
        {id:"projectsummary", type:"text"},
        {id:"change", type:"text"},
    ],
    select: "SELECT * " +
        "FROM projects " +
        "LEFT JOIN changes " +
        "ON projectsid = project " +
        "OR projectsid IS NULL OR project IS NULL " +
        "WHERE &cond&"
};

module.exports.email = {
    stage: "email",
    ids: ["userid", "projectsid", "clientsid", "changesid"],
    select: "SELECT * " +
        "FROM changes " +
        "INNER JOIN projects " +
        "ON projectsid = project " +
        "INNER JOIN clients " +
        "ON clientsid = client " +
        "CROSS JOIN user " +
        "WHERE &cond& " 
};


module.exports.status = {
    "-1": "Send email",
     "0": "Waiting",
     "1": "Accepted",
     "2": "Rejected"
}

module.exports.statuscss = {
    "-1": "send",
     "0": "waiting",
     "1": "accepted",
     "2": "rejected"
}
