const { Model, DataTypes, Sequelize } = require('sequelize');

const   PRODUCTO_TABLE = 'productos';
 const {CATEGORY_TABLE}=require('./category.model');
const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cnt: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  precio:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }

}

class Producto extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'producto',
      timestamps: false
    }
  }
}


module.exports = { PRODUCTO_TABLE, ProductoSchema, Producto };
