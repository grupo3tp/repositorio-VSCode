import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from '../servicios/data-base.service';
import { Usuarios } from '../models/usuarios';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = true;
  @Output()  datos = new EventEmitter();
  user = new Usuarios();
  textoError:string="";
  Usuario:string;
  Pass: string;
  
  constructor(private creadorFormulario: FormBuilder, public service: DataBaseService, public router: Router) { }

  ngOnInit(): void {

    this.formularioLogin=this.creadorFormulario.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    });
   
    
  
  }


  // ingresar(){
  //   if(this.formularioLogin.valid)
  //   {
     
  //     if(this.Usuario == "11223344" && this.Pass == "123456" ){
  //       console.log("usuario y contraseña correctas")
        
  //       this.datosCorrectos=true;
  //       this.datos.emit(this.datosCorrectos);
      
        
  //     }else
  //     {
  //       this.datosCorrectos=false;
        
  //       this.textoError = 'por favor, revise que los datos sean correctos'
  //     }
  //   } 
  // }

  login() 
  {
    const user = {Usuario: this.Usuario, Pass: this.Pass};
    this.service.login(user).subscribe( data => {
      this.service.setToken(data.token);
      this.user.token=data.token;
      this.datosCorrectos=true;
      this.datos.emit(this.datosCorrectos);
      console.log("usuario y contraseña correctas")
      console.log(this.user.token)
    },
    error => {
      console.log(error);
      this.datosCorrectos=false;
      this.textoError =error.error.errorMessage
    }
    );
  }

}
