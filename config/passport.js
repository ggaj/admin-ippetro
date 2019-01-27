// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
const bcrypt_p 		 = require('bcrypt');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
// var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('./../app/model');

// load the auth variables
// var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // console.log(User.usuarios);
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.usuarios
            .findByPk(id)
            .then((usuario) => {
                
                done(null, usuario.dataValues)
            })
            .catch((err) => {
                console.log(err)
            });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(async () => {
            let user = await User.usuarios
                    .findOne({ where : { email }})
            
            if (user) {
                let bSenha = await bcrypt_p.compare( password, user.password );
                console.log(bSenha);
                if (bSenha) {
                    
                    return done(null, user.dataValues); 
                } else {
                    
                    return done(null, false, req.flash('loginMessage', 'Oops! E-mail e/ou senha incorretos.'));                    
                }
            }else{
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado!'));
            }
                    // .then( async (user) => {
                    //     if (user) { 
                    //         let u = await bcrypt_p.compare( user.senha, password );
                    //         // .then((result) =>{
                    //         //     console.log(result);
                    //         //     console.log(user.senha);
                    //         //     console.log(password);
                    //         // });
                    //         console.log(u);
                    //         // console.log(bcrypt_p.compare(password, user.senha));
                    //         // console.log(User.usuarios);
                    //         if (user.senha != password) {
                    //             // console.log('Oops! Wrong password.');
                    //             return done(null, false, req.flash('loginMessage', 'Oops! E-mail e/ou senha incorretos.'));                    
                    //         }else{
                    //             // console.log(user.dataValues);
                    //             return done(null, user.dataValues);                    
                    //         }
                    //     }else{
                    //         return done(null, false, req.flash('loginMessage', 'Usuário não encontrado!'));
                    //     }
                    // })
                    // .catch((err) => {
                    //     // console.log('catch')
                    //     return done(err);
                    // })
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-usuarios', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {

                return User.usuarios
                    .findByPk(req.body.id_membro)
                    .then((user) => {
                        console.log(user);
                        if (user) {
                            return done(null, false, req.flash('usuarios', ['alert alert-danger alert-dismissible fade show', `Usuário já cadastrado -> ${user.nome}`]));
                        }else{

                            return User.signup
                                .create(req.body)
                                .then(usuario => {
                                    return done(null, usuario.dataValues, req.flash('usuarios',['alert alert-info alert-dismissible fade show', `Dados gravados com sucesso`]));
                                })
                                .catch((err) => {
                                    return done(err);
                                })
                        }
                    })
                    .catch((err) => {
                        return done(err);
                    })

            // if the user is logged in but has no local account...
            } else if ( !req.user.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                return User.usuarios
                    .findOne({ where : { email: email }})
                    .then((user) => {
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        }else{
                            
                            var user = req.user;
                            user.email = email;
                            userpassword = user.generateHash(password);
                            return User.signup
                                .create(user)
                                .then(usuario => {
                                    return done(null, usuario);
                                })
                                .catch((err) => {
                                    return done(err);
                                })
                        }
                    })
                    .catch((err) => {
                        return done(err);
                    })
                    
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));
}