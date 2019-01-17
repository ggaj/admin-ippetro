// const express       = require('express');
// const app           = express();

// var cookieParser    = require('cookie-parser');
// var bodyParser      = require('body-parser');
// var session         = require('express-session');

// // const routes        = ;
// const path          = require('path');
// const env           = process.env.NODE_ENV || 'development';

// var passport        = require('passport');
// var flash           = require('connect-flash');
// var morgan          = require('morgan');


// const config        = require('./config/config.json')[env];

// const models        = require("./app/model");

// require('./config/passport')(passport);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// //DATABASE
// models.sequelize.authenticate().then(() => {
//     console.log('Conectado ao MYSQL database:', config.database);
//     models.sequelize.sync();//creates table if they do not already exist
// })
// .catch(err => {
//     console.error('Não habilitado a conectar ao MYSQL database:', config.database, err);
// });

// app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//     secret: 'ilovescotchscotchyscotchscotch', // session secret
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session()); 
// app.use(flash());

// require('./routes')(app, passport);
// // require('./app/routes.js')(app, passport);

// module.exports = app;

// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3001;
// var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
const env           = process.env.NODE_ENV || 'development';
const config        = require('./config/config.json')[env];

const path          = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var models       = require('./app/model');

// var configDB = require('./config/database.js');

// configuration ===============================================================
// //DATABASE
models.sequelize.authenticate().then(() => {
    console.log('Conectado ao MYSQL database:', config.database);
    models.sequelize.sync();//creates table if they do not already exist
})
.catch(err => {
    console.error('Não habilitado a conectar ao MYSQL database:', config.database, err);
});
// mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
// app.listen(port);
// console.log('The magic happens on port ' + port);
module.exports = app;