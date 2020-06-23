import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';
import { Transporte } from '../models/transporte';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  formularioActa: FormGroup
  fechaActual : Date = new Date()
  articulos : Array<Articulos> = new Array<Articulos>(); 
  sector : Array<Sector> = new Array<Sector>(); 
  transporte : Array<Transporte> = new Array<Transporte>();
  nombreArticulo : string
  finArray : boolean;
  artElegidos : Array<string> = new Array<string>();
  articuloEnInput : boolean;

  constructor (public service : DataBaseService, private creadorFormulario: FormBuilder) {   
    this.formularioActa=this.creadorFormulario.group({
      transporte: ['',Validators.required],
      origen: ['',Validators.required],
      destino: ['',Validators.required],
      serial: ['',Validators.required],
    });
 
  } 

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
          this.articuloEnInput = false;
        }
      }    
  };// fin agregar()

  nuevaActa(){
    this.formularioActa.reset()
    this.artElegidos = new Array()
  }

  eliminar(posicion: number){
    this.artElegidos.splice(posicion,1)
  }// fin eliminar()
  
  articuloID(id:number){
    console.log(id)
    if(id!=null) {
      for (let index = 0; index < this.articulos.length; index++) {
        if(this.articulos[index].id_Art == id){
          this.nombreArticulo = this.articulos[index].Detalle
          this.articuloEnInput = true;
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

  confirmarMov(){
    Swal.fire({
      title: 'Confirma movimento',
      text: "esta accion es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'confirmado',
          'El acta fue caragada',
          'success'
        )
      }
    })
  }


}; //Fin exports class
