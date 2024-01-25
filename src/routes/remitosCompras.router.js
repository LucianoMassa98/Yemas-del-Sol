const express = require('express');
const router = express.Router();
const RemitosCompraService =require('../services/remitosCompras.service');
const validatorHandler = require('../middlewares/validator.handler');

const {createRemito,getRemito,
  addItemSchema,subItemSchema,queryRemitoSchema} = require('../schemas/remitoCompra.schema');

const servicio = new RemitosCompraService();

router.get('/',
validatorHandler(queryRemitoSchema,'query'),
async(req,res,next)=>{
  try{
    const remitoscompras = await servicio.find();
  res.json(remitoscompras);
  }catch(error){next(error);}

});


router.get('/:id',
validatorHandler(getRemito,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtC = await servicio.findOne(id);
  res.json(rmtC);
  }catch(error){next(error);}
});

router.post('/',
validatorHandler(createRemito,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtC = await servicio.create(body);
  res.json(rmtC);
  }catch(error){next(error);}

});

router.post('/addItem',
validatorHandler(addItemSchema,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtC = await servicio.additem(body);
  res.json(rmtC);
  }catch(error){next(error);}

});

router.delete('/:id',
  validatorHandler(getRemito,'params'),
async(req,res,next)=>{
  try{
  const {id} = req.params;
  const band = await servicio.delete(id);
  res.json(band);
}catch(error){
  next(error);
}
});

router.delete('/subItem/:compraId/:productoId',
  validatorHandler(subItemSchema,'params'),
async(req,res,next)=>{
  try{
  const {compraId,productoId} = req.params;
  const band = await servicio.subItem(compraId,productoId);
  res.json(band);
}catch(error){
  next(error);
}
});


module.exports = router;
