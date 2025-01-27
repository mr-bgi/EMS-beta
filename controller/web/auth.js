
const { get } = require('lodash');
const con = require('../../config/db')


const getLogin = (req, res) => {
    res.render("page/auth/page-login");
};

const getRegister= (req, res) => {
    res.render("page/auth/page-register");
};

const getChangePass= (req, res) => {
    res.render("page/auth/page-change-pass");
};

const getForgotPass= (req, res) => {
    res.render("page/auth/page-forgot-password");
};

const getLockScreen= (req, res) => {
    res.render("page/auth/page-lock-screen");
};




module.exports = {
    getLogin,
    getRegister,
    getForgotPass,
    getLockScreen,
    getChangePass

}