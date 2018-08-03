const gameModel = require('../models/game');
const express = require('express');
const router = express.Router();

router.get('/games', function (req, res) {
    gameModel.get(function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});

router.get('/games/:id',function(req, res){
    userModel.getOne(req.params.id,function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});

router.post('/games', function(req, res) {
    var game = {
        "date": req.body.date,
        "time": req.body.time,
        "team1": req.body.team1,
        "team2": req.body.team2
    };
    userModel.add(game, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

router.put('/games', function(req, res) {
    var game = {
        "gameID" : req.body.gameID,
        "date": req.body.date,
        "time": req.body.time,
        "team1": req.body.team1,
        "team2": req.body.team2
    };
    userModel.edit(game, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

router.delete('/games/:id', function(req, res) { 
    userModel.delete(req.params.id, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

module.exports = router;