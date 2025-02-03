// const mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "ems1",
//     // port: 3308
// });

// con.connect(function(error){
//     if(error) throw error;
//     console.log("connected to sql");
// })

// exports.query = (sql,value)=>{
//     return new Promise((resolv,reject)=>{
//         con.query(sql,value,(err,result)=>{
//             if(err) reject(err);
//             resolv(result)
//         })
//     })
// }


const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ems1",
    port: 3306 || 3308
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
