const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BajasService {

  async find() {

    const rta = await models.Baja.findAll();
    if(!rta){ throw boom.notFound("Bajas not found");}
    return rta;
  }

  async findOne(id) {
    const baja = await models.Baja.findByPk(id);
    if (!baja) {
      throw boom.notFound('customer not found');
    }
    return baja;
  }

  async create(data) {

    const newBaja = await models.Baja.create(data);
    if (!newBaja) {
      throw boom.notFound('No se pudo crer el Baja');
    }
    return newBaja;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if (!rta) {
      throw boom.notFound('customer not found');
    }
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    const rta = await model.destroy();
    if (!rta) {
      throw boom.notFound('No se pudo eliminar el Baja');
    }
    return model;
  }



}

module.exports = BajasService;
