const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    if(!newCategory){ throw boom.notFound("No se pudo crear la categoria");}
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    if(!categories){ throw boom.notFound("No se pudo crear la categoria");}

    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['productos']
    });
    if(!category){ throw boom.notFound('categoria no encontrada');}
    return category;
  }

  async update(id, changes) {
    const categoria = await this.findOne(id);
    const rta = await categoria.update(changes);
    if(!rta){ throw boom.notFound('No se pudo actualizar la categoria');}
    return rta;
  }

  async delete(id) {
    const categoria = await this.findOne(id);
    const rta = await categoria.destroy();
    if(!rta){ throw boom.notFound('No se pudo eliminar la categoria');}
    return categoria;
  }

}

module.exports = CategoryService;
