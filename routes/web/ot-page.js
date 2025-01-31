const express = require('express');
const con = require('../../config/db');
const otController = require('../../controller/web/ot-page');

const router = express.Router();

router.get('/ot-page',otController.getOTPage );

module.exports = router;