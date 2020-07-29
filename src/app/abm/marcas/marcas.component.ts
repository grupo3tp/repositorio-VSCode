import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  esAgregar:boolean = false;
  esModificar:boolean = false;
  esEliminar : boolean = false;
  marcas : Array<Marca> = new Array<Marca>();
  formularioMarcas: FormGroup;
  marca : Marca = new Marca();
  nombreMarca :  string;
  marcaId : number

  constructor(public service:DataBaseService, private fbGenerador:FormBuilder) { }

  ngOnInit(): void {

    this.formularioMarcas = this.fbGenerador.group({
      Detalle: ['', Validators.required]
    })
    
    this.service.leerMarca().subscribe((articulosDesdeApi) =>{
      this.marcas= articulosDesdeApi;
      
     })
  }

  agregar(){
    this.marca = this.formularioMarcas.value as Marca
       this.service.GuardarMarca(this.marca).subscribe((marcaRecibida)=>{
       //console.log("se guardo la marca");
       this.formularioMarcas.reset();
       this.esAgregar = false;
       Swal.fire({
        title: 'Marca agregada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
        this.esAgregar = false;
      })
     })
  };

  actualizarMarca(){
    this.marca = this.formularioMarcas.value  as Marca
    this.service.ActualizarMarca(this.marca, this.marcaId).subscribe((marcaRecibida)=>{
     // console.log("se edito correctante" + marcaRecibida)
      this.formularioMarcas.reset();
      this.esModificar = false;
      Swal.fire({
        title: 'Marca Actualizada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
      })
    })
  }

  marcaID(Detalle:number){

      this.esEliminar=true;
      for (let index = 0; index < this.marcas.length; index++) {
        if(this.marcas[index].id_Marca == Detalle){
          this.nombreMarca = this.marcas[index].Detalle;
          this.marcaId = this.marcas[index].id_Marca;
         // console.log(this.marcaId+'  '+this.nombreMarca)
        }  
      }
    
  };

  agregarMarca(){
    
    this.esAgregar = true;
    
  };
  atras(){
    this.esAgregar = false;
    this.esModificar = false
  };
  eliminar(){
    Swal.fire({
      title: 'Eliminar marca: '+this.nombreMarca,
      text: "esta seguro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      this.service.EliminarMarca(this.marcaId).subscribe((marcaRecibido)=>{
       // console.log("se elimino correctante" + marcaRecibido)
        this.esEliminar = false;
       
      })
      location.reload();
      
    })
  };
  modificar(){

    this.esModificar = true;


  };


}
