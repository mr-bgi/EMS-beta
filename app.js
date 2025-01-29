const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// const { checkUser } = require('./middleware/auth');
const apiAuth = require('./routes/api/auth');
const apiEmployee = require('./routes/api/employee');
const apiEmp = require('./routes/api/position');
const apiDept = require('./routes/api/department');

const allFolderApps = require('./routes/web/allApps')
const auth = require('./routes/web/auth')
const allFolderBootstrap = require('./routes/web/allBootstrap')
const allCharts = require('./routes/web/allCharts')
const allDashbaord = require('./routes/web/allDashbaord')
const allError = require('./routes/web/allError')
const allForm = require('./routes/web/AllForm')
const allPlugins = require('./routes/web/allPlugins')
const allTable = require('./routes/web/allTable')


require('dotenv').config();
// * api AUTH

const app = new express();
const port = process.env.PORT || 3308 || 3306;

// Web 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('storage'));
app.use(fileUpload());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('*', checkUser);
// * Static 
// app.use(allpage);
//API
app.use(apiAuth);
app.use(apiEmployee);
app.use(apiEmp);
app.use(apiDept);

//Web
app.use(allFolderApps);
app.use(auth);
app.use(allFolderBootstrap);
app.use(allCharts);
app.use(allDashbaord);
app.use(allError);
app.use(allForm);
app.use(allPlugins);
app.use(allTable);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})  