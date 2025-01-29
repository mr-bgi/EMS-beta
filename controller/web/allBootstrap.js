const con = require('../../config/db')

const getAccordion = (req, res) => {
    res.render("page/bootstrap/ui-accordion");
};
const getAlert = (req, res) => {
    res.render("page/bootstrap/ui-alert");
};
const getBadge = (req, res) => {
    res.render("page/bootstrap/ui-badge");
};
const getBouttonGroup = (req, res) => {
    res.render("page/bootstrap/ui-button-group");
};
const getButton = (req, res) => {
    res.render("page/bootstrap/ui-button");
};
const getCard = (req, res) => {
    res.render("page/bootstrap/ui-card");
};
const getCarousel = (req, res) => {
    res.render("page/bootstrap/ui-carousel");
};
const getDropdown = (req, res) => {
    res.render("page/bootstrap/ui-dropdown");
};
const getGrid = (req, res) => {
    res.render("page/bootstrap/ui-grid");
};
const getListGroup = (req, res) => {
    res.render("page/bootstrap/ui-list-group");
};
const getModel = (req, res) => {
    res.render("page/bootstrap/ui-modal");
};
const getPagination = (req, res) => {
    res.render("page/bootstrap/ui-pagination");
};
const getPopover = (req, res) => {
    res.render("page/bootstrap/ui-popover");
};
const getProgressbar = (req, res) => {
    res.render("page/bootstrap/ui-progressbar");
};
const getTab = (req, res) => {
    res.render("page/bootstrap/ui-tab");
};
const getTypography = (req, res) => {
    res.render("page/bootstrap/ui-typography");
};


module.exports = {
    getAccordion,
    getAlert,
    getBadge,
    getBouttonGroup,
    getButton,
    getCard,
    getCarousel,
    getDropdown,
    getGrid,
    getListGroup,
    getModel,
    getPagination,
    getPopover,
    getProgressbar,
    getTab,
    getTypography

}