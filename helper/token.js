const jwt = require('jwt-simple');
const moment = require('moment');
const keyToken = "!@#$%^&*()123456789nodees chingon";

function createToken(dataUser) {
    //Agregamos la informacion del usuario 
    //que deseamos que lleve el token al cliente
    const playload = {
        sub: dataUser._id,
        iat: moment.unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(playload, keyToken);
};

function decodeToken(token){
    const decoded = new Promise(function (resolve, reject) { 
        try {
            const playload = jwt.decode(token, keyToken);
            if(playload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(playload.sub);
        } catch (error) {            
            reject({
                status: 500,
                message: 'Token invalido'
            });
        }
    }); 
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};