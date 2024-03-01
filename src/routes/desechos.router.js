const express = require('express');

const DesechosService = require('../services/desechos.service');
const validationHandler = require('../middlewares/validator.handler');
const {createDesechoSchema,getDesechoSchema,updateDesechoSchema} = require('../schemas/desecho.schema');

const router = express.Router();
const service = new DesechosService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validationHandler(getDesechoSchema,'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createDesechoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
validationHandler(getDesechoSchema,'params'),
validationHandler(updateDesechoSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await service.update(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});

router.delete('/:id',
  validationHandler(getDesechoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
