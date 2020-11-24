import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/tipo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {
  esAgregar:boolean = false;
  esModificar:boolean = false;
  esEliminar : boolean = false;
  tipos : Array<Tipo> = new Array<Tipo>();
  formularioTipos: FormGroup;
  tipo : Tipo = new Tipo();
  nombreTipo :  string;
  tipoId : number
  idNivel : number;

  constructor(public service:DataBaseService, private fbGenerador:FormBuilder,  public router: Router) { }

  ngOnInit(): void {

    this.formularioTipos = this.fbGenerador.group({
      Detalle: ['', Validators.required]
    })
    
    this.service.leerTipo().subscribe((articulosDesdeApi) =>{
      this.tipos= articulosDesdeApi;
      
     })
     this.leerId();
  }

  leerId(){
    this.idNivel = JSON.parse(sessionStorage.getItem("idNivel"))
    if (this.idNivel == 3) {
      this.router.navigateByUrl("/")
    }
   
   }

  agregar(){
    this.tipo = this.formularioTipos.value as Tipo
       this.service.GuardarTipo(this.tipo).subscribe((tipoRecibido)=>{   
       this.formularioTipos.reset();
       this.esAgregar = false;
       Swal.fire({
        title: 'Tipo agregado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
        this.esAgregar = false;
      })
     })
  };

  actualizarTipo(){
    this.tipo = this.formularioTipos.value  as Tipo
    this.service.ActualizarTipo(this.tipo, this.tipoId).subscribe((tipoRecibido)=>{
      this.formularioTipos.reset();
      this.esModificar = false;
      Swal.fire({
        title: 'Tipo Actualizado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
      })
    })
  }

  tipoID(Detalle:number){

    this.esEliminar=true;
    for (let index = 0; index < this.tipos.length; index++) {
      if(this.tipos[index].id_Segmento == Detalle){
        this.nombreTipo = this.tipos[index].Detalle;
        this.tipoId = this.tipos[index].id_Segmento;
      }  
    }   
  };

  agregarTipo(){
    
    this.esAgregar = true;
    
  };
  atras(){
    this.esAgregar = false;
    this.esModificar = false
  };
  eliminar(){
    Swal.fire({
      title: 'Eliminar el Tipo: '+this.nombreTipo,
      text: "esta seguro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      this.service.EliminarTipo(this.tipoId).subscribe((tipoRecibido)=>{
        this.esEliminar = false;
       
      })
      location.reload();
      
    })
  };
  modificar(){

    this.esModificar = true;


  };
}
