const { result } = require('lodash');
const con = require('../../config/db');
const vDepartment = require('../../validation/department');
const fs = require('fs');

const getAllDepartment = async (req, res) => {
    con.query('SELECT * FROM departments', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({ result: true, msg: 'Department retrieved successfully', data: result });
    });
};

const postCreateDepartment = (req, res) => {
    const departmentName = req.body.name;

    // Check if the position already exists
    con.query('SELECT * FROM `departments` WHERE `name` = ?', [departmentName], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ result: false, msg: 'Database error', data: [] });
        }

        if (results.length > 0) {
            return res.json({ result: false, msg: 'This department is already created!', data: [] });
        }

        const { error, value } = vDepartment(req.body);

        if (error) {
            res.json({ result: false, msg: error.details });
            return;
        }

        let sql = "INSERT INTO `departments`(`name`,`department_head`) VALUES (?, ?)";
        let arrData = [departmentName, req.body.department_head];

        con.query(sql, arrData, (err, data) => {
            if (err) {
                console.error(err);
                return res.json({ result: false, msg: 'Error inserting position', data: [] });
            }

            res.json({ result: true, msg: 'Department created successfully!' });
        });
    });
};

const deleteDepartment = (req, res) => {

    con.query("DELETE FROM `departments` WHERE id = ?", req.params.id, (err, data) => {
        if (err) {
            console.log(err);

            res.status(500).json({
                message: 'Internal Server Error'
            });
            return;
        }

        if (data.affectedRows === 0) {
            res.status(404).json({
                message: 'This ID does not exist'
            });
            return;
        }

        res.status(200).json({
            message: 'Delete successfully'
        })
    })

};
const getEditDepartment = (req, res) => {
    console.log('param', req.params);
    con.query('select * from departments where id = ?', req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        }

        console.log(data);
        res.render('edit', { result: data });
    });
}

const postEditDepartment = (req, res) => {
    console.log('name: ', req.body.name);

    const checkSql = "SELECT * FROM `departments` WHERE id = ?";
    con.query(checkSql, [req.body.id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                result: false,
                msg: 'This ID is not valid. Try another ID to update!'
            });
        }

        const existingDepartmentName = results[0].name;
        if (existingDepartmentName !== req.body.name) {
            const checkNameSql = "SELECT * FROM `departments` WHERE name = ? AND id != ?";
            con.query(checkNameSql, [req.body.name, req.body.id], (err, nameResults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        msg: 'Error'
                    });
                }

                if (nameResults.length > 0) {
                    return res.status(400).json({
                        result: false,
                        msg: 'This department already exists.'
                    });
                }

                const sql = "UPDATE `departments` SET name = ?, department_head = ? WHERE id = ?";
                let myArr = [req.body.name, req.body.department_head, req.body.id];

                con.query(sql, myArr, (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            msg: 'Error'
                        });
                    }
                    return res.status(200).json({
                        msg: 'Update successfully!'
                    });
                });
            });
        } else {
            return res.status(400).json({
                result: false,
                msg: 'This department already exists.'
            });
        }
    });
};

module.exports = {
    getAllDepartment,
    postCreateDepartment,
    deleteDepartment,
    getEditDepartment,
    postEditDepartment
}
