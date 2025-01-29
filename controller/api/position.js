const { result } = require('lodash');
const con = require('../../config/db');
const vPosition = require('../../validation/position')
const fs = require('fs');

const getAllPosition = async (req, res) => {
    con.query('SELECT * FROM positions', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json({ result: true, msg: 'Position retrieved successfully', data: data });
    });
};

const postCreatePosition = (req, res) => {
    const positionName = req.body.name;

    // Check if the position already exists
    con.query('SELECT * FROM `positions` WHERE `name` = ?', [positionName], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ result: false, msg: 'Database error', data: [] });
        }

        if (results.length > 0) {
            return res.json({ result: false, msg: 'This position is already created!', data: [] });
        }

        const { error, value } = vPosition(req.body);

        if (error) {
            res.json({ result: false, msg: error.details });
            return;
        }


        let sql = "INSERT INTO `positions`(`name`,`description`) VALUES (?, ?)";
        let arrData = [positionName, req.body.description];

        con.query(sql, arrData, (err, data) => {
            if (err) {
                console.error(err);
                return res.json({ result: false, msg: 'Error inserting position', data: [] });
            }

            res.json({ result: true, msg: 'Position created successfully!' });
        });
    });
};

const deletePosition = (req, res) => {

    con.query("DELETE FROM `positions` WHERE id = ?", req.params.id, (err, data) => {
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
const getEditPosition = (req, res) => {
    console.log('param', req.params);
    con.query('select * from positions where id = ?', req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        }

        console.log(data);
        res.render('edit', { result: data });
    });
}

const postEditPosition = (req, res) => {
    console.log('name: ', req.body.name);

    // First, check if the position exists
    const checkSql = "SELECT * FROM `positions` WHERE id = ?";
    con.query(checkSql, [req.body.id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error'
            });
        }

        // If no record found, return 'No this data'
        if (results.length === 0) {
            return res.status(404).json({
                result: false,
                msg: 'This ID is not valid. Try another ID to update!'
            });
        }

        const existingPositionName = results[0].name;
        if (existingPositionName !== req.body.name) {
            const checkNameSql = "SELECT * FROM `positions` WHERE name = ? AND id != ?";
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
                        msg: 'This position already exists.'
                    });
                }

                const sql = "UPDATE `positions` SET name = ?, description = ? WHERE id = ?";
                let myArr = [req.body.name, req.body.description, req.body.id];

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
                msg: 'This position already exists.'
            });
        }
    });
};

module.exports = {
    getAllPosition,
    postCreatePosition,
    deletePosition,
    getEditPosition,
    postEditPosition
}
