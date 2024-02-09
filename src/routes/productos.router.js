const express = require('express');
const router = express.Router();
const ProductoServicio = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductoSchema,
   updateProductoSchema,
    getProductoSchema,
    getQueryProductoSchema} = require('../schemas/producto.schema');

const servicio = new ProductoServicio();


router.get('/',
validatorHandler(getQueryProductoSchema, 'query'),
async (req,res,next)=>{
 try{
  const productos = await servicio.find(req.query);
  res.json(productos);
 }catch(error){next(error);}


 });

router.get('/:id',
validatorHandler(getProductoSchema, 'params'),
  async(req, res,next)=>{
  try{

    const { id } = req.params;
    const producto = await servicio.findOne(id);
    res.json(producto);

  }catch(error){
    next(error);
  }

});

router.post('/',
validatorHandler(createProductoSchema,'body'),
  async(req,res,next)=>{
  try{
    const body = req.body;
    const newproduct = await servicio.create(body);
    res.json(newproduct);

  }catch(error){ next(error);}

  });
  router.post('/generador',
  async(req,res,next)=>{
  try{
    const newproduct = await servicio.generador();
    res.json(newproduct);

  }catch(error){ next(error);}

  });

router.patch('/:id',
validatorHandler(updateProductoSchema,'body'),
  async(req,res,next)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.update(id,body);
  res.json(producto);
  }catch(error){
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getProductoSchema,'params'),
async(req,res,next)=>{
  try{
  const {id} = req.params;
  const band = await servicio.delete(id);
  res.json(band);
}catch(error){
  next(error);
}
});

module.exports = router;
