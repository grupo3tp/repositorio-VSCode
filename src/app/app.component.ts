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
  user: Usuarios = new Usuarios()
  token: string
  carga:boolean

  constructor(public service:DataBaseService,){
    
   
  
  }
  ngOnInit(): void{

     console.log(this.service.getToken())
     if(this.service.getToken()==true){
     this.datos=true;  
     }
     
      

    
          
      this.token = JSON.parse(localStorage.getItem("Token"));
      if(this.token == null){ 
      }else{
        const token = {token:this.token}
        this.service.logintoken(token).subscribe (data =>{
          console.log(data.token)
          this.datos=data.token; 
        
      })
      }   
  }
  cambioif(event){
    this.datos=event
  }
 


}
