const express = require('express');
const con = require('../../config/db')
const allPlugins = require('../../controller/web/allPlugins')

const router = express.Router();

router.get('/map-jpvmap', allPlugins.getJqvmap);
router.get('/uc-lighgallery', allPlugins.getLighgallery);
router.get('/uc-nestable', allPlugins.getNestable);
router.get('/uc-noui-slider', allPlugins.getNouiSlider);
router.get('/uc-select2', allPlugins.getSelect);
router.get('/uc-sweetalert', allPlugins.getSweetalert);
router.get('/uc-toastr', allPlugins.getToastr);
router.get('/widget-basic', allPlugins.getWidget);

module.exports = router;