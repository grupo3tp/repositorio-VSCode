import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios';
import { DataBaseService } from '../servicios/data-base.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import { Valor } from '../models/valor';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  formUser : FormGroup
  users : Array<Usuarios> = new Array<Usuarios>();
  leerUsuarios : Array<Usuarios> = new Array<Usuarios>();
  esIgual : boolean = false;
  nuevoUsuario : boolean = false;
  activado : string
  desactivado :  string

  constructor(private fb : FormBuilder, private service : DataBaseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      nombre : ['', Validators.required],
      usuario : ['', Validators.required],
      pass : ['', Validators.required],
      nivel : ['', Validators.required]
    })
    this.cargaUsuarios()
  }

  cargaUsuarios(){
    this.service.leerUsuarios().subscribe((item)=>{
      this.leerUsuarios = item
      this.buscarUsarios();
    })
  }

  buscarUsarios(){
    this.service.leerUsuarios().subscribe((item)=>{
      this.users = item;
      
    })
  }

  agregarUsuario(){
    this.nuevoUsuario = !this.nuevoUsuario;
  }

  activar(id : number, activo : number){
    
    let valor = new Valor;
    valor.Id_Usuario=id
    if(activo == 0){
      valor.Activo = 1 //1 usuario activado
    }else{
      valor.Activo = 0 //0 usuario desactivado
    }

    Swal.fire({
      title: 'seguro desea cambiar el estado del usuario',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }) .then((result) =>{
     if(result.value){  
        this.service.ActivarDesactivar(valor).subscribe((item)=>{
          Swal.fire({
            title: 'cambio realizado',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          location.reload()
        },error=>{
          Swal.fire({
            title: 'Error',
            text: error.name,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
        })
     }
   })
  }

  agregar(formValue : any){
    this.spinner.show();
    const carga = new Usuarios
    carga.Nombre_Usuario = formValue.nombre
    carga.Usuario = formValue.usuario
    carga.Pass = formValue.pass
    carga.Nivel_Seguridad = formValue.nivel
 
    for (let i = 0; i < this.leerUsuarios.length; i++) {
      if (this.leerUsuarios[i].Usuario == carga.Usuario) {
        this.esIgual = true
      }   
    }

    if (this.esIgual) {
      Swal.fire({
        title: 'usuario existente',
        text: 'modifique',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
      this.esIgual=false
    }else{
      this.service.GuardarUsuarios(carga).subscribe((item)=>{
        this.spinner.hide()
        Swal.fire({
          title: 'Usuario guardado',
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
