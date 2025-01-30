const con = require('../../config/db')

const getIndex = (req, res) => {
    res.render("page/dashbaord/index");
};
const getIndex2 = (req, res) => {
    res.render("page/dashbaord/index-2");
};
const getCalender= (req, res) => {
    res.render("page/dashbaord/calender-page");
};
const getKanban = (req, res) => {
    res.render("page/dashbaord/kanban");
};
const getMessage= (req, res) => {
    res.render("page/dashbaord/message");
};
const getProject = (req, res) => {
    res.render("page/dashbaord/project-page");
};



module.exports = {
    getIndex,
    getIndex2,
    getCalender,
    getKanban,
    getMessage,
    getProject
   
}