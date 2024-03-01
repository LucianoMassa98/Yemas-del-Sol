const joi = require('joi');

const id= joi.number().integer();

const createBajaSchema = joi.object({
  galponId: id.required(),
  userId: id.required(),
  cantidad: id.required()
});
const getBajaSchema = joi.object({
id:id.required()
});

const updateBajaSchema = joi.object({
  cantidad: id
});

module.exports={createBajaSchema,getBajaSchema,updateBajaSchema};
