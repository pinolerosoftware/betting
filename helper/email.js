var nodemailer = require('nodemailer');

module.exports = function(emailUser, codeconfirmated) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',    
        auth:{
            user: 'pinolerosoftware@gmail.com',
            pass: 'programacion2013'
        }
    });
    
    var mailOptions = {
        from: 'pinolerosoftware',
        to: emailUser,
        subject: 'Bienvenido',
        text: `Correo de confirmacion de cuenta, para confirmar su cuenta tiene que darle click a este link: http://localhost:9000/users/confirm/${codeconfirmated}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        } else {
            console.log(`Enivando mensaje : ${info.response}`);
        }
    });
}
