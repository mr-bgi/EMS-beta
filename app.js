const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const allpage = require('./routes/web/AllPage');

const app = new express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(allpage);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})