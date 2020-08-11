import { Component, OnInit, ExistingSansProvider } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CargaGranel } from '../models/carga-granel';
import { DataBaseService } from '../servicios/data-base.service';
import { Estado } from '../models/estado';
import { OrdenCompra } from '../models/orden-compra';
import { Marca } from '../models/marca';
import { Articulos } from '../models/articulos.model';
import { Sector } from '../models/sector';

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
  marcas : Array<Marca> = new Array<Marca>();
  articulo : Array<Articulos> = new Array<Articulos>();
  sector : Array<Sector> = new Array<Sector>();

  constructor(private fb:FormBuilder, private service : DataBaseService) {  }

  ngOnInit(): void {

    this.formCargaGranel = this.fb.group({
      estado : ['', Validators.required],
      orden : ['', Validators.required],
      remito : ['', Validators.required],
      marca : ['', Validators.required],
      articulo : ['', Validators.required],
      sector : ['',Validators.required],
      observaciones : [''],
      seriales : this.fb.array([this.fb.group({serial : ['']})])
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
      this.leerMarca();
    })
  }

  leerMarca(){
    this.service.leerMarca().subscribe((item)=>{
      this.marcas = item
      this.leerArticulo();
    })
  }

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


  addSerial(){
    const control = <FormArray>this.formCargaGranel.controls['seriales'];
    control.push(this.fb.group({serial : ['']}))
  }

  removeSerial(i:number){
    const control = <FormArray>this.formCargaGranel.controls['seriales'];
    control.removeAt(i)
  }
  
  agregar(formValue:any){
    const carga = new CargaGranel()
    carga.fecha = new Date()
    carga.estado =formValue.estado
    carga.orden = formValue.orden
    carga.remito = formValue.remito
    carga.marca = formValue.marca
    carga.articulo = formValue.articulo
    carga.observaciones = formValue.observaciones
    carga.sector = formValue.sector
    carga.seriales = formValue.seriales

    console.log(carga)
   
  }
}
