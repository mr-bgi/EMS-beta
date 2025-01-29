const express = require('express');
const manageProfile = require('../../controller/web/profile-manage')

const router = express.Router();

router.get('/view-profile', manageProfile.getViewProfile);

module.exports = router;