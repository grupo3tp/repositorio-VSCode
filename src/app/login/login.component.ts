import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from '../servicios/data-base.service';
import { Usuarios } from '../models/usuarios';
import {Router} from '@angular/router'
import {NgxSpinnerService} from 'ngx-spinner';

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
  
  constructor(
        private creadorFormulario: FormBuilder,
        public service: DataBaseService,
        public router: Router,
        private spinner: NgxSpinnerService
         ) { }

  ngOnInit(): void {

    this.formularioLogin=this.creadorFormulario.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    });
   
  }


  login() 
  {
    this.spinner.show();
    const user = {Usuario: this.Usuario, Pass: this.Pass};
    this.service.login(user).subscribe( data => {
     setTimeout(() => {
      this.service.setToken(data.token);
      this.service.guardarLocalStorage(data.token);
      this.user.Token=data.token;
      this.datosCorrectos=true;
      this.datos.emit(this.datosCorrectos);
      //console.log("usuario y contraseña correctas")
      this.spinner.hide()
      this.router.navigateByUrl("/")
     }, 600);
     
    },
    error => {
      this.datosCorrectos=false;
      this.textoError =error.error.errorMessage
      this.spinner.hide()
    }
    );
  }

}
