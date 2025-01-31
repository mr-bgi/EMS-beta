const con = require('../../config/db')

const getOTPage = (req, res) => {
    res.render("page/ot-page");
};



module.exports = {
   getOTPage,
   
}