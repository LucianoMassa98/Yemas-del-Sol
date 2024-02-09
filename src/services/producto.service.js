const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const CategoryService = require('../services/category.service');
const service = new CategoryService();
class ProductoServicio {
  async generador() {

    const categorias = [
      { id: 1, nombre: 'Materia Prima' },
      { id: 2, nombre: 'producción' },
      { id: 3, nombre: 'Mercadería' },
    ];
    categorias.forEach(async (cate) => {
     await service.create(cate);
    });

    const productos = [
      { categoryId: 1, nombre: 'Carton chico' },
      { categoryId: 1, nombre: 'Cartón grande' },
      { categoryId: 2, nombre: 'Extra' },
      { categoryId: 2, nombre: 'Super' },
      { categoryId: 2, nombre: 'Grande' },
      { categoryId: 2, nombre: 'Mediano' },
      { categoryId: 2, nombre: 'Chico' },
      { categoryId: 2, nombre: 'Bolita' },
      { categoryId: 2, nombre: 'Sucio' },
      { categoryId: 2, nombre: 'Cascado' }
    ];

    productos.forEach(async (prd) => {
      await this.create(prd);
    });

    return await this.find({});

  }

  async create(producto) {
    const newproduct = await models.producto.create(producto);
    if (!newproduct) {
      throw boom.notFound('No se pudo crear el producto');
    }
    return newproduct;
  }
  //findOne
  async findOne(id) {
    const producto = await models.producto.findByPk(id);
    if (!producto) {
      throw boom.notFound('producto no existente');
    }
    return producto;
  }

  async find(query) {
    const rta = await models.producto.findAll();
    if (!rta) {
      throw boom.notFound('productos no existentes');
    }
    return rta;
  }
  async update(id, changes) {
    const producto = await this.findOne(id);
    const rta = await producto.update(changes);
    if (!rta) {
      throw boom.notFound('No se pudo actualizar el producto');
    }
    return rta;
  }
  async delete(id) {
    const producto = await this.findOne(id);
    const rta = await producto.destroy();
    if (!rta) {
      throw boom.notFound('No se pudo eliminar el producto');
    }
    return producto;
  }
}

module.exports = ProductoServicio;
