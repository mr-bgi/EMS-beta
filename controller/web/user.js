
const getHomepage = (req, res) => {
    res.render("page/user/home");
};
const getAttendace = (req, res) => {
    res.render("page/user/attendace");
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
    getMobileLogin,
    getMobileHomepage,
    getQrScanner
};
