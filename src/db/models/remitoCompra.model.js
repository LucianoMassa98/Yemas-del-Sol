const { Model, DataTypes, Sequelize } = require('sequelize');
const {GALPON_TABLE}=require('./galpon.model');
const {USER_TABLE}=require('./user.model');

const REMITOCOMPRA_TABLE = 'RemitosDeCompras';

const RemitoCompraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  galponId: {
    field: 'galpon_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: GALPON_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}


class RemitoCompra extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', });
    this.belongsToMany(models.producto, {
      as: 'items',
      through: models.CompraProducto,
      foreignKey: 'compraId',
      otherKey: 'productoId'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REMITOCOMPRA_TABLE,
      modelName: 'RemitoCompra',
      timestamps: false
    }
  }
}

module.exports = { RemitoCompra, RemitoCompraSchema, REMITOCOMPRA_TABLE };
