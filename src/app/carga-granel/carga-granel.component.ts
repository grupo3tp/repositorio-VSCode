import { Component, OnInit, ExistingSansProvider } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CargaGranel } from '../models/carga-granel';
import { DataBaseService } from '../servicios/data-base.service';
import { Estado } from '../models/estado';
import { OrdenCompra } from '../models/orden-compra';
//import { Marca } from '../models/marca';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-granel',
  templateUrl: './carga-granel.component.html',
  styleUrls: ['./carga-granel.component.scss']
})
export class CargaGranelComponent implements OnInit {

  fechaActual:Date = new Date();
  formCargaGranel :FormGroup;
  estado : Array<Estado> = new Array<Estado>();
  orden : Array<OrdenCompra> = new Array<OrdenCompra>();
  //marcas : Array<Marca> = new Array<Marca>();
  articulo : Array<Articulos> = new Array<Articulos>();
  sector : Array<Sector> = new Array<Sector>();

  constructor(private fb:FormBuilder, private service : DataBaseService) {  }

  ngOnInit(): void {

    this.formCargaGranel = this.fb.group({
      estado : ['', Validators.required],
      orden : ['', Validators.required],
      remito : ['', Validators.required],
      //marca : ['', Validators.required],
      articulo : ['', Validators.required],
      sector : ['',Validators.required],
      observaciones : [''],
      seriales : this.fb.array([this.fb.group({serial : ['']})]),
      nsInventarios : this.fb.array([this.fb.group({nInventario : ['']})])
    })

    this.leerEstados();
  }

  leerEstados(){
    this.service.leerEstado().subscribe((item)=>{
      this.estado = item
      this.leerOrdenCompra();
    })
  }

  leerOrdenCompra(){
    this.service.leerOrdenCompra().subscribe((item)=>{
      this.orden = item;
      //this.leerMarca();
      this.leerArticulo();
    })
  }

  // leerMarca(){
  //   this.service.leerMarca().subscribe((item)=>{
  //     this.marcas = item
  //     this.leerArticulo();
  //   })
  // }

  leerArticulo(){
    this.service.leerArticulos().subscribe((item)=>{
      this.articulo = item
      this.leerSector();
    })
  }

  leerSector(){
    this.service.leerSector().subscribe((item)=>{
      this.sector = item
    })
  }

  get getSeriales() {
    return this.formCargaGranel.get('seriales') as FormArray
  }

  get getInventario() {
    return this.formCargaGranel.get('nsInventarios') as FormArray
  }

  addSerial(){
    const control = <FormArray>this.formCargaGranel.controls['seriales'];
    control.push(this.fb.group({serial : ['']}))
    this.addInventario();
  }
  addInventario(){
    const control = <FormArray>this.formCargaGranel.controls['nsInventarios'];
    control.push(this.fb.group({nInventario : ['']}))
  }

  removeSerial(i:number){
    const control = <FormArray>this.formCargaGranel.controls['seriales'];
    control.removeAt(i);
    this.removeInventario(i);
  }
  removeInventario(i:number){
    const control = <FormArray>this.formCargaGranel.controls['nsInventarios'];
    control.removeAt(i)
  }
  
  agregar(formValue:any){
    const carga = new CargaGranel()
    carga.FechaAlta = new Date()
    carga.id_Estado =formValue.estado
    carga.id_OC = formValue.orden
    carga.Remito_Factura = formValue.remito
    //carga.marca = formValue.marca
    carga.id_Art = formValue.articulo
    carga.Obvs = formValue.observaciones
    carga.id_Sec = formValue.sector
    carga.seriales = formValue.seriales
    carga.nsInventarios = formValue.nsInventarios
    carga.Cantidad = 1
    
    //console.log(carga)
   
    for (let i = 0; i < carga.seriales.length; i++) {
      carga.serial = Object.values(carga.seriales[i]).toString();
      carga.nInventario =  Object.values(carga.nsInventarios[i]).toString();
      //console.log(carga)
       this.service.guardarCargaGranel(carga).subscribe((cargaApi)=>{
         this.formCargaGranel.reset();
         location.reload();
         Swal.fire({
           title: 'Equipos guardados',
           icon: 'success',
           confirmButtonColor: '#3085d6',
           confirmButtonText: 'Ok',
         })
      },error =>{
        console.log(error.error.type)
      })

    }
  } 
}
