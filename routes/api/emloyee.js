const express = require('express');
const { getEmployeeData, postfrmCreate, deleteEmp, getEdit, postEdit } = require('../../controller/api/employee');
// const { requireAuth } = require('../../middleware/auth');

const router = express.Router();

//Get all data
router.get('/employee', getEmployeeData);

//post create
router.post('/createEmp', postfrmCreate);

//delete
router.delete('/delete/:id', deleteEmp);

//edit
router.get('/editEmp/:id', getEdit)
router.put('/editEmp',postEdit)


module.exports = router;