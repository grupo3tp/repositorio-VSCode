import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { UbicacionEdif } from 'src/app/models/ubicacion-edif';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-por-ubicacion',
  templateUrl: './por-ubicacion.component.html',
  styleUrls: ['./por-ubicacion.component.scss']
})
export class PorUbicacionComponent implements OnInit {

  formxUbicacion : FormGroup
  edificios : Array<UbicacionEdif> = new Array<UbicacionEdif>();
  sectorQuery : Array<UbicacionEdif> = new Array<UbicacionEdif>();

  constructor(private fb:FormBuilder, private service : DataBaseService) { }

  ngOnInit(): void {

    this.service.leerUbicacionEdif().subscribe((item)=>{
      this.edificios = item;
    })
    
    this.formxUbicacion = this.fb.group({
      edif: ['', Validators.required]
    })
  }

  lSerie(){
    let idEdif = this.sectores;

    this.service.leerEdificioxId(idEdif).subscribe((item)=>{
      this.sectorQuery = item;
      console.log(this.sectorQuery)
      this.generacionPdf();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  lArticulos(){
    let idSector = this.sectores;

    this.service.leerEdificioxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
     
      this.generacionPdf1();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  lTotales(){
    let idSector = this.sectores;

    this.service.leerEdificioxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      console.log(this.sectorQuery)
      this.generacionPdf2();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  generacionPdf(){
   
  }

  generacionPdf1(){
   

  }

  generacionPdf2(){
   
  }

  sectores: number;

  edifID(event){
    this.sectores = event
  }

}
