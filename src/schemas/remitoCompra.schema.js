const joi = require('joi');

const galponId =joi.number().integer();
const id = joi.number().integer();
const cnt = joi.number();
const fechaDesde= joi.date();
const fechaHasta= joi.date();

const createRemito = joi.object({
  galponId: galponId.required()
});
const getRemito = joi.object({
  id: id.required()
});
const addItemSchema = joi.object({
  cnt: cnt.required(),
  id: id.required(),
  productoId: id.required(),

});

const subItemSchema = joi.object({
  compraId: id.required(),
  productoId: id.required(),

});

const queryRemitoSchema = joi.object({
  galponId,
  fechaDesde,
  fechaHasta
});
module.exports={createRemito,getRemito,
  addItemSchema,subItemSchema,queryRemitoSchema};
