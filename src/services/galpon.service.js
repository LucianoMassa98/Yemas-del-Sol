const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class GalponService {

  async find() {

    
    const rta = await models.Galpon.findAll();
    return rta;
  }

  async findOne(id) {
    const galpon = await models.Galpon.findByPk(id);
    if (!galpon) {
      throw boom.notFound('customer not found');
    }
    return galpon;
  }

  async create(data) {

    const newgalpon = await models.Galpon.create(data);
    if (!newgalpon) {
      throw boom.notFound('No se pudo crer el galpon');
    }
    return newgalpon;
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
      throw boom.notFound('No se pudo eliminar el galpon');
    }
    return model;
  }

  

}

module.exports = GalponService;
