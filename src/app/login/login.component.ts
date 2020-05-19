import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from '../servicios/data-base.service';
import { Usuarios } from '../models/usuarios';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = true;
  textoError:string="";
  usuario: Usuarios = new Usuarios;
  Dni:string;
  Pass: string;
  constructor(private creadorFormulario: FormBuilder, public variableInyectada: DataBaseService) { }

  ngOnInit(): void {
  

    this.formularioLogin=this.creadorFormulario.group({
      dni: ['',Validators.required],
      password: ['',Validators.required]
    });
   
    this.usuario.login=true
  }

  dni(dni:string){
    this.Dni = dni
  }

  pass(pass:string){
    this.Pass = pass
  }


  ingresar(){
    if(this.formularioLogin.valid)
    {
     
      if(this.Dni == "11223344" && this.Pass == "123456" ){
        console.log("usuario y contraseña correctas")
        
        this.datosCorrectos=true;
        this.usuario.login=true;
      }else
      {
        this.datosCorrectos=false;
        this.variableInyectada.login=false;
        this.textoError = 'por favor, revise que los datos sean correctos'
      }

    }

   


    
    
  }

}
