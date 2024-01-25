const joi = require('joi');


const id  = joi.number().integer();
const nombre = joi.string().min(3);
const cnt =  joi.number().integer();
const categoryId = joi.number().integer();

 
const createProductoSchema = joi.object({

  nombre: nombre.required(),
  categoryId:categoryId.required()

});

const updateProductoSchema = joi.object({
  nombre,
  cnt
});

const getProductoSchema = joi.object({
  id: id.required()
});

const getQueryProductoSchema = joi.object({
  categoryId
});

module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getQueryProductoSchema

  };
