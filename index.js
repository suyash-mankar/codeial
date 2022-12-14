const express = require("express");
const env = require("./config/environment");
const logger = require("morgan");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

require("./config/view-helpers")(app);
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const path = require("path");

app.use(cors());

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "/scss"),
      dest: path.join(__dirname, env.asset_path, "/css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(env.asset_path));

// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the DB
app.use(
  session({
    // cookie name
    name: "codeial",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),

    cookie: {
      //in miliseconds
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

//use express router
//any request that comes in, require the index.js of routes
app.use("/", require("./routes"));

const server = app.listen(port, function (err) {
  if (err) {
    // console.log('Error', err);
    console.log(`Error in running the server: ${err}`); //Interpolation
  }
  console.log(`server is running on port: ${port}`);
});

// setup the chat server to be used with socket.io
// const chatServer = require('http').createServer(app);
const chatSockets = require("./config/chat_sockets").chatSockets(server);
console.log("chat server is listening on port 8000");
