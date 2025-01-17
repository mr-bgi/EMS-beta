const express = require('express');

const calender = (req, res) => {
    res.render('app-calender');
}
const profile = (req, res) => {
    res.render('app-profile');
}
const calenderPage = (req, res) => {
    res.render('calendar-page');
}
const chartist = (req, res) => {
    res.render('chart-chartist');
}
const chartJS = (req, res) => {
    res.render('chart-chartjs');
}
const ecomCustomer = (req, res) =>{
    res.render('ecom-customers');
}
const ecomInvoice = (req, res) => {
    res.render('ecom-invoice');
}
const ecomProductDetail = (req, res) => {
    res.render('ecom-product-detail');
}
const ecomProductGrid = (req, res) => {
    res.render('ecom-product-grid');
}
const ecomProductList = (req, res) => {
    res.render('ecom-product-list');
}
const ecomProductOrder = (req, res) => {
    res.render('ecom-product-order');
}
const emailCompose = (req, res) => {
    res.render('email-compose');
}
const emailInbox = (req,res) => {
    res.render('email-inbox');
}
const emailRead = (req, res) => {
    res.render('email-read');
}
const index2 = (req, res) => {
    res.render('index-2');
}
const kaban = (req, res) => {
    res.render('kaban');
}
const map = (req, res) => {
    res.render('map-jqvmap');
}
const message = (req, res) =>{
    res.render('message');
}
const page400 = (req, res) => {
    res.render('page-error-400');
}
const page403 = (req, res) => {
    res.render('page-error-403');
}
const page404 = (req, res) => {
    res.render('page-error-404');
}
const page500 = (req, res) => {
    res.render('page-error-500');
}
const page503 = (req, res) => {
    res.render('page-error-503');
}
const tbl_bootstrap = (req, res) =>{
    res.render('table-bootstrap-basic')
}
const tbl_database = (req, res) => {
    res.render('table-datatable-basic');
}
const lightGallery = (req, res) => { 
    res.render('uc-lightgallery');
}
const nestable = (req, res) => {
    res.render('uc-nestable');
}
const noui = (req, res) =>{
    res.render('uc-noui-slider');
}
const sweetalert = (req, res) => {
    res.render('uc-sweetalert2');
}
const toast = (req, res) => {
    res.render('uc-toastr');
}
const accordion = (req, res) =>{
    res.render('ui-accordion');
}
const alert = (req, res) => {
    res.render('ui-alert')
}
const grid = (req, res) =>{
    res.render('ui-grid');
}
const listGroup = (req, res) => {
    res.render('ui-list-group')
}
const modal = (req, res) => {
    res.render('ui-modal');
}
const pagination = (req, res) => {
    res. render('ui-pagination')
}
const popover = (req, res) => {
    res.render('ui-popover');
}
const progressbar = (req, res) =>{
    res.render('ui-progressbar');
}
const tab = (req, res) => {
    res.render('ui-tab');
}
const typography = (req, res) => {
    res.render('ui-typography');
}

const widget = (req, res) =>{
    res.render('widget-basic');
}

module.exports = {
    calender,
    profile,
    calenderPage,
    chartist,
    chartJS,
    ecomCustomer,
    ecomInvoice,
    ecomProductDetail,
    ecomProductGrid,
    ecomProductList,
    ecomProductOrder,
    emailCompose,
    emailInbox,
    emailRead,
    index2,
    map,
    kaban,
    message,
    page400,
    page403,
    page404,
    page503,
    page500,
    tbl_bootstrap,
    tbl_database,
    lightGallery,
    nestable,
    noui,
    sweetalert,
    toast,
    accordion,
    alert,
    grid,
    listGroup,
    modal,
    pagination,
    popover,
    progressbar,
    tab,
    typography,
    widget
}
