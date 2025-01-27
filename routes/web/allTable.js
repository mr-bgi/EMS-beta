const express = require('express');
const con = require('../../config/db')
const allTable = require('../../controller/web/allTable')

const router = express.Router();

router.get('/table-bootstrap-basic', allTable.getTableBS);
router.get('/table-datatable-basic', allTable.getTableDatabase);

module.exports = router;