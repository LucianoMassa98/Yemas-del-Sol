'use strict';
const {BAJA_TABLE, bajaSchema} = require('../models/bajas.model');
const { desechoSchema, DESECHO_TABLE} = require('../models/desecho.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(BAJA_TABLE,bajaSchema);
    await queryInterface.createTable(DESECHO_TABLE,desechoSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DESECHO_TABLE);
    await queryInterface.dropTable(BAJA_TABLE);
  }
};
