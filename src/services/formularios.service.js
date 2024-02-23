const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const {config} = require('../config/config');

class FormulariosService {
  async create(data) {

// Configurar el transporte
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailEmisor,
        pass: config.password
    }
});

// Configurar el contenido del correo
let mailOptions = {
    from: config.emailEmisor,
    to: config.emailReceptor,
    subject: 'Nuevo Contacto',
    text: JSON.stringify(data, null, 2)
};

// Enviar el correo
const rta= await transporter.sendMail(mailOptions);
if (!rta) {
    throw boom.notFound("No se pudo enviar los datos de contacto");
}
return true;

  }

}
module.exports = FormulariosService;
