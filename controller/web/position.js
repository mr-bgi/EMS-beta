const con = require('../../config/db')

const getAllPosition = (req, res) => {
    res.render("page/position");
};



module.exports = {
   getAllPosition,
   
}