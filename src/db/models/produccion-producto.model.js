const { Model, DataTypes, Sequelize } = require('sequelize');

const { REMITOPRODUCCION_TABLE } = require('./remitoProduccion.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const PRODUCCION_PRODUCTO_TABLE = 'produccion-productos';

const ProduccionProductoSchema =  {
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
  produccionId: {
    field: 'produccion_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: REMITOPRODUCCION_TABLE,
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

class ProduccionProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCCION_PRODUCTO_TABLE,
      modelName: 'ProduccionProducto',
      timestamps: false
    }
  }
}

module.exports = { ProduccionProducto, ProduccionProductoSchema, PRODUCCION_PRODUCTO_TABLE };
