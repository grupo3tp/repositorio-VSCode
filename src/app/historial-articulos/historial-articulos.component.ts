import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Historial } from '../models/historial';
import Swal from 'sweetalert2';
import { strict } from 'assert';

@Component({
  selector: 'app-historial-articulos',
  templateUrl: './historial-articulos.component.html',
  styleUrls: ['./historial-articulos.component.scss']
})
export class HistorialArticulosComponent implements OnInit {

  nSerial : string
  historial : Array<Historial> = new Array<Historial>();

  Detalle : string
  nInventario : string
  Estado : string
  Remito_Factura : string
  OdeCompra :  string
  Fecha : Date
  Obvs : string
  id_Remito : number
  fecha : Date
  De : string
  Para : string
  mostrar = false

  constructor(private service : DataBaseService, ) { }

  ngOnInit(): void {
    
  }

  serial(event){
    this.nSerial = event
  }

  // datoEmiter(event){
  //   this.nSerial = event
  //   console.log(this.nSerial)
  //   this.buscar()
  // }

  
  buscar(){
    this.service.buscarHistorial(this.nSerial).subscribe((item)=>{
      this.historial = item 
      this.Detalle = this.historial[0].Detalle
      this.nInventario = this.historial[0].nInventario
      this.Estado = this.historial[0].Estado
      this.Remito_Factura = this.historial[0].Remito_Factura
      this.OdeCompra = this.historial[0].OdeCompra
      this.Fecha = this.historial[0].Fecha
      this.Obvs = this.historial[0].Obvs
      this.service.buscarHistoActa(this.nSerial).subscribe((item)=>{
        this.historial = item
      })
     },error => {
      Swal.fire({
        title: 'El Nº de Serie no existe',
        text: 'verifique!',
        icon: 'error',
        }) 
     }
     )
  }

}
