const express = require('express');
const app= express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
//any request that comes in require the index.js of routes
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


console.log('inside main index.js');
app.listen(port, function(err){
    if(err){
        // console.log('Error', err);
        console.log(`Error in running the server: ${err}`); //Interpolation
    }
    console.log(`server is running on port: ${port}`);

})