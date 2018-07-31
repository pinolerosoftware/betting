const express = require('express');
const app = express();
//Libreria para mostrar en consola las peticiones
const morgan = require('morgan');
//Libreria para transformar los datos del body en jason 
const bodyParser = require('body-parser');

//configuramos el puerto
app.set('port', process.env.PORT || 4000);

//Linea para agregarle morgan a express
app.use(morgan('dev'));

//line para agregar bodyParser a express
app.use(bodyParser.json());

//Add controller the users in express.
app.use(require('./controller/usersController'));

//Corremos el servidor
app.listen(app.get('port'),() => {
    console.log('Servidor escuchando el puerto ' + app.get('port'));
});