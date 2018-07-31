//Cargamos la configuracion de mysql
const db = require('../config/mysqlConnection');
//Creamos el objeto
let Team = {};
//Agregamos una funcion para obtener la lista de los equipos
Team.get = function(callback) {
    if(db){
        db.query(
            "select * from teams order by name",
            function(error, data) {
                if(error){
                    console.log(error);
                    callback(true, {"error":'Ocurrio un problema con su petición'});
                } else {
                    callback(false, data)
                }
            }
        );
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};
//Agregamos un metodo para obtener un equipo
Team.getOne = function(id, callback){
    if(db){
        db.query(
            `select * from teams where teamID = ${db.escape(id)}`,
            function(error, data) {
                if(error) {
                    console.log(error);
                    callback(true, {"error":'Ocurrio un problema con su petición'});
                } else {
                    callback(false,data);
                }                
            }
        );
    } else {
        console.log('fallo la coneccion con mysql');
        callback(true, {"error":'Ocurrio un problema con su petición'});
    }
};
//Agregamos un metodo para agregar un nuevo equipo
Team.add = function(data, callback) {
    if(db){
        let sql = `insert into teams(name,fullname,logo) 
                              values(${db.escape(data.name)},${db.escape(data.fullname)},${db.escape(data.logo)})`;
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
//Agregamos un metodo para modificar un equipo
Team.edit = function(data, callback) {
    if(db){
        let sql = `update teams set 
                                    name = ${db.escape(data.name)},
                                    fullname = ${db.escape(data.fullname)},
                                    logo = ${db.escape(data.logo)}
                    where teamID = ${db.escape(data.teamID)}`;
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
//Agregamos un metodo para eliminar un usuario
Team.delete = function(id, callback) {
    if(db){
        let sql = ` delete from teams 
                    where teamID = ${db.escape(id)}`;
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

module.exports = Team;