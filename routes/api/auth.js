const express = require('express');
const {registerPost,loginPost,logout,getUser, updatePassword, updateEmp, getAllEmp, deleteEmployee} = require('../../controller/api/auth')
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();



router.post('/api/auth/register',registerPost);
router.post('/api/auth/login', loginPost);
router.delete('/api/auth/logout', logout);
router.put('/api/emp/edit-password/:id', updatePassword);


router.put('/api/emp/edit-emp', updateEmp);
router.get('/api/emp/getall', getAllEmp);
// delete use post for test 
router.delete('/api/emp/delete/:id', deleteEmployee);


router.get('/api/me',requireAuth, getUser);
module.exports = router;