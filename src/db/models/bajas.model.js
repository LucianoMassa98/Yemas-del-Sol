const { Model, DataTypes, Sequelize } = require('sequelize');
const { GALPON_TABLE}=require('./galpon.model');
const { USER_TABLE}=require('./user.model');

const   BAJA_TABLE = 'bajas';

const bajaSchema = {
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
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER
  }

}

class Baja extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', });


  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BAJA_TABLE,
      modelName: 'Baja',
      timestamps: false
    }
  }
}


module.exports = { BAJA_TABLE, bajaSchema, Baja };
