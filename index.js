const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const routerApi = require('./src/routes/index');
const FormulariosService = require('./src/services/formularios.service');
const service = new FormulariosService();
const {longError,errorHandler,boomErrorHandler,ormErrorHandler}=require('./src/middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3010;


//formato en el que se reciben peticiones: Json
app.use(express.json());

// estando vacio cualquiera puede conectarse
const whitelist = ['http://localhost:3010','https://tranquil-thicket-16476.herokuapp.com/'];
const options= {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(whitelist));
app.use(longError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);
app.listen(port, ()=>{

  console.log("Mi port "+port);
});




// Esta función se ejecutará todos los días a las 20:00, excepto los domingos
const tareaDiaria = cron.schedule('0 14 * * 0-6', async () => {
  const hoy = new Date();
  if (hoy.getDay() !== 0) { // Si no es domingo
    console.log('Realizando operación diaria a las 20:00');

    await service.create();
  }
}, {
  scheduled: true,
  timezone: "America/Argentina/Buenos_Aires" // Ajusta la zona horaria según tu ubicación
});

tareaDiaria.start(); // Iniciar la tarea
