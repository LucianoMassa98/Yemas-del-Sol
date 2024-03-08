const boom = require('@hapi/boom');

//const getconexion = require('../libs/postgres');
const {models} =require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newuser =await models.User.create(data);

    return newuser;

  }

  async find() {
    const rta = await models.User.findAll({
      include: 'customer'
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      boom.notFound('usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {

    const user = await this.findOne(id);
    const rta = await user.update(changes);
    if(!rta){throw boom.notFound("No se pudo actualizar el usuario");}

    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy();
    if(!rta){throw boom.notFound("No se pudo eliminar el usuario");}
    return user;
  }

  async login(userName, password){

    const usuario = await models.User.findOne({where:{userName:userName}, include:['customer']});

    if(!usuario || usuario.password!=password){throw boom.notFound("username or password incorrect!!");}

    return {
      userName: usuario.userName,
      customer: usuario.customer
    };
  }
}

module.exports = UserService;
