const allpageControllers = require('../../controller/web/AllPage');
const express = require('express');
const { requireAuth, authorize } = require('../../middleware/auth');

const router = express.Router();


router.get('/', requireAuth, (req, res) => {
    res.render('index');
    res.json({
        msg: 'index page here'
    })
});
router.get('/admin', requireAuth,authorize(['admin']), (req, res) => {
    res.render('admin');
    res.json({
        msg: 'only admin can access here!'
    })
});

module.exports = router;