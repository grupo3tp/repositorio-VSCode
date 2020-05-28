import { Component, Input } from '@angular/core';
import { DataBaseService } from './servicios/data-base.service';
import { Usuarios } from './models/usuarios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TC Ordenado';
  datos:boolean 
  user:Usuarios = new Usuarios


  constructor(public service:DataBaseService){
    
   
    
  
  }
  ngOnInit(): void{
    
    if(this.service.getToken()==true){
      this.datos=true;
    }
    
      
  }
  cambioif(event){
    this.datos=event
  }


}
