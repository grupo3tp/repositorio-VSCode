import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { Sector } from 'src/app/models/sector';
import { TipoPuesto } from 'src/app/models/tipo-puesto';
import { Gerencia } from 'src/app/models/gerencia';
import { UbicacionEdif } from 'src/app/models/ubicacion-edif';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {

  sectores : Array<Sector> = new Array<Sector>();
  puestos : Array<TipoPuesto> = new Array<TipoPuesto>();
  gerencias : Array<Gerencia> = new Array<Gerencia>();
  ubicaciones : Array<UbicacionEdif> = new Array<UbicacionEdif>();
  formSector : FormGroup;
  esModificar : boolean;
  sectorId : number;
  nameSector : string;
  idNivel : number;

  constructor(private fb:FormBuilder, private service : DataBaseService,  public router: Router) { }


  ngOnInit(): void {
    this.formSector = this.fb.group({
      detalle : ['', Validators.required],
      telefono : ['', Validators.required],
      tipoPuesto : ['', Validators.required],
      gerencia : ['', Validators.required],
      ubicacion : ['', Validators.required],
      stock :  [''],
      personal : [''],
      activo :['']
    })
    this.leerId();
  }

  leerId(){
    this.idNivel = JSON.parse(sessionStorage.getItem("idNivel"))
    if (this.idNivel == 3) {
      this.router.navigateByUrl("/")
    }
    this.leerSector();
   }

  leerSector(){
    this.service.leerSector().subscribe((SectorDesdeApi)=>{
      this.sectores = SectorDesdeApi;
      this.leerTipoPuesto();
    })
  }

  leerTipoPuesto(){
    this.service.leerTipoPuesto().subscribe((TipoPuestoDesdeApi)=>{
      this.puestos = TipoPuestoDesdeApi;
      this.leerGerencia();
    })
  }
  leerGerencia(){
    this.service.leerGerencia().subscribe((GerenciaDesdeApi)=>{
      this.gerencias = GerenciaDesdeApi;
      this.leerUbicacionEdif();
    })
  }
  leerUbicacionEdif(){
    this.service.leerUbicacionEdif().subscribe((UbicacionEdifDesdeApi)=>{
      this.ubicaciones = UbicacionEdifDesdeApi;
    })
  }

  agregar(formValue : any){
    const carga = new Sector
    carga.Detalle = formValue.detalle
    carga.telefonos = formValue.telefono
    carga.id_TipoSector = formValue.tipoPuesto
    carga.id_Dir = formValue.gerencia
    carga.Id_Ubicacion = formValue.ubicacion
    carga.StockPropio = formValue.stock
    carga.PersonalPropio = formValue.personal
    carga.Activo = formValue.activo

    let pattern = /^[A-Za-z0-9]{0,50}$/
          
    if (!pattern.test(carga.Detalle) ) {
      Swal.fire({
        title: 'Error',
        text: 'no se reconocen caracteres especiales',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
      return
    }

    if(carga.StockPropio){
      carga.StockPropio = 1
    }else{
      carga.StockPropio = 0
    }
    if(carga.PersonalPropio){
      carga.PersonalPropio = 1
    }else{
      carga.PersonalPropio = 0
    }
    if(carga.Activo){
      carga.Activo = 1
    }else{
      carga.Activo = 0
    }
    
    this.service.GuardarSector(carga).subscribe((item)=>{
      Swal.fire({
        title: 'Sector agregado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
      })
    },error =>{
      Swal.fire({
        title: 'Error en carga',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })

  }

  modificar(){
    this.esModificar = !this.esModificar;
  }
  idSector(event:number){
    this.sectorId = event;
    this.sectores.forEach(element => {
      if (element.id_Sec == this.sectorId) {
        this.nameSector = element.Detalle;
      }
    });
  }
  modificacion(formValue : any){
    const carga = new Sector
    carga.Detalle = formValue.detalle
    carga.telefonos = formValue.telefono
    carga.id_TipoSector = formValue.tipoPuesto
    carga.id_Dir = formValue.gerencia
    carga.Id_Ubicacion = formValue.ubicacion
    carga.StockPropio = formValue.stock
    carga.PersonalPropio = formValue.personal
    carga.Activo = formValue.activo

    if(carga.StockPropio){
      carga.StockPropio = 1
    }else{
      carga.StockPropio = 0
    }
    if(carga.PersonalPropio){
      carga.PersonalPropio = 1
    }else{
      carga.PersonalPropio = 0
    }
    if(carga.Activo){
      carga.Activo = 1
    }else{
      carga.Activo = 0
    }
    this.service.ActualizarSector(carga, this.sectorId).subscribe((item)=>{
      Swal.fire({
        title: 'Sector modificado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result)=>{
        location.reload();
      })
    },error =>{
      Swal.fire({
        title: 'Error en carga',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

}
