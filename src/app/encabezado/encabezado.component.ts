import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataBaseService } from '../servicios/data-base.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  @Output() cambio = new EventEmitter();
  estado: boolean
  constructor(private service : DataBaseService) { }
 
  ngOnInit(): void {
  }

  cerrarSesion(){
    this.service.logout();
    this.estado = false
    this.cambio.emit(this.estado)
  }

}
