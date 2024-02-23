const express = require('express');
const router = express.Router();
const RemitosProduccionService =require('../services/remitosProduccion.service');
const servicio = new RemitosProduccionService();
const validatorHandler = require('../middlewares/validator.handler');
const {createRemitoProduccion,getRemitoProduccion,updateRemitoProduccion,
  addItemSchema,queryRemitoSchema,subItemSchema} = require('../schemas/remitoproduccion.schema');



router.get('/',
validatorHandler(queryRemitoSchema,'query'),
async(req,res,next)=>{
  try{
    const remitosproduccion = await servicio.find(req.query);
  res.json(remitosproduccion);
  }catch(error){next(error);}

});

router.get('/:id',
validatorHandler(getRemitoProduccion,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtEnP = await servicio.findOne(id,{items:true});
  res.json(rmtEnP);
  }catch(error){next(error);}
});
router.patch('/:id',
validatorHandler(getRemitoProduccion,'params'),
validatorHandler(updateRemitoProduccion,'body'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtEnP = await servicio.update(id,req.body);
  res.json(rmtEnP);
  }catch(error){next(error);}
});

router.post('/',
validatorHandler(createRemitoProduccion,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtEnP = await servicio.create(body);
  res.json(rmtEnP);
  }catch(error){next(error);}

});
router.post('/addItem',
validatorHandler(addItemSchema,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtEnP = await servicio.additem(body);
  res.json(rmtEnP);
  }catch(error){next(error);}

});
router.delete('/:id',
validatorHandler(getRemitoProduccion,'params'),
async (req,res,next)=>{
  try{
  const {id} = req.params;
  const rmtEnP = await servicio.delete(id);
  res.json(rmtEnP);
  }catch(error){next(error);}

});
router.delete('/subItem/:produccionId/:productoId',
validatorHandler(subItemSchema,'params'),
async (req,res,next)=>{
  try{
  const {produccionId,productoId} = req.params;
  const rmtEnP = await servicio.subitem(produccionId,productoId);
  res.json(rmtEnP);
  }catch(error){next(error);}

});

module.exports = router;
