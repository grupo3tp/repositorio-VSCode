import { Component, OnInit, Output, EventEmitter, HostListener, Input, SimpleChanges} from '@angular/core';

import { DataBaseService } from '../servicios/data-base.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  @Output() cambio = new EventEmitter();
  @Input() nivel : number;
  estado: boolean
  mostrarMenu : boolean
  scrHeight : number
  scrWidth : number
  phone : boolean 
  icono : string
  noMostrar = false
  tipoNivel : number
  constructor(private service : DataBaseService) {  this.getScreenSize() }
  ngOnInit(): void {
    this.nivel
     //console.log("esto llega al encabezado del padre: "+this.nivel)
  }

  // otra forma de recibir un valor a travez de la funcion input, sirve para agregarle funcionalidades a la variable
  // como por ejemplo this.tipoNivel.toLowerCase

  //  @Input()
  //  set nivel(value : number){
  //    value = value || null;
  //    this.tipoNivel = value
  //  }

  //  get nivel() {return this.tipoNivel}



  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
       // console.log(this.scrHeight, this.scrWidth);
        if( this.scrWidth > 600){
          this.phone = false
        //  console.log(this.phone)
        }else{
          this.phone = true
         // console.log(this.phone)
        }
  }

  icons(){
    if(this.mostrarMenu){
       this.icono = 'fas fa-window-close'
    }else{
      this.icono =  'fas fa-align-justify'
    }
    return this.icono
  }

  cambiar(){ 
    this.mostrarMenu = !this.mostrarMenu;
  }
  

  cerrarSesion(){
    this.service.logout();
    this.service.borrarLocalStorage();
    this.estado = false
    this.cambio.emit(this.estado)

  }

}
