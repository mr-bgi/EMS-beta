const con = require('../../config/db')


const creatEmployee = (req, res) => {
    res.render("page/employee/create-employee");
};
const getListEmployee = (req, res) => {
    res.render("page/employee/list-employee");
};


module.exports = {
    creatEmployee,
    getListEmployee,
   

}