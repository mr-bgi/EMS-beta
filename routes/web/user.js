const express = require('express');
const mobileController = require('../../controller/web/mobileUser');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

router.get('/user/login', mobileController.getMobileLogin);
router.get('/user/homepage',requireAuth, mobileController.getMobileHomepage);
router.get('/user/scanner',requireAuth, mobileController.getQrScanner);

module.exports = router;