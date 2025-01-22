const con = require('../../config/db');
const bcrypt = require('bcrypt');
const { date } = require('joi');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '3d' });
}


// Get all employee
const getEmployeeData = (req, res) => {
    const sql = `
        SELECT 
            employee.id,
            CONCAT(user.first_name, user.last_name) AS fullname, 
            employee.sex,
            employee.dof,
            employee.phone,
            employee.address,
            employee.department,
            employee.position,
            employee.hire_date,
            employee.salary
        FROM employee  
        INNER JOIN user ON user.id = employee.user_id;
    `;

    con.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving employee.');
        }
        console.log(data);
        res.status(200).json({msg: "Get data successfully", data: [data]})
        // res.render('employee', { emp: data });
    });
};

// Get create employee form
const getfrmCreate = (req, res) => {
    con.query("SELECT * FROM user", (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving authors.');
        }
        // console.log(users);
        res.status(200).json({msg: "Get create successfully", data: [users]})
        // res.render('/frmCreateEmpl', { users, err: {}, data: {} });
    });
};

//post create employee
const postfrmCreate = (req, res) =>{
    const body = req.body;
    const sql = "INSERT INTO `employee`(`user_id`, `sex`, `dof`, `phone`, `address`, `department`, `position`, `hire_date`, `salary`) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [body.user_id, body.sex, body.dof, body.phoone, body.address, body.department, body.position, body.hire_date, body.salary];

    con.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting employee:', err);
            return res.status(500).send('Error adding employee.');
        }
        res.status(200).json({msg: " Create Employee successfully", data:[data] })
        // res.redirect('/employee');
    });
};

//Delete
const deleteEmp = (req, res) =>{
    const { id } = req.params;
    con.query('DELETE FROM `employee` WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting employee from database:', err);
            return res.status(500).send('Error deleting employee.');
        }
        // res.redirect('/');
        res.status(200).json({msg: 'Delete Employee successfully'})
    });
     
};

//Get Edit Employee
const getEdit = (req, res) => {
    const { id } = req.params;

    // Check if the `id` parameter is provided
    if (!id) {
        return res.status(400).json({ error: 'Missing required parameter: id' });
    }

    const employeeSql = "SELECT * FROM employee WHERE id = ?";
    const userSql = "SELECT * FROM user";

    con.query(employeeSql, [id], (err, employee) => {
        if (err) {
            console.error('Error retrieving employee:', err);
            return res.status(500).json({ error: 'Error retrieving employee.' });
        }

        // Check if employee with the given id exists
        if (employee.length === 0) {
            return res.status(404).json({ error: `No employee found with ID ${id}` });
        }

        con.query(userSql, (err, user) => {
            if (err) {
                console.error('Error retrieving user:', err);
                return res.status(500).json({ error: 'Error retrieving user.' });
            }

            // Return the employee and user data
            res.status(200).json({
                msg: 'Get Employee By ID successfully',
                employee: employee[0],
                users: user
            });
        });
    });
};


//Post Edit
const postEdit = (req, res) =>{
    const body = req.body;
    const sql = "UPDATE `employee` SET `user_id`=?,`sex`=?,`dof`=?,`phone`=?,`address`=?,`department`=?,`position`=?,`hire_date`=?,`salary`=? WHERE id =?;";
    const values = [body.user_id, body.sex, body.dof, body.phoone, body.address, body.department, body.position, body.hire_date, body.salary, body.id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating employee data:', err);
            return res.status(500).json({ error: 'Error updating employee data' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ 
            message: 'Employee updated successfully' ,
            data : [result]
        });
        // res.redirect('/employee');
    });
}


module.exports={
    getEmployeeData,
    getfrmCreate,
    postfrmCreate,
    getEdit,
    postEdit,
    deleteEmp,
}