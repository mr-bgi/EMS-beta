const con = require("../../config/db");

const getCalender = (req, res) => {
    res.render("page/apps/app-calender");
};
const getProfile = (req, res) => {
    res.render("page/apps/app-profile");
};
const getCheckout = (req, res) => {
    res.render("page/apps/app-checkout");
};
const getCustomer = (req, res) => {
    res.render("page/apps/ecom-customers");
};
const getInvoice = (req, res) => {
    res.render("page/apps/ecom-invoice");
};
const getProductDetail = (req, res) => {
    res.render("page/apps/ecom-product-detail");
};
const getProductGrid = (req, res) => {
    res.render("page/apps/ecom-product-grid");
};
const getProductList = (req, res) => {
    res.render("page/apps/ecom-product-list");
};
const getProductOrder = (req, res) => {
    res.render("page/apps/ecom-product-order");
};
const getCompose = (req, res) => {
    res.render("page/apps/email-compose");
};

const getInbox = (req, res) => {
    res.render("page/apps/email-inbox");
};
const getRead = (req, res) => {
    res.render("page/apps/email-read");
};
const getDetail = (req, res) => {
    res.render("page/apps/post-details");
};


module.exports = { 
    getCalender,
    getProfile,
    getCheckout,
    getCustomer,
    getInvoice,
    getProductDetail,
    getProductGrid,
    getProductList,
    getProductOrder,
    getCompose,
    getInbox,
    getRead,
    getDetail
};