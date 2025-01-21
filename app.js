const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const allpage = require('./routes/web/AllPage');
require('dotenv').config();
// * api AUTH
const apiAuth = require('./routes/api/auth');
const app = new express();
const port = process.env.PORT || 8080;

// Web 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// * Static 
app.use(allpage);
// * API auth
app.use(apiAuth);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})  