const getMobileLogin = (req, res) =>{
    res.render('page/user/login');
}

const getMobileHomepage = (req, res) =>{
    const userAgent = req.headers['user-agent'];
    console.log(isMobile(userAgent));
    res.render('page/user/mobile-homepage');
}
const getQrScanner = (req, res) => {
    res.render('page/user/qr-scanner');
}
module.exports = {
    getMobileLogin,
    getMobileHomepage,
    getQrScanner
};

function isMobile(userAgent) {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
}