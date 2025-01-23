const express = require('express');
const { getEmployeeData,getEmployeeById, postfrmCreate, deleteEmp, postEdit } = require('../../controller/api/employee.js');
const { requireAuth } = require('../../middleware/auth.js');

const router = express.Router();

//Get all data
router.get('/employee', getEmployeeData);
router.get('/employee/:id',getEmployeeById)

//post create
router.post('/createEmp',requireAuth, postfrmCreate);

//delete
router.delete('/delete/:id', deleteEmp);

//edit
// router.get('/editEmp/:id', getEdit)
router.put('/editEmp',postEdit)


module.exports = router;