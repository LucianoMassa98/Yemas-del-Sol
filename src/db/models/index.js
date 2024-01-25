
const {Customer, CustomerSchema}=require('./customer.model');
const { User, UserSchema } = require('./user.model');

const { Galpon, GalponSchema}=require('./galpon.model');
const { Category, CategorySchema } = require('./category.model');
const{  Producto, ProductoSchema}=require('./producto.model');

const{RemitoCompra,RemitoCompraSchema}=require('./remitoCompra.model');
const {CompraProducto, CompraProductoSchema}=require('./compra-producto.model');

const{RemitoProduccion, RemitoProduccionSchema}=require('./remitoProduccion.model');
const { ProduccionProducto, ProduccionProductoSchema}=require('./produccion-producto.model');

function setupModels(sequelize) {

  
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));

  Category.init(CategorySchema,Category.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  RemitoCompra.init(RemitoCompraSchema, RemitoCompra.config(sequelize));
  CompraProducto.init(CompraProductoSchema,CompraProducto.config(sequelize));
  Galpon.init(GalponSchema,Galpon.config(sequelize));
  RemitoProduccion.init(RemitoProduccionSchema,RemitoProduccion.config(sequelize));
  ProduccionProducto.init(ProduccionProductoSchema,ProduccionProducto.config(sequelize));

 
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Producto.associate(sequelize.models);
  RemitoCompra.associate(sequelize.models);
  Galpon.associate(sequelize.models);
  RemitoProduccion.associate(sequelize.models);
  ProduccionProducto.associate(sequelize.models);
}

module.exports = setupModels;
