import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../models/orden-compra';
import { DataBaseService } from '../servicios/data-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  formularioCompra : FormGroup;
  ordenDeCompra : Array<OrdenCompra> = new Array<OrdenCompra>();
  fechaActual:Date = new Date();
  orden : string;
  proveedor : number;
  observaciones : string;
  compra = new OrdenCompra;

  constructor( private service : DataBaseService, private fb:FormBuilder) {
    this.formularioCompra = fb.group({
      orden : ['', Validators.required],
      proveedor : ['', Validators.required],
      observaciones : ['']
    })
   }

 

  ngOnInit(): void {
    this.formularioCompra.reset()
    this.leerOrden()
  };

  leerOrden(){
    this.service.leerOrdenCompra().subscribe((ordenDesdeApi)=>{
      this.ordenDeCompra = ordenDesdeApi
    })
  };

  ordenCompra(event){
    this.orden = event
  };

  proveedorID(event){
    this.proveedor = event
  };

  obs(event){
    this.observaciones = event
  }

  

  agregar(){
    this.compra.Fecha = this.fechaActual
    this.compra.Obvservaciones = this.observaciones
    this.compra.OdeCompra = this.orden
    this.compra.Proveedor = this.proveedor
    console.log(this.compra)
    this.service.GuardarOrdenCompra(this.compra).subscribe((result)=>{
      Swal.fire({
        title: 'orden de compra agregada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        this.formularioCompra.reset()
      })
    })
  }


}
