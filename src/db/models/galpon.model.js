const { Model, DataTypes, Sequelize } = require('sequelize');

const GALPON_TABLE = 'galpones';

const GalponSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  enProduccion:{
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER


  }
}


class Galpon extends Model {

  static associate(models) {
   // this.hasMany(models.RemitoProduccion,{as: 'RemitosProduccion', foreignKey: 'galponId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GALPON_TABLE,
      modelName: 'Galpon',
      timestamps: false
    }
  }
}

module.exports = { Galpon, GalponSchema, GALPON_TABLE };
