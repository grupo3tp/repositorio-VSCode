// //variable sql para conexion a SQL

// var mssql = require('mssql');

// //requerios de un archivo llamado app.js donde tenemos otras configuraciones

// var app = require('./app')

// //plantillas ejs

// app.set('view engine','ejs');

// // establece el puerto

// var port = process.env.port || 5000;

// // variable de conexion

// var config = {
//     user:'DESKTOP-M4CABEP',
//     password:'',
//     server: 'DESKTOP-M4CABEP\SQLEXPRESS',
//     database:'patrimonio',
// };

// // en caso de error

// var connection = mssql.connect(config, function(arr, res){
//     if (err){
//         throw err;
//     } else {
//         console.log("conectado corectamente a la base de datos");
//         app.listen(port, function(){
//             console.log("api rest running http://localhost:"+port);
//         })
//     }
// });

// //module.exports es de express.js para que el modulo pueda ser usado en otros archivos
// module.exports = app;
