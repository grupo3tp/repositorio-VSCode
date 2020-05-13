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
  usuario:Array<Usuarios>=new Array<Usuarios>();
  constructor(private creadorFormulario: FormBuilder, public variableInyectada: DataBaseService) { }

  ngOnInit(): void {
  

    this.formularioLogin=this.creadorFormulario.group({
      dni: ['',Validators.required],
      password: ['',Validators.required]
    });
   
  }


  ingresar(){
    if(this.formularioLogin.valid)
    {
      this.datosCorrectos=true;
  
    }
    else
    {
      this.datosCorrectos=false;
      this.textoError = 'por favor, revise que los datos sean correctos'
    }

    
    
  }

}
