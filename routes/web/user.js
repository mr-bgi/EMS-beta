const express = require('express');
const allUser = require('../../controller/web/user');

const router = express.Router();

router.get('/home',allUser.getHomepage);
router.get('/attendace',allUser.getAttendace);

module.exports = router;