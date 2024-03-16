'use strict';
const {  USER_TABLE} = require('../models/user.model');
const {  ROLE_TABLE} = require('../models/role.model');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(USER_TABLE, 'roleId', {
      field: 'role_id',
    allowNull: true,
    defaultValue: 1,
    type: Sequelize.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
