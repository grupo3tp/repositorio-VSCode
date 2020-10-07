import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios';
import { DataBaseService } from '../servicios/data-base.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  formUser : FormGroup
  users : Array<Usuarios> = new Array<Usuarios>();
  leerToken : string;
  esIgual : boolean = false;
  nuevoUsuario : boolean = false;
  nombreUser: string
  usuario : string
  nivelUser : string

  constructor(private fb : FormBuilder, private service : DataBaseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      pass : ['', Validators.required],
      pass2 : ['', Validators.required]      
    })
    this.cargaUsuarios()
  }

  cargaUsuarios(){
    this.service.leerUsuarios().subscribe((item)=>{
      this.users = item;
      this.leerToken = JSON.parse(localStorage.getItem("Token"))
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].Token == this.leerToken){
          this.nombreUser = this.users[i].Nombre_Usuario;
          this.usuario = this.users[i].Usuario;
          this.nivelUser = this.users[i].Nivel_Usuario;
        }
        
      }
    })
  }

  agregarUsuario(){
    this.nuevoUsuario = !this.nuevoUsuario;
  }

 

  agregar(formValue : any){
    this.spinner.show();
    const carga = new Usuarios
    carga.Usuario =  this.usuario
    carga.Pass = formValue.pass
    carga.Pass2 = formValue.pass2
 

    if (carga.Pass != carga.Pass2) {
      Swal.fire({
        title: 'contraseñas no coinciden',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    }else{
      this.service.updatePass(carga).subscribe((item)=>{
        this.spinner.hide()
        Swal.fire({
          title: 'Contraseña guardada',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }) .then((result) =>{
         if(result.value){  
           location.reload();
           this.formUser.reset();
         }
       })
      },error=>{
        this.spinner.hide()
        Swal.fire({
          title: 'Error',
          text: error.name,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        })
      })
    }
  }

}
