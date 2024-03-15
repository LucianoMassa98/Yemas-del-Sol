const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const {Op} = require('sequelize');

class RemitosCompraService{


  async create(data){

    const compra = await models.RemitoCompra.create(data);
      console.log(compra);
      if(!compra){throw boom.notFound("No se pudo crear la compra");}

      return compra;
  }
  async additem(data){
    const newitem = await models.CompraProducto.create(data);
    if(!newitem){throw boom.notFound("No se pudo agregar item a la compra");}
    return newitem;
  }
  async subitem(compraId, productoId){

    const item = await models.CompraProducto.findOne(
      {where:{compraId: compraId, productoId: productoId}});
    if(!item){throw boom.notFound("No se pudo eliminar el producto de la compra");}

    const rta = await item.destroy();
    if(!rta){throw boom.notFound("No se pudo eliminar el producto de la compra");}

    return item;
  }
  async find(query){

    let options={where:{}, include:['items']};
    const{fechaDesde, fechaHasta, galponId, DetalleUser, DetalleGalpon}= query;
    if(fechaDesde &&  fechaHasta){
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
    if(DetalleUser){
      options.include.push({
        model: models.User,
        attributes: [],
        as: 'user',
        include: ['customer']
      });
    }
    if(DetalleGalpon){
      options.include.push({
        model: models.Galpon,
        as: 'galpon'
      });
    }

    const rta = await models.RemitoCompra.findAll(options);
    if(!rta){throw boom.notFound("No hay remitos de compra");}

    return rta;
  }

  async update(id,changes){
     const model = await this.findOne(id,{items:true});
    const rta = await model.update(changes);
    if(!rta){throw boom.notFound("No no se pudo actualizar la compra");}

    return rta;
    }
  async delete(id){

    const rmtc = await this.findOne(id,{});

    const rta=  await rmtc.destroy();
    if(!rta){throw boom.notFound("No no se pudo eliminar la compra");}
    return rmtc;
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

    const rmtc = await models.RemitoCompra.findByPk(id, options);

    if(!rmtc){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return rmtc;

  }


// resta cnt de la tabla Prodcutos
  async RestarProducto(id, data){
      const rta = await this.servicio.Restar(id, data);
      return rta;
  }
  async SumarProducto(id, data){
    const rta = await this.servicio.Sumar(id, data);
    return rta;
}
async InformeCompraDia(){
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth() + 1; // Se agrega 1 porque los meses se indexan desde 0 (enero es 0)
  const dia = hoy.getDate();

  const remitos = await this.find({fechaDesde:`${mes}-${dia}-${año}`, fechaHasta:`${mes}-${dia+1}-${año}`});



  const consolidado = await this.consolidar(remitos);


  let informe = `
    Informe de Ingreso:
    -------------------------------
    Fecha:  ${año}-${mes}-${dia}
  `;
  consolidado.forEach((item, index) => {
    informe += `
      ${index + 1}. Producto: ${item.nombre}
         Cantidad: ${item.CompraProducto.cnt}
    `;
  });

  return informe;
}
async Informe(query){

  const remitos = await this.find(query);

  const consolidado = await this.consolidar(remitos);

  return consolidado;
}

 async consolidar(remitos){
    let list=[];
    remitos.forEach( remito => {

      remito.items.forEach( async item => {

          let i =0;
          while(i<list.length && item.id!=list[i].id){i++};

          if(i<list.length ){
            list[i].CompraProducto.cnt += item.CompraProducto.cnt;
          }else{
            list.push(item);
          }

      });

    });


    return list;
  }


}

module.exports = RemitosCompraService;
