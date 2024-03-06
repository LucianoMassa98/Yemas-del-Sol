const joi = require('joi');

const fechaDesde = joi.date();
const fechaHasta = joi.date();

const getInformeSchema = joi.object({
fechaDesde: fechaDesde.required(),
fechaHasta: fechaHasta.required()
});


module.exports={getInformeSchema};
