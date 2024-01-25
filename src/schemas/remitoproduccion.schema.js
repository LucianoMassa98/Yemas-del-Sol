const joi = require('joi');

const galponId =joi.number();
const id = joi.number();
const cnt = joi.number();
const produccionId= joi.number().integer();
const productoId= joi.number().integer();
const fechaDesde= joi.date();
const fechaHasta= joi.date();

const createRemitoProduccion = joi.object({
  galponId: galponId.required()
});
const getRemitoProduccion = joi.object({
  id: id.required()
});
const addItemSchema = joi.object({
  cnt: cnt.required(),
  produccionId: produccionId.required(),
  productoId: productoId.required(),

});
const subItemSchema = joi.object({
  produccionId: produccionId.required(),
  productoId: productoId.required(),

});
const queryRemitoSchema = joi.object({
  galponId,
  fechaDesde,
  fechaHasta
});

module.exports={createRemitoProduccion,getRemitoProduccion,
  addItemSchema,queryRemitoSchema,subItemSchema};
