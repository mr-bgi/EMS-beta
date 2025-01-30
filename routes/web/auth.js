const express = require('express');
const auth = require('../../controller/web/auth')


const router = express.Router();

router.get('/page-login', auth.getLogin);
router.get('/page-change-pass', auth.getChangePass);

module.exports = router;