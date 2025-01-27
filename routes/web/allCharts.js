const express = require('express');
const con = require('../../config/db')
const allCharts = require('../../controller/web/allCharts')

const router = express.Router();

router.get('/chart-chartist', allCharts.getChartist);
router.get('/chart-chartjs',allCharts.getChartjs );
router.get('/chart-float', allCharts.getFloat);
router.get('/chart-morris',allCharts.getMorris );
router.get('/chart-peity', allCharts.getPeity);
router.get('/chart-sparkline',allCharts.getSparkline );


module.exports = router;