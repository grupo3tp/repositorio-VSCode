import { Component, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  @Output() cambio = new EventEmitter();
  estado: boolean
  mostrarMenu : boolean
  scrHeight : number
  scrWidth : number
  phone : boolean 
  icono : string

  constructor(private service : DataBaseService) {   this.esPhone, this.getScreenSize()}
 
  ngOnInit(): void {
  }

  esPhone(){
  
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
        if( this.scrWidth > 600){
          this.phone = false
          console.log(this.phone)
        }else{
          this.phone = true
          console.log(this.phone)
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
    console.log(this.mostrarMenu)
    
    
  }
  cerrarSesion(){
    this.service.logout();
    this.service.borrarLocalStorage();
    this.estado = false
    this.cambio.emit(this.estado)
  }

}
