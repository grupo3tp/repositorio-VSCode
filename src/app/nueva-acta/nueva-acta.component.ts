import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Articulos } from '../models/articulos.model';

@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  fechaActual:Date = new Date()
  textPrueba:string = "Scanner Kodak ScanMate 1550"
  articulos : Array<Articulos> = new Array<Articulos>(); 
  constructor( public service : DataBaseService) { }

  ngOnInit(): void {
   this.service.leerArticulos().subscribe((articulosDesdeApi) =>{
    this.articulos = articulosDesdeApi;
   })
  
  }

  addContacto(contacto){
    console.log(contacto.value)
    
  }
  agregar(){
    
  }

}
