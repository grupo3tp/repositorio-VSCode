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
  

  constructor(public service:DataBaseService){
    
   
  
  }
  ngOnInit(): void{

     console.log(this.service.getToken())
     if(this.service.getToken()==true){
       this.datos=true;  
     }
    // this.token = this.user.token
    // console.log(this.token)
  
    // this.service.logintoken(this.token).subscribe (data =>{
    //   console.log("el usuario es: "+data._userName);
    //   this.datos=true;  
    // })
    
    
      
  }
  cambioif(event){
    this.datos=event
  }


}
