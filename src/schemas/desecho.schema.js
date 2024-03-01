const joi = require('joi');

const id= joi.number().integer();

const createDesechoSchema = joi.object({
  galponId: id.required(),
  userId: id.required(),
  cantidad: id.required()
});
const getDesechoSchema = joi.object({
id:id.required()
});

const updateDesechoSchema = joi.object({
  cantidad: id
});

module.exports={createDesechoSchema,getDesechoSchema,updateDesechoSchema};
