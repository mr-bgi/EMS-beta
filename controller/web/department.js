const con = require('../../config/db')

const getAllDepartment = (req, res) => {
    res.render("page/department");
};



module.exports = {
   getAllDepartment,
   
}