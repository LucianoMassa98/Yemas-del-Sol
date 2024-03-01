const express = require('express');
const remitosCompras = require('./remitosCompras.router');
const categoriesRouter = require('./categories.router');
const productosRouter = require('./productos.router');
const remitosProduccion = require('./remitosProduccion.router');
const usuariosRouter = require('./users.router');
const customerRouter = require('./customer.router');
const galponRouter = require('./galpon.router');
const informeRouter = require('./informes.router');
const desechoRouter = require('./desechos.router');
const bajaRouter = require('./bajas.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/remitosCompras', remitosCompras);
  router.use('/categories', categoriesRouter);
  router.use('/remitosProduccion',remitosProduccion);
  router.use('/productos',productosRouter);
  router.use('/usuarios',usuariosRouter);
  router.use('/customers',customerRouter);
  router.use('/galpones',galponRouter);
  router.use('/informes',informeRouter);
  router.use('/bajas',bajaRouter);
  router.use('/desechos',desechoRouter);
}

module.exports = routerApi;

