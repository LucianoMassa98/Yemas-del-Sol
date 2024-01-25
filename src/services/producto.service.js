
const boom = require('@hapi/boom');
const {models} =require('../libs/sequelize');

class ProductoServicio{



 async create(producto){
   const newproduct = await models.producto.create(producto);
   if(!newproduct){
    throw boom.notFound('No se pudo crear el producto');
  }
    return newproduct;
  }
  //findOne
  async findOne(id){

    const producto =  await models.producto.findByPk(id);
    if(!producto){
      throw boom.notFound('producto no existente');
    }
      return producto;

  }

  async find(query){
 
    const rta = await models.producto.findAll();
    if(!rta){
      throw boom.notFound('productos no existentes');
    }
    return rta;
  }
  async update(id,changes){

    const producto =  await this.findOne(id);
    const rta = await producto.update(changes);
    if(!rta){
      throw boom.notFound('No se pudo actualizar el producto');
    }
      return rta;
  }
  async delete(id){
    const producto = await this.findOne(id);
   const rta= await producto.destroy();
    if(!rta){
      throw boom.notFound('No se pudo eliminar el producto');
    }
    return producto;
  }



}

module.exports = ProductoServicio;
