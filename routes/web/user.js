const express = require('express');
const allUser = require('../../controller/web/user');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

router.get('/home',allUser.getHomepage);
router.get('/attendace',allUser.getAttendace);
router.get('/request-atten',allUser.getRequestAttendace);

router.get('/user/login', allUser.getMobileLogin);
router.get('/user/homepage',requireAuth, allUser.getMobileHomepage);
router.get('/user/scanner',requireAuth, allUser.getQrScanner);

module.exports = router;