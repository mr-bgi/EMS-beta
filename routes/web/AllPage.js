const allpageControllers = require('../../controller/web/AllPage');
const express = require('express');

const router = express.Router();

router.get('/calender', allpageControllers.calender);
router.get('/profile', allpageControllers.profile);
router.get('/calender-page', allpageControllers.calenderPage);
router.get('/chartist', allpageControllers.chartist);
router.get('/chartjs', allpageControllers.chartJS);
router.get('/ecomcustomer', allpageControllers.ecomCustomer);
router.get('/ecomgrid', allpageControllers.ecomInvoice);
router.get('/ecomlist', allpageControllers.ecomProductList)
router.get('/ecomorder', allpageControllers.ecomProductOrder);
router.get('/emailcompose', allpageControllers.emailCompose);
router.get('/emailInbox', allpageControllers.emailInbox);

module.exports = router;