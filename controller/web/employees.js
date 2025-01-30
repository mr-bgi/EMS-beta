const con = require('../../config/db')


const creatEmployee = (req, res) => {
    res.render("page/employee/create-employee");
};


module.exports = {
    creatEmployee,
   

}