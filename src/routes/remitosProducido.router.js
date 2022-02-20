const express = require('express');
const router = express.Router();
const RemitosProducidoService =require('../services/remitosProducido.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createRemito,getRemito,updateRemito,filtrarFechaRemito} = require('../schemas/remito.schema');

const servicio = new RemitosProducidoService();

//cliente solicita lista de formularios: RMT
router.get('/lista',async(req,res,next)=>{
  try{
    const remitosproducido = await servicio.Buscar();
  res.json(remitosproducido);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/FiltrarPorFecha/:fecha',
validatorHandler(filtrarFechaRemito,'params'),
async (req,res,next)=>{
  try{const {fecha} = req.params;
  const remitosproducido = await servicio.BuscarporFecha(fecha);
  res.json(remitosproducido);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/BuscarporID/:id',
validatorHandler(getRemito,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtP = await servicio.BuscarporID(id);
  res.json(rmtP);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/Crear',
validatorHandler(createRemito,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtP = await servicio.Crear(body);
  res.json(rmtP);
  }catch(error){next(error);}

});


module.exports = router;