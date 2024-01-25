const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(15);

const createCategorySchema = Joi.object({
  nombre: nombre.required()
});

const updateCategorySchema = Joi.object({
  nombre: nombre,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
