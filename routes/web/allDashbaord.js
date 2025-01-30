const express = require('express');
const con = require('../../config/db')
const allDashnaord = require('../../controller/web/allDashbaord')

const router = express.Router();

router.get('/', allDashnaord.getIndex);
router.get('/index-2', allDashnaord.getIndex);
router.get('/calendar-page', allDashnaord.getCalender);
router.get('/contacts', allDashnaord.getCalender);
router.get('/kanban', allDashnaord.getKanban);
router.get('/message', allDashnaord.getMessage);
router.get('/project-page', allDashnaord.getProject);



module.exports = router;