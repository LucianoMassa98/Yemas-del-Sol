const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class DesechosService {

  async find() {


    const rta = await models.Desecho.findAll();
    return rta;
  }

  async findOne(id) {
    const desecho = await models.Desecho.findByPk(id);
    if (!desecho) {
      throw boom.notFound('customer not found');
    }
    return desecho;
  }

  async create(data) {

    const newDesecho = await models.Desecho.create(data);
    if (!newDesecho) {
      throw boom.notFound('No se pudo crer el Desecho');
    }
    return newDesecho;
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
      throw boom.notFound('No se pudo eliminar el Desecho');
    }
    return model;
  }



}

module.exports = DesechosService;
