
// Iniciamos el modulo express con el fin de dar inicio al servidor, evitando varias configuraciones
const express = require('express'); //importamos el paquete express
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

const postRoute = require('./routes/post');
app.use('/servicios', postRoute);

//Middleware: es la llamada a una funcion cuando se presenta un evento en una ruta especifica
/*app.use('/servicios', () =>
{
    console.log('Corriendo middleware');
}); */

/**CREACION DE RUTAS*/
app.get('/', (req, res) => {
    res.send('prueba 1 respuesta del servidor'); // Ruta por defecto

});

//Conexion a base de datos
mongoose.connect('mongodb+srv://cmunozjuan5:18xdPHfLyTU0fmuV@cluster0.unmsmkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((err) => {
    console.log('Error de conexión a la base de datos:', err);
});


//Se configura como va a escuchar el servidor las peticiones, definiendo el puerto 10000
app.listen(10000);