const con = require('../../config/db')

const getError400 = (req, res) => {
    res.render("page/error/page-error-400");
};
const getError403 = (req, res) => {
    res.render("page/error/page-error-403");
};
const getError404 = (req, res) => {
    res.render("page/error/page-error-400");
};
const getError500 = (req, res) => {
    res.render("page/error/page-error-500");
};


module.exports = {
    getError400,
    getError403,
    getError404,
    getError500

}