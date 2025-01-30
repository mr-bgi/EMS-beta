const express = require('express');
const mobileController = require('../../controller/web/mobileUser');

const router = express.Router();

router.get('/mobile/login', mobileController.getMobileLogin);
router.get('/mobile/homepage', mobileController.getMobileHomepage);
router.get('/mobile/qr-scanner', mobileController.getQrScanner);

module.exports = router;