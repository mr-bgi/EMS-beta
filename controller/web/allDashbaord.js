
const getIndex = (req, res) => {
    res.render("page/dashbaord/index");
};
const getIndex2 = (req, res) => {
    res.render("page/dashbaord/index-2");
};
const getCalender= (req, res) => {
    res.render("page/dashbaord/calendar-page");
};
const getContacts= (req, res) => {
    res.render("page/dashbaord/contacts");
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
    getContacts,
    getKanban,
    getMessage,
    getProject
   
}