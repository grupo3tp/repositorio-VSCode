import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  nivelComponent : number;

  constructor(public service:DataBaseService){}

  ngOnInit(): void{
    
    // con esto verifica que el toquen este el las cookies, es mas rapido que el localstorage pero no verifica en la BD
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
     
     //ESTO ES PARA QUE VERIFIQUE EL TOKEN EN LOCALSTORAGE CADA VEZ QUE CAMBIA DE PESTAÑA
       this.token = JSON.parse(localStorage.getItem("Token"));
       if(this.token == null){ 
       }else{
         const token = {token:this.token}
         this.service.logintoken(token).subscribe (data =>{
          // console.log(data.token)
           this.datos=data.token; 
          this.nivelComponent = JSON.parse(localStorage.getItem("idNivel"))
       })
       }   
  }
 

  cambioif(event){
    this.datos=event
  }

  tipoNivel(event){
   this.nivelComponent = event;
   //console.log("esto le llega a el componente padre: "+this.nivelComponent)
  }

 
}
