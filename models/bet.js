const db = require('../config/mysqlConnection');
let Bet = {};
Bet.getForUser = function (id, callback) {
    if(db) {
        let sql = `
                select b.betID,b.result1,b.result2,b.amount,b.userID,u.username,u.firstname,u.lastname,g.*
                from bets as b
                inner join users as u on b.userID = u.userID
                inner join 
                (
                    select g.gameID,g.date,g.time,g.team1,t1.name as nameEquipo1,t1.fullname as fullNameEquipo1,t1.logo as logo1,g.team2,t2.name as nameEquipo2,t2.fullname as fullNameEquipo2,t2.logo as logo2
                    from games as g 
                    inner join teams as t1 on g.team1 = t1.teamID
                    inner join teams as t2 on g.team2 = t2.teamID
                ) as g on b.gameID = g.gameID
                where b.userID = ${db.escape(id)}
        `;
        db.query(
            sql,
            function (error, data) {
                if(error) {
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

Bet.add = function (data, callback) {
    if(db) {
        let sql = `
            insert into bets(gameID,userID,result1,result2,amount) 
                values(${db.escape(data.gameID)},${db.escape(data.userID)},${db.escape(data.result1)},${db.escape(data.result2)},${db.escape(data.amount)})
        `;
        db.query(
            sql,
            function(error, inserted) {
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

Bet.edit = function(data, callback) {
    if(db){
        let sql = `update bets set 
                                    gameID = ${db.escape(data.gameID)},
                                    userID = ${db.escape(data.userID)},
                                    result1 = ${db.escape(data.result1)},
                                    result2 = ${db.escape(data.result2)},
                                    amount = ${db.escape(data.amount)}
                    where betID = ${db.escape(data.betID)}`;
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

Bet.delete = function(id, callback) {
    if(db){
        let sql = ` delete from bets 
                    where betID = ${db.escape(id)}`;
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

module.exports = Bet;