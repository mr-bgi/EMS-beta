const mysql = require('mysql');

let con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'ems1',
    port: 3308
})

con.connect(function(error){
    if(error) throw error;
    console.log("connected to sql");
})

module.exports = con;