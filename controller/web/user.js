
const getHomepage = (req, res) => {
    res.render("page/user/home");
};
const getAttendace = (req, res) => {
    res.render("page/user/attendace");
};



module.exports = {
    getHomepage,
    getAttendace
   
}