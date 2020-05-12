// 'use strict'

// //dependencias

// import express from 'express';
// import { urlencoded, json } from 'body-parser';
// import { Request as _Request } from 'mssql';

// import http from 'http';
// import path from 'path';

// var app = express();


// //rutas

// import index from './Routes/index';
// import usuarios from './Routes/usuarios';

// //convierte datos a json los datos que llegan por peticiones http y poder trabajar con ellos dentro del proyecto

// app.use(urlencoded({
//     extended: false
// }));
// app.use(json());

// //Middleware

// app.use(function(req, res, next){
//     res.setheader('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept','application/json', 'text/json');

//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     next();
// });

// //utilozamos el index
// app.use('/', index);

// //usuarios

// app.use('/usuarios', usuarios);

// //peticion get para mostrar los usuarios en json

// app.get('/', function(req, res, next){
//     var Request = new _Request();
//     Request.query('SELECT * FROM Usuarios', function(err, result){
//         if(err)
//         return next(err);

//         var data = {};
//         data = result.recordset;
//         res.send(data);
//     });
// }); 

// export default app;
