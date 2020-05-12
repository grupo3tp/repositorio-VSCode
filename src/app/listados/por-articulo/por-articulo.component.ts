import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-por-articulo',
  templateUrl: './por-articulo.component.html',
  styleUrls: ['./por-articulo.component.scss']
})
export class PorArticuloComponent implements OnInit {
  esArticulo:boolean = false;
  esTipo:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  seleccionArticulo(id){
    
    if(id!="vacio"){
      this.esArticulo = true;
    }
    if(id=="vacio"){
      this.esArticulo = false;
    }
    
  }

  seleccionTipo(id){

    if(id!="vacio"){
      this.esTipo = true;
    }
    if(id=="vacio"){
      this.esTipo = false;
    }
    
  }

}
