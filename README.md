# TC Ordenado

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## pasos para instalacion y uso del sistema:

requiere tener instalado VSCode

en la terminal CMD vaya a la raiz donde va a estra el proyecto y ejecute el comando

## ng new (nombre a gusto) 

cuando pregunte por routing le dan yes
 y el compilador selleccionar [scss].

en la carpeta creada agrege los archivos que descargo de aqui y ejecute el VSCode

requiere de paquete de Bootstrap, inicie la terminal y ejecute el comando:

## npm install bootstrap

en el archivo  angular.json busque el primer "Styles":[src/styles.scss] y le agregamos:

"node_modules/bootstrap/dist/css/bootstrap.min.css"

quedando asi:
"styles": [
       "src/styles.scss",
        "node_modules/bootstrap/dist/css/bootstrap.min.css"
],

luego instalamos el paquete para utilizar los componenetes de bootstrap que tengan javascript:

## npm i ngx_bootstrap --save




