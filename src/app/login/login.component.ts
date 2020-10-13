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
  @Output() datos = new EventEmitter();
  @Output() nivel : EventEmitter<number> =  new EventEmitter<number>();
  @Output() nombre : EventEmitter<string> = new EventEmitter<string>();
  users : Array<Usuarios> = new Array<Usuarios>();
  user = new Usuarios();
  textoError:string="";
  Usuario:string;
  Pass: string;
  tipoNivel: number;
  
  
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
      this.service.guardarLocalStorageId(data.nivel);
     // console.log("esto viene de la bd: "+ data.nivel)
     this.nombre.emit(data.nombre);
      this.tipoNivel = data.nivel;
     // console.log("esto se carga en la variable que es emitida del login: "+this.tipoNivel)
      this.nivel.emit(this.tipoNivel);
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
