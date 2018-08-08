const serviceToken = require('../helper/token');

function isAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).json({ message: 'No tiene autorización' });
    }
    const token = req.headers.authorization.split(' ')[1];
    
    serviceToken.decodeToken(token)
    .then(response => {
        req.userid = response;
        next();
    })
    .catch(response => {
        res.status(response.status);
    });
}

module.exports = isAuth;