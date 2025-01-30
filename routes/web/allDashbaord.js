const express = require('express');
const con = require('../../config/db')
const allDashnaord = require('../../controller/web/allDashbaord')

const router = express.Router();

router.get('/', allDashnaord.getIndex);
router.get('/index-2', allDashnaord.getIndex);
router.get('/calender-page', allDashnaord.getIndex);
router.get('/kanban', allDashnaord.getKanban);
router.get('/message', allDashnaord.getMessage);
router.get('/project-page', allDashnaord.getProject);



module.exports = router;