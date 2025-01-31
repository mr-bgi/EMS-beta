const express = require('express');
const {requireAuth} = require('../../middleware/auth');
const { getAllDepart, EditDepart, deleteDepart, createDepart }  = require('../../controller/api/department')
const router = express.Router();

//Get
router.get('/getAll_Dept',getAllDepart  );

//Create
router.post('/create_Dept', createDepart);

//Edit
router.put('/edit_Dept/:id',   EditDepart);

//Delete
router.delete('/delete_Dept/:id',  deleteDepart);

module.exports = router;