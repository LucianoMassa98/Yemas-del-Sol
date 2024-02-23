const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const RemitosProduccionService = require('./remitosProduccion.service');
const servicio = new RemitosProduccionService();
const RemitosCompraService = require('./remitosCompras.service');
const servicio2 = new RemitosCompraService();

class FormulariosService {
  async create() {

    let informe = await servicio.InformeProduccionDia();

    informe += await servicio2.InformeCompraDia();

    // Configurar el transporte
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailEmisor,
        pass: config.password,
      },
    });

    // Configurar el contenido del correo
    let mailOptions = {
      from: config.emailEmisor,
      to: config.emailReceptor,
      subject: 'Informe diario de producción - Yemas del Sol',
      text: informe,
    };

    // Enviar el correo
    const rta = await transporter.sendMail(mailOptions);
    if (!rta) {
      throw boom.notFound('No se pudo enviar los datos de contacto');
    }
    return true;
  }
}
module.exports = FormulariosService;
