import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  esAgregar:boolean = false;
  constructor() { }

  ngOnInit(): void {
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
