import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {
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
