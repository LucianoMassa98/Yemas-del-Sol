const joi = require('joi');

const galponId =joi.number().integer();
const userId =joi.number().integer();

const id = joi.number().integer();
const cnt = joi.number().integer();
const produccionId= joi.number().integer();
const productoId= joi.number().integer();
const fechaDesde= joi.date();
const fechaHasta= joi.date();
const createdAt= joi.date();
const createRemitoProduccion = joi.object({
  userId: userId.required()
});
const updateRemitoProduccion = joi.object({
  galponId: galponId.required(),
  createdAt
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

module.exports={createRemitoProduccion,getRemitoProduccion,updateRemitoProduccion,
  addItemSchema,queryRemitoSchema,subItemSchema};
