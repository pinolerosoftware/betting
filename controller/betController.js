const betModel = require('../models/bet');
const express = require('express');
const router = express.Router();
router.get('/bets/:id',function(req, res){
    betModel.getForUser(req.params.id, function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});

router.post('/bets', function(req, res) {
    let bet = {
        "gameID": req.body.gameID,
        "userID": req.body.userID,
        "result1": req.body.result1,
        "result2": req.body.result2,
        "amount": req.body.amount
    };
    betModel.add(bet, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

router.put('/bets', function(req, res) {
    let bet = {
        "betID": req.body.betID,
        "gameID": req.body.gameID,
        "userID": req.body.userID,
        "result1": req.body.result1,
        "result2": req.body.result2,
        "amount": req.body.amount
    };
    betModel.edit(bet, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

router.delete('/bets/:id', function(req, res) { 
    betModel.delete(req.params.id, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

module.exports = router;