const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const RemitosProduccionService = require('./remitosProduccion.service');
const servicio = new RemitosProduccionService();
const RemitosCompraService = require('./remitosCompras.service');
const servicio2 = new RemitosCompraService();
const DesechosService = require('./desechos.service');
const servicio3 = new DesechosService();
const BajasService = require('./bajas.service');
const servicio4 = new BajasService();

class FormulariosService {
  async create() {

    let informe = await servicio.InformeProduccionDia();
        informe += await servicio2.InformeCompraDia();
        informe += await servicio3.InformeMensaje();
        informe += await servicio4.InformeMensaje();

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
  async find(query){

    return {
      ingresos: await servicio2.Informe(query),
      egresos: await servicio.Informe(query),
      desechos: await servicio3.Informe(query),
      bajas: await servicio4.Informe(query)
    };
  }
}
module.exports = FormulariosService;
