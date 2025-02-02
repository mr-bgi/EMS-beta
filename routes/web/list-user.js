const express = require('express');
const listUser = require('../../controller/web/list-user')

const router = express.Router();

router.get('/list-user',listUser.getListUser);


module.exports = router;