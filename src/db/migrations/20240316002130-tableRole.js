'use strict';

const { RoleSchema, ROLE_TABLE} = require('../models/role.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable(ROLE_TABLE);
  }
};
