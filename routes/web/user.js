const express = require('express');
const allUser = require('../../controller/web/user');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

router.get('/home',allUser.getHomepage);
router.get('/attendace',allUser.getAttendace);

router.get('/user/login', mobileController.getMobileLogin);
router.get('/user/homepage',requireAuth, mobileController.getMobileHomepage);
router.get('/user/scanner',requireAuth, mobileController.getQrScanner);

module.exports = router;