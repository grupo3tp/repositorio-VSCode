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
  //carga:boolean

  constructor(public service:DataBaseService,){
    
   
  
  }
  ngOnInit(): void{

     //console.log(this.service.getToken())
     //if(this.service.getToken()==true){
     //this.datos=true;  
     //}

   //  esto sirve para mostrar un mensaje si sale del componente
   //   window.onbeforeunload = function(e) {
   //   e.returnValue = 'onbeforeunload';
   //  
   //     return 'onbeforeunload';
   //  }
     
     //ESTO ES PARA QUE VERIFIQUE EL TOKEN EN LOCALSTORAGE CADA VEZ QUE CAMBIA DE PESTAÑA, AHORA ESTA ECHO CON LA CONFIRMACION 
     //DEL TOKEN QUE SE ENCUENTRA EN LAS COOKIES
       this.token = JSON.parse(localStorage.getItem("Token"));
       if(this.token == null){ 
       }else{
         const token = {token:this.token}
         this.service.logintoken(token).subscribe (data =>{
          // console.log(data.token)
           this.datos=data.token; 
        
       })
       }   
  }
 

  cambioif(event){
    this.datos=event

  }
 


}
