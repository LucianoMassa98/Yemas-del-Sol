const express = require('express');

const BajasService = require('../services/bajas.service');
const validationHandler = require('../middlewares/validator.handler');
const {  createBajaSchema,getBajaSchema,updateBajaSchema} = require('../schemas/baja.schema');

const router = express.Router();
const service = new BajasService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validationHandler(getBajaSchema,'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createBajaSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log("aquiiiiiiiii");
      const body = req.body;
      const rta = await service.create(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
validationHandler(getBajaSchema,'params'),
validationHandler(updateBajaSchema,'body'),
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
  validationHandler(getBajaSchema, 'params'),
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
