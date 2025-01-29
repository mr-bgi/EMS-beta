const con = require('../../config/db')

const getCkeditor = (req, res) => {
    res.render("page/forms/form-ckeditor");
};
const getElement = (req, res) => {
    res.render("page/forms/form-element");
};
const getPicker = (req, res) => {
    res.render("page/forms/form-pickers");
};
const getValidation = (req, res) => {
    res.render("page/forms/form-validation");
};
const getWizard = (req, res) => {
    res.render("page/forms/form-wizard");
};




module.exports = {
    getCkeditor,
    getElement,
    getPicker,
    getValidation,
    getWizard
    
}