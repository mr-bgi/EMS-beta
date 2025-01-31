const con = require('../../config/db')

const getAllDepartment = (req, res) => {
    res.render("page/department");
};

const getEdit = (req, res)=>{
    console.log(req.body);
    res.render('page/department')
    
}



module.exports = {
   getAllDepartment,
   getEdit
   
}