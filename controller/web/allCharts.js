const con = require('../../config/db')

const getChartist = (req, res) => {
    res.render("page/charts/chart-chartist");
};
const getChartjs = (req, res) => {
    res.render("page/charts/chart-chartjs");
};
const getFloat = (req, res) => {
    res.render("page/charts/chart-float");
};
const getMorris = (req, res) => {
    res.render("page/charts/chart-morris");
};
const getPeity = (req, res) => {
    res.render("page/charts/chart-peity");
};
const getSparkline = (req, res) => {
    res.render("page/charts/chart-sparkline");
};


module.exports = {
    getChartist,
    getChartjs,
    getFloat,
    getMorris,
    getPeity,
    getSparkline
}