const express = require('express');
const con = require('../../config/db')
const allFolderApps = require('../../controller/web/allApps')

const router = express.Router();

router.get('/app-calender', allFolderApps.getCalender);
router.get('/app-profile', allFolderApps.getProfile);
router.get('/app-checkout', allFolderApps.getCheckout);
router.get('/ecom-customers', allFolderApps.getCustomer);
router.get('/ecom-invoic', allFolderApps.getInvoice);
router.get('/ecom-product-detail', allFolderApps.getProductDetail);
router.get('/ecom-product-grid', allFolderApps.getProductGrid);
router.get('/ecom-product-list', allFolderApps.getProductList);
router.get('/ecom-product-order', allFolderApps.getProductOrder);
router.get('/email-compose', allFolderApps.getCompose);
router.get('/email-inbox', allFolderApps.getInbox);
router.get('/email-read', allFolderApps.getRead);
router.get('/post-details', allFolderApps.getDetail);


module.exports = router;
