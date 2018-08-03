const teamModel = require('../models/team');
const express = require('express');
const router = express.Router();
//peticion get /users para la lista a los equipos
router.get('/teams', function(req, res){
    teamModel.get(function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});
//peticion get para un equipo
router.get('/teams/:id',function(req, res){
    teamModel.getOne(req.params.id,function(error, data){
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });
});
//peticion post /users para agregar un equipo
router.post('/teams', function(req, res) {
    var team = {
        "name": req.body.name,
        "fullname": req.body.fullname,
        "logo": null
    };
    teamModel.add(team, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});
//peticion put /users/id para modificar un equipo
router.put('/teams', function(req, res) {
    var team = {
        "teamID" : req.body.teamID,
        "name": req.body.name,
        "fullname": req.body.fullname,
        "logo": null
    };
    teamModel.edit(team, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});
//peticion delete /teams/id para eliminar un equipo
router.delete('/teams/:id', function(req, res) { 
    teamModel.delete(req.params.id, function(error, data) {
        if(error){
            res.status(500).json(data);
        } else {
            res.status(200).json(data);
        }
    });   
});

module.exports = router;
