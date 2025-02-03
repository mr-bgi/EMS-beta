const con = require('../../config/db')


const creatEmployee = (req, res) => {
    res.render("page/employee/create-employee");
};
const getListEmployee = (req, res) => {
    res.render("page/employee/list-employee");
};

const payRollEmployee = (req, res)=>{
    res.render("page/employee/payroll");
}

module.exports = {
    creatEmployee,
    getListEmployee,
    payRollEmployee,
   

}