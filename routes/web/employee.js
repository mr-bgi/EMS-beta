const express = require('express');
const employeeRoute = require('../../controller/web/employees')

const router = express.Router();

router.get('/create-employee',employeeRoute.creatEmployee);


module.exports = router;