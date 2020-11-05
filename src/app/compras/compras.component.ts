import { Component, OnInit } from '@angular/core';
import { OrdenCompra } from '../models/orden-compra';
import { DataBaseService } from '../servicios/data-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoComponent } from '../abm/tipo/tipo.component';
import { TipoPuesto } from '../models/tipo-puesto';
import { Sector } from '../models/sector';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  formularioCompra : FormGroup;
  ordenDeCompra : Array<OrdenCompra> = new Array<OrdenCompra>();
  tipoSector : Array<Sector> = new Array<Sector>();
  proveedores : Array<string> = new Array<string>();
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
      this.leerTipoPuesto()
    })
  };
  leerTipoPuesto(){
    this.service.leerSector().subscribe((item) =>{
      this.tipoSector = item;
      let j=0;
    for (let i = 0; i < this.tipoSector.length; i++) {
      if (this.tipoSector[i].id_TipoSector == 5) {
       
        this.proveedores[j] = this.tipoSector[i].Detalle
        j++;
      }  
    }
  });
  };
  

  ordenCompra(event){
    this.orden = event
  };

  proveedorID(event){
   this.tipoSector.forEach(e => {
     if (e.Detalle == event) {
       this.proveedor = e.id_Sec;
     }
   });
  };

  obs(event){
    this.observaciones = event
  }

  

  agregar(){
    this.compra.Fecha = this.fechaActual
    this.compra.Obvservaciones = this.observaciones
    this.compra.OdeCompra = this.orden
    this.compra.Proveedor = this.proveedor
    //console.log(this.compra)
    
    this.service.GuardarOrdenCompra(this.compra).subscribe((result)=>{
      Swal.fire({
        title: 'orden de compra agregada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        this.formularioCompra.reset()
      })
    }, error =>{
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
