const express = require('express');

const GalponService = require('../services/galpon.service');
const validationHandler = require('../middlewares/validator.handler');
const {  createGalponProduccion,getGalponSchema,updateGalponSchema} = require('../schemas/galpon.schema');

const router = express.Router();
const service = new GalponService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});
router.get('/:id',  async (req, res, next) => {
  try {
    const {id} = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createGalponProduccion, 'body'),
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
validationHandler(updateGalponSchema,'body'),
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
  validationHandler(getGalponSchema, 'params'),
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
