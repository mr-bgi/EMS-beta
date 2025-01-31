const express = require('express');
const con = require('../../config/db');
const departmentController = require('../../controller/web/department');

const router = express.Router();

router.get('/department', departmentController.getAllDepartment);
router.get('/editDepartment/:id', departmentController.getEdit)

module.exports = router;