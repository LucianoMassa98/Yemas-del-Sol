const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  async find() {
    const rta = await models.Customer.findAll();
    if (!rta) {
      throw boom.notFound('customers not found');
    }
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    if (!newCustomer) {
      throw boom.notFound('No se pudo crear el customer');
    }
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if (!rta) {
      throw boom.notFound('No se pudo actualizar el customer');
    }
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
   const rta= await model.destroy();
   if (!rta) {
    throw boom.notFound('No se pudo eliminar el customer');
  }
    return model;
  }

}

module.exports = CustomerService;
