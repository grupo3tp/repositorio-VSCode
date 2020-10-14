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
  articulos : Array<Articulos> = new Array<Articulos>();
  formularioArticulos: FormGroup
  formularioArt: FormGroup
  nombreMarca : string
  marcaId :  number
  nombreTipo : string
  tipoId : number
  articuloId : number
  nombre :string
  articulo = new Articulos;
  esModificar : boolean;
  artName : string
 
  constructor(private servicio : DataBaseService, private fbgenerator:FormBuilder) { }

  ngOnInit(): void {
    this.formularioArticulos = this.fbgenerator.group({
      Detalle: ['',Validators.required],
      Marca:['',Validators.required],
      Tipo:['',Validators.required],
    });
    this.formularioArt = this.fbgenerator.group({
      Detalle: ['',Validators.required],
      Marca:['',Validators.required],
    });


    this.nuevoArticulo();
    this.leerMarca();
  }

  nuevoArticulo(){
    this.formularioArticulos.reset()
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
      this.leerArticulos();
    })
  }
  
  leerArticulos(){
    this.servicio.leerArticulos().subscribe((artDesdeapi)=>{
      this.articulos = artDesdeapi;
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

  atras(){
    this.esModificar = !this.esModificar
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
    },error =>{
      Swal.fire({
        title: 'no se agrego el articulo',
        text: error.error,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  modificar(){
    this.esModificar = !this.esModificar
  }

  artId(event : number){
    this.articuloId = event;
    this.articulos.forEach(element => {
      if (element.id_Art == this.articuloId) {
        this.artName = element.Detalle;
      }
    });
  }

  modificacion(){
    this.articulo.id_Art = this.articuloId
    this.articulo.Detalle = this.nombre
    this.articulo.id_Marca = this.marcaId
    this.articulo.id_Segmento = this.tipoId
    this.servicio.ActualizarArticulos(this.articulo, this.articulo.id_Art).subscribe((item)=>{
      this.formularioArticulos.reset();
      Swal.fire({
        title: 'Articulo Actualizado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    }, error =>{
      Swal.fire({
        title: 'no se modifico el articulo',
        text: error.error,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })

  }

}
