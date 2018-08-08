const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const email = require('../helper/email');
const token = require('../helper/token');
const auth = require('../middleware/auth');
//peticion get para un usuario
router.get('/users/confirm/:code',function(req, res){    
    mongoose.connect('mongodb://localhost:27017/betting', function(error) {
        if(error) {             
            //guardar = false;
            res.status(500).json({ "mensaje": "Ocurrio un problema con su petición"});
            //res.end();
        } else {
            User.findOne({ codeconfirmated: req.params.code }, function (err, data) {
                if(err)
                    res.status(500).json({ "confirmed": false });
                else {
                    if(data) {
                        User.findByIdAndUpdate( { _id: data._id }, { confirmated: true }, function (errUpdate) {
                            if(errUpdate)
                                res.status(500).json({ "confirmed": false });
                            else
                                res.status(200).json({ "confirmed": true });
                        });                        
                    }
                    else
                        res.status(500).json({ "confirmed": false });              
                }
            });
        }
    });   
});
//peticion post /users para registrar
router.post('/users/signup', function(req, res) {   
    //console.log(req.body);
    mongoose.connect('mongodb://localhost:27017/betting', function(error) {
        //let guardar = true;        
        if(error) {             
            //guardar = false;
            res.status(500).json({ "mensaje": "Ocurrio un problema con su petición"});
            //res.end();
        } else {
            //Buscar el usuario si existe
            User.find({ username: req.body.username }, function (err, dusername) {
                if (err) { 
                    ///guardar = false;
                    //res.setHeader("Content-Type", "application/json");
                    res.status(500).json({ "mensaje": "Ocurrio un problema con su petición"});            
                    //res.end();
                } else {
                    if (dusername.length > 0) { 
                        //guardar = false;
                        //res.setHeader("Content-Type", "application/json");
                        res.status(404).json({ "mensaje": `El usuario ${req.body.username} ya esta registrado` });  
                        //res.end();     
                    } else {
                        //Buscar el email si existe
                        User.find({ email: req.body.email }, function (err, demail) {
                            if (err) {
                                //guardar = false;
                                //res.setHeader("Content-Type", "application/json");
                                res.status(500).json({ "mensaje": "Ocurrio un problema con su petición" });        
                                //res.end();       
                            } else {
                                if (demail.length > 0) {
                                    //guardar = false;
                                    //res.setHeader("Content-Type", "application/json");
                                    res.status(404).json({ "mensaje": `El email ${req.body.email} ya esta registrado` });                    
                                    //res.end();
                                } else {
                                    var user = new User();
                                    user.username = req.body.username;
                                    user.password = SHA256(req.body.password).toString();
                                    user.email = req.body.email;
                                    user.phone = req.body.phone;
                                    user.firstname = req.body.firstname;
                                    user.lastname = req.body.lastname;
                                    user.confirmated  = false;
                                    user.codeconfirmated = SHA256(req.body.email + '-&*!@#$?^_' + req.body.username).toString();
                    
                                    user.save(function(e, d) {                                        
                                        if(e){
                                            //res.setHeader("Content-Type", "application/json");
                                            res.status(500).json({'mensaje': 'Error al agregar un usuario'});
                                            //res.end();
                                        } else {
                                            email(d.email, d.codeconfirmated);
                                            //res.setHeader("Content-Type", "application/json");
                                            res.json({ token: token.createToken(d) });
                                            //res.end();
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });    
        }
    });
});
//Login
router.post('/users/signin', function (req, res) {
    //Conectamos con mongo
    mongoose.connect('mongodb://localhost:27017/betting', function (error) {
        if(error) {
            res.status(500).json({ "mensaje": "Ocurrio un problema con su petición"});
        } else {            
            User.findOne({ email: req.body.email, password : SHA256(req.body.password).toString() }, function(err, user) {
                if(err) {
                    res.status(404).json({ "mensaje": 'El email o contraseña incorrecto no esta registrado'})
                } else {
                    if(user === null){
                        res.status(404).json({ "mensaje": 'El email o contraseña incorrecto no esta registrado'})
                    } else {
                        res.status(200).json({ token: token.createToken(user) });
                    }                 
                }
            });
        }
    });
});
//Perfil de usuario
router.get('/users/perfil', auth, function(req, res){
    mongoose.connect('mongodb://localhost:27017/betting', function (error) {
        if(error) {
            res.status(500).json({ "mensaje": "No se pudo completar la petición"});
        } else {
            User.findOne({ _id: req.userid }, 'username email firstname lastname phone ', function (err, user){
                if(err) {
                    res.status(500).json({ "mensaje": "Usuario no encontrado"});
                } else {
                    res.status(200).json(user);
                }
            });
        }
    });
})

module.exports = router;