const userModel = require('../models/user');
const express = require('express');
const router = express.Router();
//peticion get /users para la lista a los usuario
router.get('/users',function(req, res){
    userModel.get(function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});
//peticion get para un usuario
router.get('/users/:id',function(req, res){
    userModel.getOne(req.params.id,function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});
//peticion post /users para agregar un usuario
router.post('/users', function(req, res) {
    let user = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "phone": req.body.phone,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };
    userModel.add(user, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});
//peticion put /users para modificar un usuario
router.put('/users', function(req, res) {
    let user = {
        "userID" : req.body.userID,
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "phone": req.body.phone,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };
    userModel.edit(user, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});
//peticion delete /users/id para eliminar un usuario
router.delete('/users/:id', function(req, res) { 
    userModel.delete(req.params.id, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

module.exports = router;