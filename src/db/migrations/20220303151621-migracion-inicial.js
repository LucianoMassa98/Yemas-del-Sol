'use strict';

const { USER_TABLE, UserSchema} = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema} = require('../models/customer.model');
const { CATEGORY_TABLE, CategorySchema} = require('../models/category.model');
const { PRODUCTO_TABLE, ProductoSchema} = require('../models/producto.model');
const { GalponSchema, GALPON_TABLE} = require('../models/galpon.model');
const { RemitoCompraSchema, REMITOCOMPRA_TABLE } = require('../models/remitoCompra.model');
const { CompraProductoSchema, COMPRA_PRODUCTO_TABLE} = require('../models/compra-producto.model');
const {REMITOPRODUCCION_TABLE, RemitoProduccionSchema} = require('../models/remitoProduccion.model');
const { ProduccionProductoSchema, PRODUCCION_PRODUCTO_TABLE} = require('../models/produccion-producto.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
    await queryInterface.createTable(USER_TABLE,UserSchema);
   await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
   await queryInterface.createTable(PRODUCTO_TABLE,ProductoSchema);
   await queryInterface.createTable(GALPON_TABLE,GalponSchema);
   await queryInterface.createTable(REMITOCOMPRA_TABLE,RemitoCompraSchema);
   await queryInterface.createTable(COMPRA_PRODUCTO_TABLE,CompraProductoSchema);
   await queryInterface.createTable(REMITOPRODUCCION_TABLE,RemitoProduccionSchema);
   await queryInterface.createTable(PRODUCCION_PRODUCTO_TABLE,ProduccionProductoSchema);


  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCCION_PRODUCTO_TABLE);
    await queryInterface.dropTable(REMITOPRODUCCION_TABLE);
    await queryInterface.dropTable(COMPRA_PRODUCTO_TABLE);
    await queryInterface.dropTable(REMITOCOMPRA_TABLE);
    await queryInterface.dropTable(GALPON_TABLE);
    await queryInterface.dropTable(PRODUCTO_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);

},
};