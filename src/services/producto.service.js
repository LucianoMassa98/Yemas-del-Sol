
class ProductoServicio{

  constructor(){
    this.productos = [];
    this.Generador();

  }
  Generador(){
    this.productos = [
      {
        id: '1.1',
        cantidad: 'producto 1',
        precio: 100
      },
      {
        id: '1.2',
        cantidad: 'producto 2',
        precio: 1500
      },
      {
        id: '1.3',
        cantidad: 'producto 3',
        precio: 360
      },
      {
        id: '1.4',
        cantidad: 'producto 4',
        precio: 550
      },
      {
        id: '1.5',
        cantidad: 'producto 5',
        precio: 200
      }
    ];
  }
  //create
  async Crear(data){

    const newproduct = {
      id: '1.6',
      ...data
    }
    this.productos.push(newproduct);
    return newproduct;
  }
  //edit
  async Editar(){}
  //find
  async Buscar(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.productos);
      },5000);
    });
  }
  //findOne
  async BuscarUno(id){
    return this.productos.find(item => item.id === id);
  }
  //update
  async Actualizar(id,changes){
    const index =  this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Producto no encontrado');
    }else{
      const producto = this.productos[index];
      this.productos[index] ={
        ...producto,
        ...changes
      };

      return this.productos[index];
    }
  }
  //delete
  async Borrar(id){
    const index =  this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Producto no encontrado');
    }else{
      this.productos.splice(index,1);
      return {message: true}
    }
  }

}

module.exports = ProductoServicio;
