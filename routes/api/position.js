const express = require('express');
const PositionController = require('../../controller/api/position');
const {requireAuth} = require('../../middleware/auth');

const router = express.Router();

//Get
router.get('/getAllPostion', requireAuth,  PositionController.getAllPosition);

//Create
router.post('/createPosition',requireAuth, PositionController.postCreatePosition);

//Edit
router.put('/editPosition', requireAuth,  PositionController.postEditPosition);

//Delete
router.delete('/deletePosition/:id', requireAuth,  PositionController.deletePosition);

module.exports = router;