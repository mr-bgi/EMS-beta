const express = require('express');
const con = require('../../config/db')
const allError = require('../../controller/web/allError')

const router = express.Router();

router.get('/page-error-400', allError.getError400);
router.get('/page-error-403', allError.getError403);
router.get('/page-error-404', allError.getError404);
router.get('/page-error-500', allError.getError500);

module.exports = router;