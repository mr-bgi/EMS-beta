const con = require('../../config/db')


const getLogin = (req, res) => {
    res.render("page/auth/page-login");
};

const getChangePass= (req, res) => {
    res.render("page/auth/page-change-pass");
};


module.exports = {
    getLogin,
    getChangePass

}