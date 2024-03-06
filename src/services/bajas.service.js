const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const {Op} = require('sequelize');

class BajasService {

  async find(query) {
    let options={where:{}};
    const{fechaDesde, fechaHasta}= query;
    if(fechaDesde &&  fechaHasta){
      options.where={
        createdAt:{
          [Op.gte]: fechaDesde,
          [Op.lte]: fechaHasta,
        }
      }
    }
    const rta = await models.Baja.findAll(options);
    if(!rta){ throw boom.notFound("Bajas not found");}
    return rta;
  }

  async findOne(id) {
    const baja = await models.Baja.findByPk(id);
    if (!baja) {
      throw boom.notFound('customer not found');
    }
    return baja;
  }

  async create(data) {

    const newBaja = await models.Baja.create(data);
    if (!newBaja) {
      throw boom.notFound('No se pudo crer el Baja');
    }
    return newBaja;
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
      throw boom.notFound('No se pudo eliminar el Baja');
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
      Informe de bajas:
      -------------------------------
      Fecha:  ${año}-${mes}-${dia}
      Cantidad: ${consolidado}
    `;
    return informe;
  }
  async Informe(query){

    const remitos = await this.find(query);
    const consolidado = await this.consolidar(remitos);
    return consolidado;
  }
  async consolidar(bajas){
    let sum=0;
    bajas.forEach( baja => {
        sum +=baja.cnt;
    });
    return sum;
  }


}

module.exports = BajasService;
