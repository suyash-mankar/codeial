const express = require('express');
const app= express();
const port = 8000;


//use express router
//any request that comes in require the index.js of routes
app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        // console.log('Error', err);
        console.log(`Error in running the server: ${err}`); //Interpolation
    }
    console.log(`server is running on port: ${port}`);

})