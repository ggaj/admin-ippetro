const http          = require('http');
const express       = require('express');
const app           = express();
const passport      = require('passport');
const flash         = require('connect-flash');
const path          = require('path');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const models        = require('./app/model');
const env           = process.env.NODE_ENV || 'development';
const config        = require('./config/config.json')[env];
const port          = config.port_api;

// configuration ===============================================================
// //DATABASE
models.sequelize.authenticate().then(() => {
    console.log('Conectado ao MYSQL database:', config.database);
    models.sequelize.sync();//creates table if they do not already exist
})
.catch(err => {
    console.error('Não habilitado a conectar ao MYSQL database:', config.database, err);
});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
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


const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Serivdor executando na porta: ${port}`);
});
// module.exports = app;