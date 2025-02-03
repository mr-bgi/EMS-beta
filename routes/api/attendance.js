const express = require('express');
const {scanAttendance} = require('../../controller/api/attendance');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();
router.post('/api/attendance/checkin',requireAuth,scanAttendance);

module.exports = router;
