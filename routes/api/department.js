const express = require('express');
const DepartmentController = require('../../controller/api/department');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

//Get
router.get('/getAllDept', requireAuth,  DepartmentController.getAllDepartment);

//Create
router.post('/createDept',requireAuth, DepartmentController.postCreateDepartment);

//Edit
router.put('/editDept', requireAuth,  DepartmentController.postEditDepartment);

//Delete
router.delete('/deleteDept/:id', requireAuth,  DepartmentController.deleteDepartment);

module.exports = router;