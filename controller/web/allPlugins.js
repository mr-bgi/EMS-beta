const con = require('../../config/db')

const getJqvmap = (req, res) => {
    res.render("page/plugins/map-jpvmap");
};
const getLighgallery = (req, res) => {
    res.render("page/plugins/uc-lighgallery");
};
const getNestable = (req, res) => {
    res.render("page/plugins/uc-nestable");
};
const getNouiSlider = (req, res) => {
    res.render("page/plugins/uc-noui-slider");
};
const getSelect = (req, res) => {
    res.render("page/plugins/uc-select2");
};
const getSweetalert = (req, res) => {
    res.render("page/plugins/uc-sweetalert");
};
const getToastr = (req, res) => {
    res.render("page/plugins/uc-toastr");
};
const getWidget = (req, res) => {
    res.render("page/plugins/widget-basic");
};


module.exports = {
    getJqvmap,
    getLighgallery,
    getNestable,
    getNouiSlider,
    getSelect,
    getSweetalert,
    getToastr,
    getWidget
}