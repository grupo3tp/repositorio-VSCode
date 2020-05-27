import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  @Output() cambio = new EventEmitter();
  estado: boolean
  constructor() { }
 
  ngOnInit(): void {
  }

  cerrarSesion(){
    this.estado = false
    this.cambio.emit(this.estado)
  }

}
