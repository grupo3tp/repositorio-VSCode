import { Component } from '@angular/core';
import { DataBaseService } from './servicios/data-base.service';
import { Usuarios } from './models/usuarios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TC Ordenado';
  log: boolean ;
  user:Usuarios = new Usuarios


  constructor(public service:DataBaseService){
    
    this.log = this.user.login;
    
  
  }
 


}
