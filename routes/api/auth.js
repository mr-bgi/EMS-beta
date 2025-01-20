const express = require('express');
const { registerPost, loginPost, logout,getUser } = require('../../controller/api/auth');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();



router.post('/api/auth/register', registerPost);
router.post('/api/auth/login', loginPost);
router.delete('/api/auth/logout', logout);


router.get('/api/me',requireAuth, getUser);
module.exports = router;