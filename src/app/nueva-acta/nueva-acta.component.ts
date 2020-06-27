import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';
import { Transporte } from '../models/transporte';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Equipo } from '../models/equipo';
import { Remito } from '../models/remito';
import { NuevaActa } from '../models/nueva-acta';

@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  formularioActa: FormGroup;
  fechaActual : Date = new Date();
  nombreArticulo : string;
  numeroSerial : string;
  finArray : boolean;
  idArticulo : number;
  idRemito : number;
  idTransporte : number;
  idDestino  : number;
  idOrigen : number;
  txtContacto : string;
  txtObs : string;

  articulos : Array<Articulos> = new Array<Articulos>(); 
  sector : Array<Sector> = new Array<Sector>(); 
  transporte : Array<Transporte> = new Array<Transporte>();
  equipos : Array<Equipo> = new Array<Equipo>();
  remito : Array<Remito> = new Array<Remito>();
  actaNueva = new NuevaActa;

  artElegidos : Array<string> = new Array<string>();
  serialElegido : Array<string> = new Array<string>();
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
      this.leerNumeroDeRemito()
    })
  }
  leerNumeroDeRemito(){
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
  };

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
    this.formularioActa.reset();
    this.artElegidos = new Array();
    this.serialElegido = new Array();
    //this.leerNumeroDeRemito()
  }

  eliminar(posicion: number){
    this.serialElegido.splice(posicion,1)
  }
  
  articuloID(id:number){
    console.log(id)
    if(id!=null) {
      for (let index = 0; index < this.equipos.length; index++) {
        if (this.equipos[index].serial === id) {
           this.idArticulo = this.equipos[index].id_Art
          this.numeroSerial = id.toString();
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
      for (let index = 0; index < this.sector.length; index++) {
        if (this.sector[index].Detalle == origen) {
          this.idOrigen = this.sector[index].id_Sec;
          console.log(this.idOrigen)
        }
      }
    }  
  }
  destinoID(destino:string){
    if (destino!=null) {
      for (let index = 0; index < this.sector.length; index++) {
        if (this.sector[index].Detalle == destino) {
          this.idDestino = this.sector[index].id_Sec;
          console.log(this.idDestino)
        }
      }
    } 
  };
  transporteID(transport:string){
    if (transport!=null) {
      for (let index = 0; index < this.transporte.length; index++) {
        if (this.transporte[index].Transporta == transport) {
         this.idTransporte = this.transporte[index].Id_Transporte
         console.log(this.idTransporte)
        }
      }
    }  
  }
  contacto(contact:string){
    this.txtContacto = contact;
  }
  Observaciones(obs:string){
    this.txtObs = obs;
  }

  confirmarMov(){

    this.actaNueva.idRemito = this.idRemito;
    this.actaNueva.Fecha = this.fechaActual; 
    this.actaNueva.Contacto = this.txtContacto;
    this.actaNueva.De = this.idOrigen;
    this.actaNueva.Para = this.idDestino;
    this.actaNueva.Id_Transporte = this.idTransporte;
    this.actaNueva.Observaciones = this.txtObs;
    this.finArray = false;
    
    for (let index = 0; index <= this.serialElegido.length; index++) {
      this.actaNueva.serialElegido = this.serialElegido[index]
      if (this.serialElegido[index] == null && !this.finArray) {
        this.finArray = true;
        this.actaNueva = new NuevaActa; 
        location.reload();
      }
      else
      {
        if (!this.finArray) {
          this.service.guardarNuevaActa(this.actaNueva).subscribe((marcaRecibida)=>{
            console.log("se guardo la nueva acta" + marcaRecibida); 
          })
        }
      }
    }

   
  
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
