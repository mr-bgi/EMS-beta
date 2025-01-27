const con = require('../../config/db')

const getTableBS = (req, res) => {
    res.render("page/table/table-bootstrap-basic");
};
const getTableDatabase = (req, res) => {
    res.render("page/table//table-datatable-basic");
};


module.exports = {
    getTableBS,
    getTableDatabase,
   
}