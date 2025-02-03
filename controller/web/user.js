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
    getMobileLogin,
    getMobileHomepage,
    getQrScanner
};