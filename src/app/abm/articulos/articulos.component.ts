import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { Marca } from 'src/app/models/marca';
import { Tipo } from 'src/app/models/tipo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articulos } from 'src/app/models/articulos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {
  marcas : Array<Marca> = new Array<Marca>();
  tipos : Array<Tipo> = new Array<Tipo>();
  formularioArticulos: FormGroup
  nombreMarca : string
  marcaId :  number
  nombreTipo : string
  tipoId : number
  nombre :string
  articulo = new Articulos;
 
  constructor(private servicio : DataBaseService, private fbgenerator:FormBuilder) { }

  ngOnInit(): void {
    this.formularioArticulos = this.fbgenerator.group({
      Detalle: ['',Validators.required],
      Marca:['',Validators.required],
      Tipo:['',Validators.required],
    });

    this.leerMarca();
  }


  leerMarca(){
    this.servicio.leerMarca().subscribe((marcasDesdeApi)=>{
      this.marcas = marcasDesdeApi
      this.leerTipo();
    })
   
  }

  leerTipo(){
    this.servicio.leerTipo().subscribe((tipoDesdeApi)=>{
      this.tipos = tipoDesdeApi
    })
  }

  marcaID(event:number){
    for (let index = 0; index < this.marcas.length; index++) {
      if(this.marcas[index].id_Marca == event){
        this.nombreMarca = this.marcas[index].Detalle;
        this.marcaId = this.marcas[index].id_Marca;
      }  
    }
  }

  tipoID(event:number){
    for (let index = 0; index < this.tipos.length; index++) {
      if(this.tipos[index].id_Segmento == event){
        this.nombreTipo = this.tipos[index].Detalle;
        this.tipoId = this.tipos[index].id_Segmento;
      }  
    }   
  }

  detalle(event){
    this.nombre = event;
  }


  agregar(){
    this.articulo.Detalle = this.nombre
    this.articulo.id_Marca = this.marcaId
    this.articulo.id_Segmento = this.tipoId

    this.servicio.GuardarArticulos(this.articulo).subscribe((artDesdeApi)=>{
      this.formularioArticulos.reset();
      Swal.fire({
        title: 'Articulo agregado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

}
