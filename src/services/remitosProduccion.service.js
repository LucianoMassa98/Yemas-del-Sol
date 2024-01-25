const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const GalponService = require('./galpon.service');

const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');
class RemitosProduccionService{

   async create(data){
    const newremito = await models.RemitoProduccion.create(data);
    return newremito;
    }
    async additem(data){
      const newitem = await models.ProduccionProducto.create(data);
      if(!newitem){throw boom.notFound("No se pudo eliminar el producto de la produccion");}

      return newitem;
    }
    async subitem(compraId, productoId){

      const item = await models.CompraProducto.findOne(
        {where:{compraId: compraId, productoId: productoId}});
      if(!item){throw boom.notFound("No se pudo eliminar el producto de la produccion");}
  
      const rta = await item.destroy();
      if(!rta){throw boom.notFound("No se pudo eliminar el producto de la produccion");}
  
      return item;
    }

    async update(id,changes){
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    if(!rta){ throw boom.notFound("No se pudo actualizar la produccion");}
    return rta;
    }

    async delete(id){
    const model = await this.findOne(id);
    const rta= await model.destroy();
    if(!rta){throw boom.notFound("No se pudo eliminar el la produccion");}
    return model;
  }

  async findOne(id){
    const remito = await models.RemitoProduccion.findByPk(id,{
      include: [{association: 'galpon'},'items']
    });

    if(!remito){
      throw boom.notFound('Remito de compra no encontrado');
    }

    return remito;

  }

  async find(query){

    const remitos = await models.RemitoProduccion.findAll();
    return remitos;
  }

  async RestarProducto(id, data){
    const rta = await this.servicio.Restar(id, data);
    return rta;
}
async SumarProducto(id, data){
  const rta = await this.servicio.Sumar(id, data);
  return rta;
}

}

module.exports = RemitosProduccionService;
