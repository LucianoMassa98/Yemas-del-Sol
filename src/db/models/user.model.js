const { Model, DataTypes, Sequelize } = require('sequelize');
const {CUSTOMER_TABLE} = require('../models/customer.model');
const {ROLE_TABLE} = require('../models/role.model');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId:{
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  roleId:{

    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    //this.belongsTo(models.Role, {as: 'role'});


  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
