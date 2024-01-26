const { Model, DataTypes, Sequelize } = require('sequelize');

const { REMITOCOMPRA_TABLE } = require('./remitoCompra.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const COMPRA_PRODUCTO_TABLE = 'comprasproductos';

const CompraProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cnt: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  compraId: {
    field: 'compra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: REMITOCOMPRA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productoId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class CompraProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_PRODUCTO_TABLE,
      modelName: 'CompraProducto',
      timestamps: false
    }
  }
}

module.exports = { CompraProducto, CompraProductoSchema, COMPRA_PRODUCTO_TABLE };
