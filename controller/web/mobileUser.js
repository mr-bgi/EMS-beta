const getMobileLogin = (req, res) =>{
    res.render('page/mobile/login');
}
const getMobileHomepage = (req, res) =>{
    res.render('page/mobile/mobile-homepage');
}
const getQrScanner = (req, res) => {
    res.render('page/mobile/qr-scanner');
}
module.exports = {
    getMobileLogin,
    getMobileHomepage,
    getQrScanner
};