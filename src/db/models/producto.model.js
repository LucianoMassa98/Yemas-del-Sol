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
  codigo: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cnt: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precio: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0
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
    onDelete: 'CASCADE'
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
