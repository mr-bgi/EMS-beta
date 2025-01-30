const express = require('express');
const con = require('../../config/db')
const auth = require('../../controller/web/auth')


const router = express.Router();

router.get('/page-login', auth.getLogin);
router.get('/page-Register', auth.getRegister);
router.get('/page-change-pass', auth.getChangePass);

router.get('/page-forgot-password', auth.getForgotPass);
router.get('/page-lock-screen', auth.getLockScreen);

module.exports = router;