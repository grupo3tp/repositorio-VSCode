import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';
import { Transporte } from '../models/transporte';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Equipo } from '../models/equipo';
import { Remito } from '../models/remito';


@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  formularioActa: FormGroup;
  fechaActual : Date = new Date();
  nombreArticulo : string;
  numeroSerial : number;
  finArray : boolean;
  idArticulo : number;
  idRemito : number;

  articulos : Array<Articulos> = new Array<Articulos>(); 
  sector : Array<Sector> = new Array<Sector>(); 
  transporte : Array<Transporte> = new Array<Transporte>();
  equipos : Array<Equipo> = new Array<Equipo>();
  remito : Array<Remito> = new Array<Remito>();

  artElegidos : Array<string> = new Array<string>();
  serialElegido : Array<number> = new Array<number>();
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
    this.nuevaActa();
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
      this.leerEquipos();
    })
  };
  leerEquipos(){
    this.service.leerEquipos().subscribe((equiposApi) =>{
      this.equipos = equiposApi
      this.leerRemito();
    })
  };
  leerRemito(){
    this.service.leerRemito().subscribe((remitosApi) => {
      this.remito = remitosApi;
      this.leerNumeroDeRemito();
    })
  }
  leerNumeroDeRemito(){
    debugger
    if (!this.remito) {
      this.idRemito = 1
    } else {
      this.finArray = false;
    for (let index = 0; index <= this.remito.length; index++) {
      if (this.remito[index] == null  && !this.finArray ) {
        this.idRemito = this.remito[index-1].id_Remito + 1;
        this.finArray = true;
      }
    };
    }
    
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
      this.finArray = false;
      for (let index = 0; index <= this.serialElegido.length; index++) {
        if (this.serialElegido[index] == null && !this.finArray ) {
          this.serialElegido[index] = this.numeroSerial;
          this.finArray = true;
        }
      }    
  };// fin agregar()

  nuevaActa(){
    this.formularioActa.reset()
    this.artElegidos = new Array();
    this. serialElegido = new Array();
  }

  eliminar(posicion: number){
    this.serialElegido.splice(posicion,1)
  }
  
  articuloID(id:number){
    debugger
    console.log(id)
    if(id!=null) {
      for (let index = 0; index < this.equipos.length; index++) {
        if (this.equipos[index].serial === id) {
           this.idArticulo = this.equipos[index].id_Art
          this.numeroSerial = id;
        }
      }
      for (let index1 = 0; index1 < this.articulos.length; index1++) {
        if(this.articulos[index1].id_Art === this.idArticulo){
          this.nombreArticulo = this.articulos[index1].Detalle
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
