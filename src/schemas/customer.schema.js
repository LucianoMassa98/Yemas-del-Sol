const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const apellido = Joi.string();
const celular =  Joi.string();
const email = Joi.string().email();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  celular: celular.required(),
  email
});

const updateCustomerSchema = Joi.object({
  nombre,
  apellido,
  celular,
  email
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
