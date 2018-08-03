//Cargamos configuracion del mysql
const db = require('../config/mysqlConnection');
//Creamos el objeto
var User = {};
//Agregamos una funcion para obtener la lista de los usuarios
User.get = function(callback){
    if(db){
        db.query(
            "select * from users order by userID",
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
//Agregamos un metodo para obtener un usuario
User.getOne = function(id, callback){
    if(db){
        db.query(
            `select * from users where userID = ${db.escape(id)}`,
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


//Agregamos un metodo para agregar un nuevo usuario
User.add = function(data, callback) {
    if(db){
        var sql = `insert into Users(username,password,email,phone,firstname,lastname) 
                              values(${db.escape(data.username)},sha(md5(${db.escape(data.password)})),${db.escape(data.email)},${db.escape(data.phone)},${db.escape(data.firstname)},${db.escape(data.lastname)})`;
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

//Agregamos un metodo para modificar un usuario
User.edit = function(data, callback) {
    if(db){
        var sql = `update users set 
                                    username = ${db.escape(data.username)},
                                    password = ${db.escape(data.password)},
                                    phone = ${db.escape(data.phone)},
                                    firstname = ${db.escape(data.firstname)},
                                    lastname = ${db.escape(data.lastname)}
                    where userID = ${db.escape(data.userID)}`;
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
User.delete = function(id, callback) {
    if(db){
        var sql = ` delete from users 
                    where userID = ${db.escape(id)}`;
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

module.exports = User;