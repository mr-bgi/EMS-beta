const express = require('express');
const { requireAuth } = require('../../middleware/auth');
const { createPosition, getAllPosition, EditPosition, deletePosition } = require('../../controller/api/position');


const router = express.Router();

//Get
router.get('/getAll_Postion', getAllPosition);

//Create
router.post('/create_Position',createPosition);

//Edit
router.put('/edit_Position/:id',  EditPosition);

//Delete
router.delete('/delete_Position/:id', deletePosition);

module.exports = router;