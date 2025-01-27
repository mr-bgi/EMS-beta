const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql1234",
    database: "lms",
    port: 3306 || 3308
});


con.connect(function(error){
    if(error) throw error;
    console.log("connected to sql");
})

module.exports = con;