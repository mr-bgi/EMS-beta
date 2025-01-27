const express = require('express');
const con = require('../../config/db')
const allForms = require('../../controller/web/allForm')

const router = express.Router();

router.get('/form-ckeditor', allForms.getCkeditor);
router.get('/form-element', allForms.getElement);
router.get('/form-pickers', allForms.getPicker);
router.get('/form-validation', allForms.getValidation);
router.get('/form-wizard', allForms.getWizard);

module.exports = router;