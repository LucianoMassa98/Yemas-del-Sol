const express = require('express');

const FormulariosService = require('./../services/formularios.service');
const validatorHandler = require('./../middlewares/validator.handler');
//const { loginUserSchema, updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new FormulariosService();

router.get('/administracion', async (req, res, next) => {
  try {
    //const users = await service.find();
    res.json({});
  } catch (error) {
    next(error);
  }
});



module.exports = router;
