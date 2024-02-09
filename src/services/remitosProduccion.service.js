const boom = require('@hapi/boom');
const ProductoService = require('./producto.service');
const GalponService = require('./galpon.service');

const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');
class RemitosProduccionService{

   async create(data){

      const newremito = await models.RemitoProduccion.create(data);
   if(!newremito){throw boom.notFound("No se pudo crear el remito de produccion");}

   return newremito;

    }
    async additem(data){
      const newitem = await models.ProduccionProducto.create(data);
      if(!newitem){throw boom.notFound("No se pudo eliminar el producto de la produccion");}

      return newitem;
    }
    async subitem(produccionId, productoId){

      const item = await models.ProduccionProducto.findOne(
        {where:{produccionId: produccionId, productoId: productoId}});
      if(!item){throw boom.notFound("No se pudo encontrar el producto");}

      const rta = await item.destroy();
      if(!rta){throw boom.notFound("No se pudo eliminar el producto de la produccion");}

      return item;
    }

    async update(id,changes){
    const model = await this.findOne(id,{});
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

  async findOne(id,query){

    const options={include: []}

    const {items , galpon} = query;

    if(items){
      options.include.push('items');
    }
    if(galpon){
      options.include.push({ association: 'galpon'});
    }
    const remito = await models.RemitoProduccion.findByPk(id,options);

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
