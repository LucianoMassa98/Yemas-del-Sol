const boom = require('@hapi/boom');

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
    const model = await this.findOne(id,{});
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

    let options={where:{}, include:['items']};
    const{fechaDesde, fechaHasta, galponId}= query;
    if(fechaDesde && fechaHasta){
      options.where={
        createdAt:{
          [Op.gte]: fechaDesde,
          [Op.lte]: fechaHasta,
        }
      }
    }

    if(galponId){
      options.where={
       ...options.where,
       galponId: galponId
      }
    }

    const remitos = await models.RemitoProduccion.findAll(options);
    if(!remitos){throw boom.notFound("Remitos Produccion not found");}
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

async InformeProduccionDia(){
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth() + 1; // Se agrega 1 porque los meses se indexan desde 0 (enero es 0)
  const dia = hoy.getDate();

  const remitos = await this.find({fechaDesde:`${mes}-${dia}-${año}`, fechaHasta:`${mes}-${dia+1}-${año}`});



  const consolidado = await this.consolidarProductos(remitos);


  let informe = `
    Informe de Producción:
    -------------------------------
    Fecha:  ${año}-${mes}-${dia}
  `;
  consolidado.forEach((item, index) => {
    informe += `
      ${index + 1}. Producto: ${item.nombre}
         Cantidad: ${item.ProduccionProducto.cnt}
    `;
  });

  return informe;
}
 async consolidarProductos(remitos){
    let list=[];
    remitos.forEach( remito => {

      remito.items.forEach( async item => {

          let i =0;
          while(i<list.length && item.id!=list[i].id){i++};

          if(i<list.length ){
            list[i].ProduccionProducto.cnt += item.ProduccionProducto.cnt;
          }else{
            list.push(item);
          }

      });

    });


    return list;
  }
}

module.exports = RemitosProduccionService;
