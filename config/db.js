const mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "ems4",
    password: "LXis3d4EccfY2eTT",
    database: "ems4",
});

con.connect(function(error){
    if(error) throw error;
    console.log("connected to sql");
})

exports.query = (sql,value)=>{
    return new Promise((resolv,reject)=>{
        con.query(sql,value,(err,result)=>{
            if(err) reject(err);
            resolv(result)
        })
    })
}
