const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const {Op} = require('sequelize');

class DesechosService {

  async find(query) {
    let options={where:{}, include:[]};
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

    const rta = await models.Desecho.findAll(options);
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

  async InformeMensaje(){
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth() + 1; // Se agrega 1 porque los meses se indexan desde 0 (enero es 0)
    const dia = hoy.getDate();

    const remitos = await this.find({fechaDesde:`${mes}-${dia}-${año}`, fechaHasta:`${mes}-${dia+1}-${año}`});
    const consolidado = await this.consolidar(remitos);


    let informe = `
      Informe de desechos:
      -------------------------------
      Fecha:  ${año}-${mes}-${dia}
      Cantidad: ${consolidado}
    `;

    return informe;
  }
  async Informe(query){

    const remitos = await this.find({fechaDesde:query.fechaDesde, fechaHasta:query.fechaDesde});
    const consolidado = await this.consolidar(remitos);
    return consolidado;
  }
  async consolidar(desechos){
      let sum=0;
      desechos.forEach( desecho => {
          sum +=desecho.cnt;
      });
      return sum;
  }

}

module.exports = DesechosService;
