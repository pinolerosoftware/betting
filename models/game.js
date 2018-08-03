const db = require('../config/mysqlConnection');
var Game = {};
Game.get = function(callback) {
    if(db){
        db.query(
            `
            select g.gameID,g.date,g.time,g.team1,t1.name as nameEquipo1,t1.fullname as fullNameEquipo1,t1.logo as logo1,g.team2,t2.name as nameEquipo2,t2.fullname as fullNameEquipo2,t2.logo as logo2
            from games as g 
            inner join teams as t1 on g.team1 = t1.teamID
            inner join teams as t2 on g.team2 = t2.teamID
            order by g.date asc
            `,
            function (error, data) {
                if(error){
                    console.log(error);
                    callback(true, {"error":'Ocurrio un problema con su petición'});
                } else {
                    callback(false, data);
                }  
            }
        );
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};

Game.getOne = function (id, callback) {
    if(db){
        db.query(
            `select * from games where gameID = ${db.escape(id)} order by date`,
            function (error, data) {
                if(error){
                    console.log(error);
                    callback(true, {"error":'Ocurrio un problema con su petición'});
                } else {
                    callback(false, data);
                }  
            }
        );
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};

Game.add = function (data, callback) {
    if(db){
        var sql = `
            insert into Games(date,time,team1,result1,team2,result2)
            values(${db.escape(data.date)},${db.escape(data.time)},${db.escape(data.team1)},default,${db.escape(data.team2)},default)
        `;
        db.query(
            sql,
            function (error, inserted) {
                if(error) {
                    console.log(error);
                    callback(true, {"error":'Ocurrio un problema con su petición'});
                } else {
                    data.id = inserted.insertId;
                    callback(false,data);
                }               
            }
        );
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};

Game.edit = function(data, callback) {
    if(db){
        var sql = `update games set 
                                    date = ${db.escape(data.date)},
                                    time = ${db.escape(data.time)},
                                    team1 = ${db.escape(data.team1)},
                                    result1 = ${db.escape(data.result1)},
                                    team2 = ${db.escape(data.team2)},
                                    result2 = ${db.escape(data.resulta2)}
                    where gameID = ${db.escape(data.gameID)}`;
        db.query(sql, function(error, result) {
            if(error) {
                console.log(error);
                callback(true, {"error":'Ocurrio un problema con su petición'});
            } else {                
                callback(false, data);
            }        
        });
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};

Game.delete = function(id, callback) {
    if(db){
        var sql = ` delete from games 
                    where gameID = ${db.escape(id)}`;
        db.query(sql, function (error, result) {
            if(error) {
                console.log(error);
                callback(true, {"error":'Ocurrio un problema con su petición'});
            } else {                
                callback(false, {
                    "mensaje": "Se elimino correctamente"
                });
            }   
        });
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};

module.exports = Game;