const express = require('express');
const employeeRoute = require('../../controller/web/employee')

const router = express.Router();

router.get('/create-employee',employeeRoute.creatEmployee);
router.get('/list-employee',employeeRoute.getListEmployee);
router.get('/payroll',employeeRoute.payRollEmployee);


module.exports = router;