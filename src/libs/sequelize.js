const  Sequelize  = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
console.log('Modo Produccion: '+config.isProd);
const date = new Sequelize(config.dbUrl,options);

setupModels(date);

module.exports = date;
