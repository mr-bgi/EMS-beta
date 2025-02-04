
const getHomepage = (req, res) => {
    res.render("page/user/home");
};
const getAttendace = (req, res) => {
    res.render("page/user/attendace");
};
const getRequestAttendace= (req, res) => {
    res.render("page/user/request-atten");
};
const getMobileLogin = (req, res) =>{
    res.render('page/user/login');
}
const getMobileHomepage = (req, res) =>{
    res.render('page/user/mobile-homepage');
}
const getQrScanner = async (req, res) => {
    res.render('page/user/qr-scanner');
}
module.exports = {
    getHomepage,
    getAttendace,
    getRequestAttendace,
    getMobileLogin,
    getMobileHomepage,
    getQrScanner
};
