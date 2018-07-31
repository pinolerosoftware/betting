const userModel = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/users',function(req, res){
    userModel.getUsers(function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});

router.get('/users/:id',function(req, res){
    userModel.getUser(req.params.id,function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});

router.post('/users', function(req, res) {
    let user = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "phone": req.body.phone,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };
    userModel.addUser(user, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

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
    userModel.editUser(user, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

router.delete('/users/:id', function(req, res) { 
    userModel.deleteUser(req.params.id, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

module.exports = router;