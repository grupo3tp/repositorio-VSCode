import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuarios } from '../models/usuarios';
import { DataBaseService } from '../servicios/data-base.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';

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
