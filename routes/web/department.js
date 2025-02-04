const express = require('express');
const con = require('../../config/db');
const departmentController = require('../../controller/web/department');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

router.get('/department',requireAuth, departmentController.getAllDepartment);
router.get('/editDepartment/:id',requireAuth, departmentController.getEdit)

module.exports = router;