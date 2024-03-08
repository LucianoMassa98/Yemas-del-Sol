const express = require('express');

const FormulariosService = require('./../services/formularios.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getInformeSchema } = require('../schemas/Informe.schema');

const router = express.Router();
const service = new FormulariosService();

router.get('/',
validatorHandler(getInformeSchema,'query'),
async (req, res, next) => {
  try {
    const informe = await service.find(req.query);
    res.json(informe);
  } catch (error) {
    next(error);
  }
});

router.get('/detalles',
validatorHandler(getInformeSchema,'query'),
async (req, res, next) => {
  try {
    const informe = await service.findDetalle(req.query);
    res.json(informe);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
