const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().min(8);
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  userName: userName.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  userName,
  password
});
const loginUserSchema = Joi.object({
  userName:userName.required(),
  password: password.required()
});
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { loginUserSchema,createUserSchema, updateUserSchema, getUserSchema }
