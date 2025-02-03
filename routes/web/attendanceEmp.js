const express = require('express');
const con = require('../../config/db');
const attendanceController = require('../../controller/web/attendanceEmp');

const router = express.Router();

router.get('/attendanceEmp', attendanceController.getAttendance );

module.exports = router;