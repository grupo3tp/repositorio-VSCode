import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';

@Component({
  selector: 'app-nueva-acta',
  templateUrl: './nueva-acta.component.html',
  styleUrls: ['./nueva-acta.component.scss']
})
export class NuevaActaComponent implements OnInit { 
  fechaActual:Date = new Date()
  textPrueba:string = "Scanner Kodak ScanMate 1550"
  constructor( public service : DataBaseService) { }

  ngOnInit(): void {
    this.service.refreshList();
  
  }

  addContacto(contacto){
    console.log(contacto.value)
    
  }
  agregar(){
    
  }

}
