import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';
import { Transporte } from '../models/transporte';



@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  fechaActual : Date = new Date()
  articulos : Array<Articulos> = new Array<Articulos>(); 
  sector : Array<Sector> = new Array<Sector>(); 
  transporte : Array<Transporte> = new Array<Transporte>();
  nombreArticulo : string
  finArray : boolean;
  artElegidos : Array<string> = new Array<string>();
  constructor (public service : DataBaseService) {  }

  ngOnInit(): void {   
    this.leerSector();
   }

  leerSector(){
    this.service.leerSector().subscribe((sectorApi) =>{
      this.sector = sectorApi;
      this.leerArticulo();
    }) 
  };
  leerArticulo(){
    this.service.leerArticulos().subscribe((articulosApi) =>{
      this.articulos = articulosApi;
      this.leerTrasporte();
    });
  };
  leerTrasporte(){
    this.service.leerTransporte().subscribe((trasporteApi) =>{
      this.transporte = trasporteApi;
    })
  }

  agregar(){
    this.finArray = false;
      for (let index = 0; index <= this.artElegidos.length; index++) {
        if (this.artElegidos[index] == null && !this.finArray ) {
          this.artElegidos[index] = this.nombreArticulo;
          this.finArray = true;
          this.nombreArticulo = "";
        }
      }    
  };// fin agregar()

  eliminar(posicion: number){
    this.artElegidos.splice(posicion,1)
  }// fin eliminar()
  
  articuloID(id:number){
    if(id!=null) {
      for (let index = 0; index < this.articulos.length; index++) {
        if(this.articulos[index].id_Art==id){
          this.nombreArticulo = this.articulos[index].Detalle
        }
      }
    }
  }// fin articuloID
  
  origenID(origen:string){
    if (origen!=null) {
      console.log(origen)
    }  
  }
  destinoID(destino:string){
    if (destino!=null) {
      console.log(destino)
    }  
  }
  transporteID(trans:string){
    if (trans!=null) {
      console.log(trans)
    }  
  }
  contacto(event){
    console.log(event)
  }
  Observaciones(event){
    console.log(event)
  }


}; //Fin exports class
