const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app= express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    // cookie name
    name: 'codeial',
    // TODO - change the secret before deployement in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {

        //in miliseconds
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



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