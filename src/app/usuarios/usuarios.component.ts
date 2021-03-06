import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios';
import { DataBaseService } from '../servicios/data-base.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import { Valor } from '../models/valor';
import { error } from 'protractor';
import {Router} from '@angular/router'

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
  errorNombre : boolean = true
  idNivel :number

  constructor(private fb : FormBuilder, private service : DataBaseService, private spinner: NgxSpinnerService,  public router: Router) { }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      nombre : ['', Validators.required],
      usuario : ['', Validators.required],
      pass : ['', Validators.required],
      nivel : ['', Validators.required]
    })
    this.leerId()
  }
  leerId(){
    this.idNivel = JSON.parse(sessionStorage.getItem("idNivel"))
    if (this.idNivel == 3) {
      this.router.navigateByUrl("/")
    }
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

  activar(nombre : string, activo : number){
    
    let valor = new Usuarios;
    valor.Usuario=nombre
    if(activo == 0){
      valor.Activo = 1 //1 usuario activado
    }else{
      valor.Activo = 0 //0 usuario desactivado
    }

    Swal.fire({
      title: 'seguro desea cambiar el estado del usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }) .then((result) =>{
     if(result.value){  
        this.service.ActivarDesactivar(valor).subscribe((item)=>{
          let user = new Usuarios
          user.Intento = 0;
          user.Usuario = nombre;
          this.service.updateIntento(user).subscribe()
          Swal.fire({
            title: 'cambio realizado',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          }).then((result)=>{
            if(result.value){
              location.reload();
            }
          })
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
    let pattern = /^[A-Z _]+$/i;
    if (!pattern.test(carga.Nombre_Usuario)) {
      Swal.fire({
        title: 'Error',
        text: 'solo se aceptan letras en el nombre',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
      return
    }
    carga.Pass = formValue.pass
    let patternPass = /^[A-Za-z0-9]{6,10}$/
    if (!patternPass.test(carga.Pass)) {
      if (carga.Pass.length < 6 || carga.Pass.length > 10 ) {
        Swal.fire({
          title: 'Error',
          text: 'el password debe ser entre 6 a 10 caracteres',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        })
        return
      }
    Swal.fire({
      title: 'Error',
      text: 'no se aceptan caracteres especiales',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
    return
  }
    carga.Usuario = formValue.usuario
    
    let patternUser = /^[A-Za-z0-9]{2,12}$/
    if (!patternUser.test(carga.Usuario)) {
      Swal.fire({
        title: 'Error',
        text: 'solo se aceptan letras y numeros en el Usuario',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
      return
    }

    carga.Nivel_Seguridad = formValue.nivel
    carga.Activo = 1
    
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
      
        this.spinner.hide()
        Swal.fire({
          title: 'Usuario guardado',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }) .then((result) =>{
         if(result.value){  
          this.service.GuardarUsuarios(carga).subscribe((item)=>{
            location.reload();
            this.formUser.reset();
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
       })
   
    }
  }

}
