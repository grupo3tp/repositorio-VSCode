import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca';
import { DataBaseService } from 'src/app/servicios/data-base.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  esAgregar:boolean = false;
  marcas : Array<Marca> = new Array<Marca>();
  constructor(public service:DataBaseService) { }

  ngOnInit(): void {
    this.service.leerMarca().subscribe((articulosDesdeApi) =>{
      this.marcas= articulosDesdeApi;
      
     })
  }

  agregar(){
    this.esAgregar = false;
    console.log("cartel se agrego la marca")
  };
  agregarMarca(){
    this.esAgregar = true;
    
  };
  atras(){
    this.esAgregar = false;
  };
  eliminar(){

  };
  modificar(){

  };


}
