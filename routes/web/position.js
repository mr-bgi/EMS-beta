const express = require('express');
const con = require('../../config/db');
const departmentController = require('../../controller/web/position');

const router = express.Router();

router.get('/position', departmentController.getAllPosition);

module.exports = router;