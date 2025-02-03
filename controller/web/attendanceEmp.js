const con = require('../../config/db')

const getAttendance = (req, res) => {
    res.render("page/attendanceEmp");
};



module.exports = {
   getAttendance,
   
}