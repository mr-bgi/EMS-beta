const express = require('express');
const con = require('../../config/db')
const allBootstrap = require('../../controller/web/allBootstrap')

const router = express.Router();

router.get('/ui-accordion', allBootstrap.getAccordion);
router.get('/ui-alert', allBootstrap.getAlert);
router.get('/ui-badge', allBootstrap.getBadge);
router.get('/ui-button-group', allBootstrap.getBouttonGroup);
router.get('/ui-button', allBootstrap.getButton);
router.get('/ui-card', allBootstrap.getCard);
router.get('/ui-carousel', allBootstrap.getCarousel);
router.get('/ui-dropdown', allBootstrap.getDropdown);
router.get('/ui-grid', allBootstrap.getGrid);
router.get('/ui-list-group', allBootstrap.getListGroup);
router.get('/ui-model', allBootstrap.getModel);
router.get('/ui-pagination', allBootstrap.getPagination);
router.get('/ui-popover', allBootstrap.getPopover);
router.get('/ui-progressbar', allBootstrap.getProgressbar);
router.get('/ui-tab', allBootstrap.getTab);
router.get('/ui-typography', allBootstrap.getTypography);

module.exports = router;
